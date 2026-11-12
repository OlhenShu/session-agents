// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { fixture, openCreateModal, photoDropZone, photoPreview } from './admin-team';

test.describe('AC-10 Photo size', () => {
  test('TD-078 A file larger than 3 Mb is not shown', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. The media icon is empty. Test data: over-3mb.jpeg, 320×400 px, 1 byte larger than 3 Mb. Choose over-3mb.jpeg for «Фото» through the button «Перетягніть файл сюди або натисніть для завантаження».
    await openCreateModal(page);
    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), photoDropZone(page).click()]);
    await fileChooser.setFiles(fixture('over-3mb.jpeg'));
    // Wait until the application has finished validating the file (it reports the size problem), then check the media icon.
    await expect(page.getByText(/Фото не більше 3 ?mb/i)).toBeVisible();

    // expect: The media icon does not show over-3mb.jpeg.
    await expect(photoPreview(page)).toBeHidden();
  });
});
