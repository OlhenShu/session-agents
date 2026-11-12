---
name: building-api-test-collections
description: >-
  Builds a Postman/newman API test collection for one feature of a web
  app in four stages: discover the real API and auth, verify open
  questions on a live non-production environment, build and run the
  collection, and optionally cover file upload. Every fact is recorded
  in a facts file, so the tests rely only on verified behavior. Use it
  whenever the user wants to cover a feature's API with automated tests,
  create a Postman or newman collection for some endpoints, check how an
  API really behaves before writing tests, or continue a stage of this
  process ("do discovery for the categories API", "verify the open
  questions", "build the collection from the facts file"), even if
  they do not name Postman. Do not use it for a single ad-hoc request,
  load testing, UI tests, API documentation, or bug reports.
---

# API test collection for a feature

## Goal
A collection that can be imported, runs green on a clean environment,
runs again without manual cleanup, and fails when the API breaks.

The main risk is tests built on guesses: a wrong base URL, an assumed
enum meaning, an imagined 404. Such tests either fail for the wrong
reason or pass while the API is broken. That is why the work goes in
stages, and every fact is written down with its source before a test
relies on it.

## The facts file
Copy [assets/facts-template.md](assets/facts-template.md) to
`postman/facts-<feature>.md` in the project (unless the user names
another place) at the start of stage 1, and keep it updated through all
stages. Mark each fact as **observed** (seen in traffic or a live
response), **documented** (spec only) or **assumed** (not checked yet).
When the spec and the traffic disagree, the traffic wins and the
mismatch is a finding.

If the user starts in a later stage, read the existing facts file first.
If there is none, or the sections the stage needs are empty, say so and
offer to run the earlier stage instead of guessing.

## Stages
Read the stage file when you reach that stage, not before.

| Stage | File | What it produces | Changes data? |
|-------|------|------------------|---------------|
| 1. Discovery | [references/1-discovery.md](references/1-discovery.md) | Base URL, auth flow, endpoint table, open questions (facts sections 1–3) | No, read-only |
| 2. Verify live | [references/2-verify-live.md](references/2-verify-live.md) | Answer to every open question, happy path once, cleanup (sections 4–5) | Yes, test data only, cleaned up |
| 3. Collection | [references/3-collection.md](references/3-collection.md) | `postman/*.postman_collection.json` + environment, two newman runs | Yes, cleaned up by the collection |
| 4. File upload | [references/4-file-upload.md](references/4-file-upload.md) | Upload folder in the collection | Only if the feature has files |

## Stop points
- **After stage 1:** show the summary (base URL, auth flow, number of
  endpoints, open questions, facts vs assumptions) and ask before
  sending any request that changes data.
- **Before stage 2:** make sure the target is not production. If you
  cannot tell, ask. Test data on production can reach real users.
- **After stage 2:** show the verification table and the surprises, and
  wait. The user decides whether a surprise is a bug to report or the
  intended behavior, and that decides what the collection asserts.

## Rules that hold in every stage
- Do not invent endpoints, fields, statuses or ids. Unknown things stay
  an open question until a real request answers them.
- Credentials never go into committed files. The environment file keeps
  them empty with type `secret`; the user fills them locally or passes
  `--env-var`.
- Everything you create gets a recognizable prefix (`QA-auto <timestamp>`)
  and is deleted at the end; report anything left behind.
- Do not claim a collection passes without showing the newman output.
- A server that accepts what the requirements forbid is a finding. Report
  it; do not adjust the test to hide it. If a bug-report skill is
  available (for example `writing-bug-reports`), use it to draft the report.
