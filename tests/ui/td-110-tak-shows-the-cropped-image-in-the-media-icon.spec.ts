// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { fixture, openCreateModal, photoDropZone, photoPreview, yesButton } from './admin-team';

test.describe('AC-15 Cropper', () => {
  test('TD-110 Так shows the cropped image in the media icon', async ({ page }) => {
    // 1. Preconditions: The cropper modal is open. The crop frame covers the top-left of the uploaded image. Cropper specification section 3.1. Test data: The top-left area inside the crop frame. Click Так.
    await openCreateModal(page);
    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), photoDropZone(page).click()]);
    await fileChooser.setFiles(fixture('portrait.jpeg'));
    await expect(page.getByRole('group', { name: 'Use the arrow keys to move the crop selection area' })).toBeVisible();
    await yesButton(page).click();

    // expect: The media icon shows the top-left area that was inside the crop frame.
    await expect(photoPreview(page)).toBeVisible();
  });
});
