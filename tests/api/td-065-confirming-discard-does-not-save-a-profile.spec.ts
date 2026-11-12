import { test, expect } from '@playwright/test';
import { deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-065 Confirming discard does not save a profile', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна';
  await deleteMembersNamed(request, token, [fullName]);
  const stored = await findMemberByFullName(request, token, fullName);
  expect(stored).toBeUndefined();
});
