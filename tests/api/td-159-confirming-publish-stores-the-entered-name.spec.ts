import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-159 Confirming publish stores the entered name', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна Коваленко';
  await deleteMembersNamed(request, token, [fullName]);
  try {
    const categoryId = await categoryIdByName(request, token, 'Керівництво');
    await createTeamMember(request, token, { fullName, categoryId, description: 'Опис текст' });
    const stored = await findMemberByFullName(request, token, fullName);
    expect(stored?.fullName).toBe('Анна Коваленко');
  } finally {
    await deleteMembersNamed(request, token, [fullName]);
  }
});
