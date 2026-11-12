# Stage 1 — Discovery (read-only)

Goal: find the real API base URL, the auth flow and the endpoints of the feature,
and list what still has to be checked live. **Create, change or delete nothing.**

## Steps

1. **Find the real API, do not guess it.** The API is often on a different host or
   port than the frontend, or behind a path prefix. Log in through the UI with
   Playwright (or ask the user for a HAR / DevTools Network export) and record the
   requests the app actually sends: host, path prefix, login request, how the token
   comes back (body field, cookie, header) and how it is sent afterwards.
2. **Read the spec for the feature only.** From the OpenAPI file, list just the
   endpoints the feature needs: method, path, request schema, response schema,
   documented status codes, whether auth is required. Note where the spec and the
   observed traffic disagree; traffic wins, the mismatch is a finding.
3. **If there is no spec,** build the endpoint table from observed traffic while
   walking through the feature in the UI, and mark every row as observed.
4. **List open questions.** Typical gaps the spec leaves:
   - meaning of enums and numeric codes (e.g. `status: 0/1`);
   - which fields are required in which state (draft vs published);
   - file or image upload format (multipart, base64, with or without `data:` prefix),
     size and type limits;
   - side effects of delete (cascades, orphaned files, soft delete);
   - which endpoints require auth and which role;
   - validation the UI does that the server may not repeat;
   - ordering, pagination, public vs admin views of the same data.
   Keep only questions whose answer changes a request or an assertion.

## Output

Fill sections 1–3 of the facts file. Then give the user a short summary: base URL,
auth flow, number of endpoints, the open questions. Label facts vs assumptions.
