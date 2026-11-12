import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-161 Confirming publish stores the category', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна Коваленко';
  await deleteMembersNamed(request, token, [fullName]);
  try {
    const categoryId = await categoryIdByName(request, token, 'Керівництво');
    await createTeamMember(request, token, { fullName, categoryId, description: 'Опис текст' });
    const stored = await findMemberByFullName(request, token, fullName);
    expect(stored?.categoryId).toBe(categoryId);
  } finally {
    await deleteMembersNamed(request, token, [fullName]);
  }
});
