// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { deleteMembersNamed, login } from '../api/team-api';
import { openAdminTeam, publishProfileThroughUi } from './admin-team';

test.describe('AC-22 Public Team order', () => {
  test('TD-169 The published profile is last on the public Team page', async ({ page, request }) => {
    const token = await login(request);
    const names = ['Іван Петренко', 'Анна Коваленко'];
    await deleteMembersNamed(request, token, names);
    try {
      // Preconditions: The public Team page already shows «Іван Петренко» in «Керівництво». «Анна Коваленко» has just been published in «Керівництво».
      await openAdminTeam(page);
      await publishProfileThroughUi(page, { name: 'Іван Петренко', category: 'Керівництво', description: 'Опис текст' });
      await publishProfileThroughUi(page, { name: 'Анна Коваленко', category: 'Керівництво', description: 'Опис текст' });

      // 1. Test data: Existing public profile «Іван Петренко». Published profile «Анна Коваленко». Open the public Team page «Наша команда» at /team.
      await page.goto('/team');

      // 2. Open the «Керівництво» category.
      // The public page has no control for it: «Керівництво» is the only category and it is shown as a section heading.
      await expect(page.getByRole('heading', { name: 'Керівництво' })).toBeVisible();

      // expect: «Анна Коваленко» is the last profile in «Керівництво», after «Іван Петренко».
      await expect(page.getByText('Анна Коваленко', { exact: true })).toBeVisible();
      const paragraphs = await page.locator('p').allTextContents();
      const ivanIndex = paragraphs.indexOf('Іван Петренко');
      const annaIndex = paragraphs.indexOf('Анна Коваленко');
      expect(ivanIndex).toBeGreaterThanOrEqual(0);
      expect(annaIndex).toBeGreaterThan(ivanIndex);
    } finally {
      await deleteMembersNamed(request, token, names);
    }
  });
});
