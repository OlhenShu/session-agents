import fs from 'fs';
import path from 'path';
import { APIRequestContext } from '@playwright/test';

function loadDotEnv(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv(path.resolve(__dirname, '../../.env'));

export const apiOrigin = 'http://localhost:8080';

export type TeamMember = {
  id: number;
  fullName: string | null;
  categoryId: number;
  description: string | null;
  image?: unknown;
};

/** Properties of CreateTeamMemberDto. Status is omitted: the Status enum is 0 and 1 with no Чернетка or Опубліковано mapping. */
export type CreateTeamMemberBody = {
  fullName?: string;
  categoryId?: number;
  description?: string | null;
  imageId?: number | null;
};

/** Admin credentials from .env (USER.EMAIL and USER.PASSWORD). */
export function adminCredentials(): { email: string; password: string } {
  const email = process.env['USER.EMAIL'];
  const password = process.env['USER.PASSWORD'];
  if (!email || !password) {
    throw new Error('USER.EMAIL or USER.PASSWORD is missing from .env');
  }
  return { email, password };
}

/** Collapses runs of whitespace and trims, so leftovers of the whitespace checks can be matched for cleanup. */
function normalizedName(value: string | null | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

function bearer(accessToken: string): { Authorization: string } {
  return { Authorization: `Bearer ${accessToken}` };
}

export async function login(request: APIRequestContext): Promise<string> {
  const email = process.env['USER.EMAIL'];
  const password = process.env['USER.PASSWORD'];
  if (!email || !password) {
    throw new Error('USER.EMAIL or USER.PASSWORD is missing from .env');
  }
  const response = await request.post(`${apiOrigin}/api/auth/login`, {
    data: { email, password },
  });
  let body: { accessToken?: string | null };
  try {
    body = await response.json();
  } catch {
    throw new Error('Login response is not JSON AuthResponseDto');
  }
  if (!body.accessToken) {
    throw new Error('AuthResponseDto.accessToken is missing from the login response');
  }
  return body.accessToken;
}

async function teamCategories(
  request: APIRequestContext,
  accessToken: string,
): Promise<{ id: number; name: string | null }[]> {
  const response = await request.get(`${apiOrigin}/api/TeamCategories`, {
    headers: bearer(accessToken),
  });
  const categories = (await response.json()) as { id: number; name: string | null }[];
  if (!Array.isArray(categories)) {
    throw new Error('GET /api/TeamCategories did not return an array');
  }
  return categories;
}

export async function categoryIdByName(
  request: APIRequestContext,
  accessToken: string,
  name: string,
): Promise<number> {
  const existing = (await teamCategories(request, accessToken)).find((category) => category.name === name);
  if (existing) {
    return existing.id;
  }
  const created = await request.post(`${apiOrigin}/api/TeamCategories`, {
    headers: bearer(accessToken),
    data: { name, description: name },
  });
  const body = (await created.json()) as { id?: number; name?: string | null };
  if (typeof body.id === 'number') {
    return body.id;
  }
  const match = (await teamCategories(request, accessToken)).find((category) => category.name === name);
  if (!match) {
    throw new Error(`POST /api/TeamCategories did not store a category named ${name}`);
  }
  return match.id;
}

export async function categoryNameById(
  request: APIRequestContext,
  accessToken: string,
  categoryId: number,
): Promise<string | null | undefined> {
  const categories = await teamCategories(request, accessToken);
  return categories.find((category) => category.id === categoryId)?.name;
}

export async function createTeamMember(
  request: APIRequestContext,
  accessToken: string,
  body: CreateTeamMemberBody,
): Promise<void> {
  await request.post(`${apiOrigin}/api/TeamMembers`, {
    headers: bearer(accessToken),
    data: body,
  });
}

export async function findMemberByFullName(
  request: APIRequestContext,
  accessToken: string,
  fullName: string,
): Promise<TeamMember | undefined> {
  const response = await request.get(`${apiOrigin}/api/TeamMembers/search`, {
    headers: bearer(accessToken),
    params: { FullName: fullName },
  });
  const body = (await response.json()) as { items?: TeamMember[] | null };
  return (body.items ?? []).find((member) => member.fullName === fullName);
}

/** Every item from GET /api/TeamMembers for CategoryId. Offset and Limit are that operation's query parameters. */
export async function membersByCategoryId(
  request: APIRequestContext,
  accessToken: string,
  categoryId: number,
): Promise<TeamMember[]> {
  const limit = 50;
  const collected: TeamMember[] = [];
  let offset = 0;
  let totalItemsCount = Number.POSITIVE_INFINITY;

  while (offset < totalItemsCount) {
    const response = await request.get(`${apiOrigin}/api/TeamMembers`, {
      headers: bearer(accessToken),
      params: { CategoryId: categoryId, Offset: offset, Limit: limit },
    });
    const body = (await response.json()) as {
      items?: TeamMember[] | null;
      totalItemsCount?: number;
    };
    const page = body.items ?? [];
    collected.push(...page);
    if (page.length === 0) {
      break;
    }
    offset += page.length;
    if (typeof body.totalItemsCount !== 'number') {
      break;
    }
    totalItemsCount = body.totalItemsCount;
  }

  return collected;
}

export async function deleteMembersNamed(
  request: APIRequestContext,
  accessToken: string,
  fullNames: string[],
): Promise<void> {
  const ids = new Set<number>();
  for (const fullName of fullNames) {
    // The application may store a name with its inner spaces untouched and the search matches on a substring,
    // so search for the first word and compare on the normalised form.
    const firstWord = normalizedName(fullName).split(' ')[0];
    const response = await request.get(`${apiOrigin}/api/TeamMembers/search`, {
      headers: bearer(accessToken),
      params: { FullName: firstWord },
    });
    const body = (await response.json()) as { items?: { id: number; fullName: string | null }[] | null };
    for (const member of body.items ?? []) {
      if (member.fullName === fullName || normalizedName(member.fullName) === normalizedName(fullName)) {
        ids.add(member.id);
      }
    }
  }
  for (const id of ids) {
    await request.delete(`${apiOrigin}/api/TeamMembers/${id}`, {
      headers: bearer(accessToken),
    });
  }
}
