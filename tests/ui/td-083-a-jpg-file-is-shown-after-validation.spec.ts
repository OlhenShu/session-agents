// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { choosePhoto, openCreateModal, photoPreview } from './admin-team';

test.describe('AC-12 Valid photo', () => {
  test('TD-083 A jpg file is shown after validation', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. No photo is chosen. Test data: portrait.jpg, 320×400 px, 500 Kb. Choose portrait.jpg for «Фото» through the button «Перетягніть файл сюди або натисніть для завантаження».
    await openCreateModal(page);
    await choosePhoto(page, 'portrait.jpg');

    // expect: The media icon shows portrait.jpg.
    await expect(photoPreview(page)).toBeVisible();
  });
});
