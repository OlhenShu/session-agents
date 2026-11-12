import { test, expect } from '@playwright/test';
import { deleteMembersNamed, findMemberByFullName, login } from './team-api';

test('TD-132 Declining draft save does not create a profile', async ({ request }) => {
  const token = await login(request);
  const fullName = 'Анна Коваленко';
  await deleteMembersNamed(request, token, [fullName]);
  const stored = await findMemberByFullName(request, token, fullName);
  expect(stored).toBeUndefined();
});
