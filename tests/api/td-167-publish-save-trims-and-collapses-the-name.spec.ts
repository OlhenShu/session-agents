import { test, expect } from '@playwright/test';
import { categoryIdByName, createTeamMember, deleteMembersNamed, login, membersByCategoryId } from './team-api';

test('TD-167 Publish save trims and collapses the name', async ({ request }) => {
  test.fixme();
  const token = await login(request);
  const submittedName = '  Анна  Марія  ';
  const storedName = 'Анна Марія';
  await deleteMembersNamed(request, token, [submittedName, storedName]);
  try {
    const categoryId = await categoryIdByName(request, token, 'Керівництво');
    await createTeamMember(request, token, {
      fullName: submittedName,
      categoryId,
      description: 'Опис текст',
    });
    const stored = (await membersByCategoryId(request, token, categoryId)).find(
      (member) => member.fullName === storedName,
    );
    // FIXME: the application trims the leading and trailing spaces but keeps the double space between the words,
    // so it stores «Анна  Марія» (two spaces) and no entry has fullName «Анна Марія».
    expect(stored?.fullName).toBe('Анна Марія');
  } finally {
    await deleteMembersNamed(request, token, [submittedName, storedName]);
  }
});
