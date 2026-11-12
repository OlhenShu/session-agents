---
name: test-design
description: Turns a user story with acceptance criteria into a structured test design in docs/test-design.md, applying black-box test design techniques and splitting every check into UI or API level. Use this skill whenever a user story, requirement or acceptance criteria need to be analysed for testing, whenever test cases, test conditions or a test design must be produced before writing tests, and as the first step of the QA chain (story-analyst) — even if the words "test design" are not used.
---

# Test design

Produce a test design that the rest of the QA chain can rely on: the planner, the generators and the reviewer all compare their work against it, so anything missing or invented here spreads through every later step.

## Input

The user story file (normally `docs/stories/<ID>.md`). Acceptance criteria in it are numbered `AC-1`, `AC-2`, … If they are not numbered, number them in the order they appear and say so in the open questions section.

Use only the story, the materials it links to, and the OpenAPI files in `docs/api`. Do not add requirements from general knowledge of "how such features usually work".

For an API-level check, name the real operation from `docs/api` (method and path) in the steps, and use property names from that operation's request and response schemas in the test data and the expected result. Messages, limits, and business rules still come only from the story. If no operation can carry the check, write the expected result as "TBD — see Q-n" and say which path or property is missing. Do not invent paths, properties, enum values, or status codes.

## Workflow

1. Read the whole story and the OpenAPI files in `docs/api`. List every acceptance criterion and every business rule, input, state and role the story mentions. Note which operations can observe the API-level rules.
2. Note ambiguities: missing limits, undefined error behaviour, unclear roles, contradictions. They go to "Questions for the PO" — do not resolve them by guessing.
3. For each acceptance criterion, pick the techniques that fit it (see below) and derive checks.
4. Assign each check a level: UI or API (see below).
5. Verify coverage: every acceptance criterion has at least one check. A criterion you cannot cover because it is ambiguous is listed under open questions with the reason.
6. Write the result to `docs/test-design.md` in the format below. Do not write test code.

## Techniques

Choose by what the criterion describes; one criterion often needs more than one technique.

- **Equivalence partitioning** — the criterion accepts or rejects ranges or groups of input values. One check per valid partition and per invalid partition; do not combine several invalid partitions in one check, or a failure will not show which one caused it.
- **Boundary value analysis** — the partitions are ordered (lengths, amounts, dates, counts). Check each boundary and the closest value on the other side of it (2-value BVA). Use 3-value BVA only when an off-by-one error is especially likely or costly, and say why.
- **Decision table testing** — the outcome depends on a combination of conditions (role and status, flags, toggles). Build the table of conditions and actions, then one check per meaningful rule; collapse rules whose outcome does not depend on a condition and state that you did.
- **State transition testing** — the feature has states and events (draft → submitted → approved, locked accounts, sessions). Cover every valid transition at least once and the invalid transitions the story mentions or clearly implies.
- **Error guessing** — after the systematic techniques, add a small number of checks for typical failures of this kind of feature (empty input, duplicates, whitespace, repeated submission). Mark them with the technique `error guessing` so a reviewer can tell them apart from requirement-derived checks, and keep each one tied to a criterion.

## UI or API

Check each behaviour at the lowest level where it can be observed.

- **API**: business rules and calculations, server-side validation, access rights and roles, data persistence, status codes and response contracts. The check calls an operation from `docs/api`.
- **UI**: navigation and user flows across screens, what is displayed and how, client-side validation messages, the state of controls (enabled, disabled, visible), what the user sees after a server response.

Do not duplicate one rule at both levels. When the UI exposes a server rule (for example, an error message after a rejected request), write one API check for the rule and one UI check that the user sees the result.

## Output format

Write `docs/test-design.md` like this:

```markdown
# Test design: <story ID> <story title>

## Coverage summary
- AC-1: TD-001, TD-002, TD-003
- AC-2: TD-004
- AC-3: not covered — see Q-1

## Checks

### TD-001 <short name in one line>
- Acceptance criterion: AC-1
- Level: API
- Contract: POST /api/example — method and path from docs/api; omit this line for a UI check
- Technique: boundary value analysis
- Preconditions: <state of the system and data before the check>
- Test data: <concrete values>
- Steps:
  1. <action>
  2. <action>
- Expected result: <one observable outcome>

## Questions for the PO
- Q-1 (AC-3): <what is unclear and what decision is needed>
```

Rules for every check:

- One check — one expected behaviour. If the expected result contains "and" joining two independent outcomes, split it into two checks.
- The expected result is observable and concrete: a message text, a status code, a field value, a page the user lands on. Not "works correctly" or "an error is shown".
- Test data are concrete values, not descriptions such as "a long name". For boundaries, give the exact boundary value.
- Check IDs are stable: when you update an existing design, keep existing IDs and add new ones at the end. Later steps name tests by these IDs.
- Every check links to exactly one acceptance criterion.
- An API check has a Contract line. That method and path exist in `docs/api`, and the steps use that operation. A UI check has no Contract line.

## What not to do

- Do not invent requirements, limits or messages that are not in the story. If an expected result is unknown, write the check with the expected result "TBD — see Q-n" and add the question.
- Do not write test code, locators or selectors; the design describes behaviour, not implementation.
- Do not drop a criterion silently. Uncovered criteria appear in the coverage summary with a reason.
- Do not change existing checks when asked only to add new ones.