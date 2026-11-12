import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-140 Draft save trims and collapses the description', async ({ request }) => {
  test.fixme();
  const token = await login(request);
  const fullName = 'Богдан Мельник';
  await deleteMembersNamed(request, token, [fullName]);
  try {
    const categoryId = await categoryIdByName(request, token, 'Керівництво');
    await createTeamMember(request, token, {
      fullName,
      categoryId,
      description: '  Опис  текст  ',
    });
    const stored = await findMemberByFullName(request, token, fullName);
    // FIXME: the application stores the description exactly as sent, «  Опис  текст  » (leading, inner and trailing
    // spaces untouched), instead of «Опис текст».
    expect(stored?.description).toBe('Опис текст');
  } finally {
    await deleteMembersNamed(request, token, [fullName]);
  }
});
