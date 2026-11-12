// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { deleteMembersNamed, login } from '../api/team-api';
import { choosePhoto, createModalForm, fillProfile, openCreateModal, yesButton } from './admin-team';

test.describe('AC-21 Order reminder', () => {
  test('TD-166 The order reminder is gone at 3 seconds', async ({ page, request }) => {
    const token = await login(request);
    await deleteMembersNamed(request, token, ['Анна Коваленко']);
    try {
      // 1. Preconditions: «Не забудь встановити порядок відображення» has just been shown after publish confirmation. Test data: 3 seconds. Wait 3 seconds.
      await openCreateModal(page);
      await fillProfile(page, { name: 'Анна Коваленко', category: 'Керівництво', description: 'Опис текст' });
      await choosePhoto(page, 'portrait.jpeg');
      await page.getByRole('button', { name: 'Опублікувати' }).click();
      await yesButton(page).click();
      await expect(createModalForm(page)).toBeHidden();
      // The application words the reminder «Не забудьте налаштувати порядок відображення члена команди», so the
      // reminder is located by «порядок відображення»; it is shown right after the confirmation.
      const shownReminder = page.getByText(/порядок відображення/);
      await expect(shownReminder).toBeVisible();
      await page.waitForTimeout(3000);

      // expect: «Не забудь встановити порядок відображення» is not shown.
      await expect(page.getByText('Не забудь встановити порядок відображення')).toBeHidden();
      await expect(shownReminder).toBeHidden();
    } finally {
      await deleteMembersNamed(request, token, ['Анна Коваленко']);
    }
  });
});
