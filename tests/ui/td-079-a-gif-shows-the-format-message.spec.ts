// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { fixture, openCreateModal, photoDropZone } from './admin-team';

test.describe('AC-11 Photo format', () => {
  test('TD-079 A gif shows the format message', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. No photo is chosen. Test data: diagram.gif, 320×400 px, 100 Kb. Message «Невірний формат фото, дозволено jpeg, jpg, png, webp». Choose diagram.gif for «Фото» through the button «Перетягніть файл сюди або натисніть для завантаження».
    await openCreateModal(page);
    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), photoDropZone(page).click()]);
    await fileChooser.setFiles(fixture('diagram.gif'));

    // expect: The message «Невірний формат фото, дозволено jpeg, jpg, png, webp» is shown.
    await expect(page.getByText('Невірний формат фото, дозволено jpeg, jpg, png, webp')).toBeVisible();
  });
});
