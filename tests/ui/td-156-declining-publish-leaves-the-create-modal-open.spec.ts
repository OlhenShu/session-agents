// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { deleteMembersNamed, login } from '../api/team-api';
import { choosePhoto, createModalForm, fillProfile, noButton, openCreateModal } from './admin-team';

test.describe('AC-20 Decline publish', () => {
  test('TD-156 Declining publish leaves the create modal open', async ({ page, request }) => {
    const token = await login(request);
    await deleteMembersNamed(request, token, ['Анна Коваленко']);
    try {
      // 1. Preconditions: The confirmation titled «Підтвердження» is open over the «Додати в команду» modal. Test data: «НІ». Click «НІ».
      await openCreateModal(page);
      await fillProfile(page, { name: 'Анна Коваленко', category: 'Керівництво', description: 'Опис текст' });
      await choosePhoto(page, 'portrait.jpeg');
      await page.getByRole('button', { name: 'Опублікувати' }).click();
      await expect(page.getByText('Опублікувати нового члена команди?')).toBeVisible();
      await noButton(page).click();

      // expect: The «Додати в команду» modal is open.
      await expect(createModalForm(page)).toBeVisible();
    } finally {
      await deleteMembersNamed(request, token, ['Анна Коваленко']);
    }
  });
});
