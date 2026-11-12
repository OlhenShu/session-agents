# Stage 3 — Build and run the collection

Goal: a Postman collection that can be imported, runs green on a clean
environment, runs again without manual cleanup, and fails when the API breaks.
Use **only** behavior marked as verified in the facts file.

## Files

```
postman/<Project>-<Feature>.postman_collection.json   (Postman v2.1 JSON)
postman/<Project>-<env>.postman_environment.json
```

## Environment

- `baseUrl`, plus credential variables (e.g. `adminEmail`, `adminPassword`).
- Credentials are of type `secret` and **empty** in the committed file. Tell the
  user to fill them locally in Postman or pass them on the command line:
  `--env-var adminPassword=...`.

## Collection structure

Folders run in this order:

1. **0. Auth** — login request with `noauth`. Its test script checks the status,
   checks the token exists and saves it to a collection variable. All other
   requests inherit collection-level auth (e.g. Bearer `{{token}}`).
2. **1. Prepare** — find or create whatever the feature depends on (a parent
   category, a valid reference id). Never hard-code ids that exist only on one
   machine.
3. **2. Create**, **3. Read**, **4. Update**, **5. Delete** — the happy path.
4. **6. Negative** — only the negative cases confirmed in stage 2 (missing required
   field → 400, read after delete → 404, invalid value → 4xx...).
5. **7. Security** — protected endpoints without a token → the status observed in
   stage 2.

## Assertions

- Every request checks the status **and** the body fields that matter: returned id,
  saved values equal to what was sent, state fields, relations. "200 OK" alone is
  not a test.
- Check business rules the API exposes, taken from requirements or test cases
  (e.g. a draft does not appear on the public endpoint, a new item appears in the
  expected position).
- Response-time or schema checks only if the user asks for them.
- Test names describe the expectation: `Create: returns 201 and the saved title`,
  not `Status code is 200`.

## Variables and data

- Pass ids between requests through collection variables (`pm.collectionVariables.set`).
- Generate unique test data in pre-request scripts (prefix + timestamp).
- The collection deletes everything it creates and unsets temporary variables in
  the last request, so it can run repeatedly.
- Do not add requests or expectations that are not backed by the facts file.

## Run it

```bash
npx -y newman run postman/<collection>.json -e postman/<environment>.json \
  --env-var adminPassword=<value>
```

Run it twice in a row: the second run proves cleanup works.

## Output

- The newman summary of both runs (requests, assertions, failures).
- The list of assertions per request.
- What stays unverified (section 5 of the facts file).
- Findings from stage 2 and whether the collection currently expects the
  correct behavior (and fails) or documents the current behavior (flagged).

Never claim the collection passes without showing the run.
