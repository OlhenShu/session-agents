import { test, expect } from '@playwright/test';
import { categoryNameById, createTeamMember, deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-053 A category that is not stored is rejected', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна Коваленко';
  const categoryId = 999999;
  await deleteMembersNamed(request, token, [fullName]);
  try {
    const storedCategoryName = await categoryNameById(request, token, categoryId);
    if (storedCategoryName !== undefined) {
      throw new Error('GET /api/TeamCategories returned an item whose id is 999999');
    }
    await createTeamMember(request, token, { fullName, categoryId });
    const stored = await findMemberByFullName(request, token, fullName);
    expect(stored).toBeUndefined();
  } finally {
    await deleteMembersNamed(request, token, [fullName]);
  }
});
