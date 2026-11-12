// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { openCreateModal } from './admin-team';

test.describe('AC-5 Name length', () => {
  test('TD-029 Name blocks the 51st character', async ({ page }) => {
    test.fixme();
    // 1. Preconditions: The «Додати в команду» modal is open. «Ім'я та Прізвище» contains 50 characters «А». Test data: Next character «Б». Message «Не більше 50 символів». Type «Б» into the textbox «Ім'я та Прізвище».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('А'.repeat(50));
    await page.getByLabel("Ім'я та Прізвище").press('End');
    await page.getByLabel("Ім'я та Прізвище").pressSequentially('Б');

    // expect: The message «Не більше 50 символів» is shown.
    // FIXME: the application blocks the 51st character (maxlength=50, the value stays 50 characters and the counter stays 50/50)
    // but it never shows «Не більше 50 символів» (no text containing «50 символ» appears on typing or on leaving the field).
    await expect(page.getByText('Не більше 50 символів')).toBeVisible();
  });
});
