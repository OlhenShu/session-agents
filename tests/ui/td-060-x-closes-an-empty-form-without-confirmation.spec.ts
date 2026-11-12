// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { createModalForm, openCreateModal } from './admin-team';

test.describe('AC-6 Close an empty form', () => {
  test('TD-060 X closes an empty form without confirmation', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. «Ім'я та Прізвище» is empty. «Опис» is empty. «Категорія» shows «Оберіть категорію». No photo is chosen. Test data: None. Click the X button named «Close modal».
    await openCreateModal(page);
    await page.getByRole('button', { name: 'Close modal' }).click();

    // expect: The «Додати в команду» modal closes without showing «Зміни будуть втрачені. Бажаєте продовжити?».
    await expect(createModalForm(page)).toBeHidden();
    await expect(page.getByText('Зміни будуть втрачені. Бажаєте продовжити?')).toBeHidden();
  });
});
