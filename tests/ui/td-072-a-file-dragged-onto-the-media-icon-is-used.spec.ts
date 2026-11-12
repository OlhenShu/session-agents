// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import fs from 'fs';
import { test, expect } from '@playwright/test';
import { confirmCropperIfShown, fixture, openCreateModal, photoDropZone, photoPreview } from './admin-team';

test.describe('AC-9 Drag a photo', () => {
  test('TD-072 A file dragged onto the media icon is used', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. No photo is chosen. Test data: portrait.png, 320×400 px, 500 Kb. Drag portrait.png onto the «Фото» button «Перетягніть файл сюди або натисніть для завантаження», which shows «Додайте файл сюди».
    await openCreateModal(page);
    const base64 = fs.readFileSync(fixture('portrait.png')).toString('base64');
    const dataTransfer = await page.evaluateHandle((content) => {
      const bytes = Uint8Array.from(atob(content), (character) => character.charCodeAt(0));
      const transfer = new DataTransfer();
      transfer.items.add(new File([bytes], 'portrait.png', { type: 'image/png' }));
      return transfer;
    }, base64);
    const dropZone = photoDropZone(page);
    await dropZone.dispatchEvent('dragenter', { dataTransfer });
    await dropZone.dispatchEvent('dragover', { dataTransfer });
    await dropZone.dispatchEvent('drop', { dataTransfer });
    await confirmCropperIfShown(page);

    // expect: The media icon shows portrait.png.
    await expect(photoPreview(page)).toBeVisible();
  });
});
