// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { deleteMembersNamed, login } from '../api/team-api';
import { createModalForm, fillProfile, noButton, openCreateModal } from './admin-team';

test.describe('AC-17 Decline draft save', () => {
  test('TD-131 Declining draft save closes the create modal', async ({ page, request }) => {
    test.fixme();
    const token = await login(request);
    await deleteMembersNamed(request, token, ['Анна Коваленко']);
    try {
      // 1. Preconditions: The confirmation «Зберегти нового члена команди?» is open over the «Додати в команду» modal. Test data: «НІ». Click «НІ».
      await openCreateModal(page);
      // «Опис» is filled because the application keeps «Зберегти як чернетку» disabled while it is empty (see TD-122).
      await fillProfile(page, { name: 'Анна Коваленко', category: 'Керівництво', description: 'Опис текст' });
      await page.getByRole('button', { name: 'Зберегти як чернетку' }).click();
      await expect(page.getByText('Зберегти нового члена команди?')).toBeVisible();
      await noButton(page).click();

      // expect: The «Додати в команду» modal is closed.
      // FIXME: «НІ» closes only the «Зберегти нового члена команди?» popup. The «Додати в команду» modal stays open
      // with the entered values (nothing is saved), instead of closing as the test design expects.
      await expect(createModalForm(page)).toBeHidden();
    } finally {
      await deleteMembersNamed(request, token, ['Анна Коваленко']);
    }
  });
});
