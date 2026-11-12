import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-135 Confirming draft save stores an empty description', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна Коваленко';
  await deleteMembersNamed(request, token, [fullName]);
  try {
    const categoryId = await categoryIdByName(request, token, 'Керівництво');
    await createTeamMember(request, token, { fullName, categoryId, description: '' });
    const stored = await findMemberByFullName(request, token, fullName);
    expect(stored?.description).toBe('');
  } finally {
    await deleteMembersNamed(request, token, [fullName]);
  }
});
