// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { choosePhoto, openCreateModal, photoDropZone, photoPreview, yesButton } from './admin-team';

test.describe('AC-13 Delete photo', () => {
  test('TD-092 Confirming delete removes the image', async ({ page }) => {
    // 1. Preconditions: The confirmation «Видалити фото?» is open. The media icon shows portrait.jpeg. Test data: «ТАК». Click «ТАК».
    await openCreateModal(page);
    await choosePhoto(page, 'portrait.jpeg');
    await expect(photoPreview(page)).toBeVisible();
    await photoDropZone(page).hover();
    await page.getByRole('button', { name: 'Remove image' }).click();
    await expect(page.getByText('Видалити фото?')).toBeVisible();
    await yesButton(page).click();

    // expect: The media icon does not show portrait.jpeg.
    await expect(photoPreview(page)).toBeHidden();
  });
});
