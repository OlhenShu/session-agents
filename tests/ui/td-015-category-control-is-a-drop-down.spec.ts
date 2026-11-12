// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { openCreateModal } from './admin-team';

test.describe('AC-3 Category field', () => {
  test('TD-015 Category control is a drop-down', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. The category «Керівництво» exists. Test data: «Керівництво». Open «Категорія» by clicking the button «Оберіть категорію».
    await openCreateModal(page);
    await page.getByRole('button', { name: 'Оберіть категорію' }).click();

    // expect: «Категорія» is a drop-down that lists «Керівництво».
    await expect(page.getByRole('listbox')).toBeVisible();
    await expect(page.getByRole('option', { name: 'Керівництво' })).toBeVisible();
  });
});
