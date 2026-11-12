// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, login } from '../api/team-api';
import { createModalForm, fillProfile, openCreateModal, yesButton } from './admin-team';

test.describe('AC-18 Draft order', () => {
  test('TD-138 The new draft is last in its category tab', async ({ page, request }) => {
    const token = await login(request);
    const names = ['Іван Петренко', 'Анна Коваленко'];
    await deleteMembersNamed(request, token, names);
    try {
      // Preconditions: The admin Team view category tab «Керівництво» already shows «Іван Петренко».
      const categoryId = await categoryIdByName(request, token, 'Керівництво');
      await createTeamMember(request, token, { fullName: 'Іван Петренко', categoryId, description: 'Опис текст' });

      // 1. A draft «Анна Коваленко» in «Керівництво» has just been saved with «ТАК». See Q-17. Test data: Existing member «Іван Петренко». New draft «Анна Коваленко». Open the admin Team view by clicking «Команда».
      await openCreateModal(page);
      // «Опис» is filled because the application keeps «Зберегти як чернетку» disabled while it is empty (see TD-122).
      await fillProfile(page, { name: 'Анна Коваленко', category: 'Керівництво', description: 'Опис текст' });
      await page.getByRole('button', { name: 'Зберегти як чернетку' }).click();
      await yesButton(page).click();
      await expect(createModalForm(page)).toBeHidden();

      // 2. Open the «Керівництво» category tab.
      await page.getByRole('button', { name: 'Керівництво', exact: true }).click();

      // expect: «Анна Коваленко» is the last profile in the «Керівництво» tab, after «Іван Петренко».
      const list = page.getByTestId('infinite-scroll-list');
      await expect(list.getByText('Анна Коваленко', { exact: true })).toBeVisible();
      const profileNames = await list.locator('p').allTextContents();
      const ivanIndex = profileNames.indexOf('Іван Петренко');
      const annaIndex = profileNames.indexOf('Анна Коваленко');
      expect(ivanIndex).toBeGreaterThanOrEqual(0);
      expect(annaIndex).toBeGreaterThan(ivanIndex);
    } finally {
      await deleteMembersNamed(request, token, names);
    }
  });
});
