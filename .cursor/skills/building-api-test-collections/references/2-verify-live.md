# Stage 2 — Verify the contract on the live API

Goal: answer every open question from stage 1 with a real request, and walk the
full happy path of the feature once. Still **no collection** in this stage.

## Before you start

- Confirm the target is a non-production environment. If unsure, ask.
- Use `curl` or a small script (Node or Python). Keep request bodies in files
  under a temporary folder, not in the repo.

## Rules

- Log in once and reuse the token for the whole stage.
- Name every created entity with a recognizable prefix (e.g. `QA-auto <timestamp>`).
- Record every id you create. At the end, delete all of them and verify the delete
  (e.g. GET returns 404). Report anything you could not clean up.
- Send bodies with non-Latin text from a UTF-8 file:
  `curl --data-binary @body.json -H "Content-Type: application/json" ...`
- For each open question, run the **smallest** request that answers it. Examples:
  - create with a given status and without an optional field → is it accepted?
  - upload with and without the `data:` prefix → which one works?
  - read an entity after delete → 404, 200 with a flag, or 410?
  - call a protected endpoint without a token and with a broken token → 401 or 403?
  - send a value the UI forbids → does the server reject it?
- Walk the happy path once: create → read (admin and public view, if both exist)
  → update → delete → read again.

## Output

Fill section 4 of the facts file: question → request → actual status and relevant
body → conclusion. List surprises separately (contradictions with the spec, missing
server-side validation, unexpected side effects). Fill the cleanup section.

Questions you could not answer go to section 5 "Not covered" with the reason.
Show the user the table and the surprises, and wait before stage 3.
