// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { openCreateModal } from './admin-team';

test.describe('AC-5 Name length', () => {
  test('TD-028 Name accepts 50 characters', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. Test data: 50 characters «А». Enter 50 characters «А» into the textbox «Ім'я та Прізвище».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('А'.repeat(50));

    // expect: «Ім'я та Прізвище» shows 50 characters «А».
    await expect(page.getByLabel("Ім'я та Прізвище")).toHaveValue('А'.repeat(50));
  });
});
