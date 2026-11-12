// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { createModalForm, openCreateModal, yesButton } from './admin-team';

test.describe('AC-7 Discard confirmation', () => {
  test('TD-064 Confirming discard closes the create modal', async ({ page }) => {
    // 1. Preconditions: The discard confirmation «Зміни будуть втрачені. Бажаєте продовжити?» is open over the «Додати в команду» modal. Test data: «ТАК». Click «ТАК».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('Анна');
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByText('Зміни будуть втрачені. Бажаєте продовжити?')).toBeVisible();
    await yesButton(page).click();

    // expect: The «Додати в команду» modal is closed.
    await expect(createModalForm(page)).toBeHidden();
  });
});
