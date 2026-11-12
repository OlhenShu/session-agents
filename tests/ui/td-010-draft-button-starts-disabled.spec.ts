// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { openCreateModal } from './admin-team';

test.describe('AC-1 Create modal', () => {
  test('TD-010 Draft button starts disabled', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal has just been opened from «Команда» by clicking «Додати в команду». Every field is empty. Test data: None. Look at «Зберегти як чернетку».
    await openCreateModal(page);

    // expect: «Зберегти як чернетку» is disabled.
    await expect(page.getByRole('button', { name: 'Зберегти як чернетку' })).toBeDisabled();
  });
});
