// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { openCreateModal } from './admin-team';

test.describe('AC-4 Character counter', () => {
  test('TD-021 Name counter shows fifty of fifty', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. Test data: 50 characters «А». Maximum 50. Enter 50 characters «А» into the textbox «Ім'я та Прізвище».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('А'.repeat(50));

    // 2. Look at the status counter beside «Ім'я та Прізвище».
    // expect: The counter shows used count 50 of maximum 50.
    await expect(page.getByRole('status').filter({ hasText: '50/50' })).toBeVisible();
  });
});
