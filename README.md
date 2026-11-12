# QA chain for US-01 / Ланцюжок QA для US-01

[English](#english) · [Українська](#українська)

---

# English

Playwright tests and Cursor subagents for **[TM01] Create a team member as a draft or publish immediately**. The story file is the source of requirements. The HTTP contract comes only from the OpenAPI file. Later steps do not invent requirements, paths, or fields.

The prompts are in English because the agent files are in English. Paste them as they are.

## 📂 What lives where

| Path | What it is |
| --- | --- |
| `docs/stories/1.md` | Story US-01 (GitHub issue 1). There is no `docs/stories/US-01.md`. |
| `docs/api/victory-center-openapi.json` | The only HTTP contract: method, path, body, status, field names. |
| `docs/test-design.md` | Checks `TD-xxx`. Each one is UI or API, tied to one `AC-n`. |
| `docs/questios-to-PO.md` | Open questions (`Q-n`) and TBD checks taken out of the design. |
| `specs/US-01.md` | UI test plan. One scenario per UI check. Seed: `tests/seed.spec.ts`. |
| `tests/ui/` | UI specs. The file name starts with the check id. |
| `tests/ui/admin-team.ts` | Shared UI steps: login, open the team page, open the modal. |
| `tests/api/` | API specs. Same naming. |
| `tests/api/team-api.ts` | Shared API client. Reads `USER.EMAIL` and `USER.PASSWORD` from `.env`. Calls `http://localhost:8080`. |
| `tests/fixtures/` | Images the photo checks upload. |
| `tests/seed.spec.ts` | Seed the planner and generator name. It opens the login page. |
| `tests/ui/seed.spec.ts` | The same seed inside `tests/ui/`, so `npx playwright test` can see it. |
| `seed.spec.ts` | A third copy at the repo root. The suite does not pick it up: `testDir` is `./tests`. |
| `docs/coverage-matrix.md` | Criterion, check id, test file, status. Written after the tests-mode review. |
| `docs/bugs/` | One draft bug per test the healer skipped with `test.fixme()`. |
| `.cursor/agents/` | Custom subagents: analyst, API writer, reviewer, bug reporter. |
| `.cursor/skills/test-design/SKILL.md` | How a story becomes `docs/test-design.md`. The analyst follows this file. |
| `.cursor/skills/evaluating-playwright-run-metrics/` | Reads a Playwright log, JSON report, or JUnit XML and judges duration, retries, and failure clusters. |
| `.cursor/skills/playwright-report-metrics/` | Turns a Playwright JSON report into a short note and says what each number is for. |
| `.cursor/skills/building-api-test-collections/` | Builds a Postman collection for one feature: discover the API, check it live, then write and run the collection. |
| `.cursor/skills/writing-bug-reports/` | Turns a free-form problem into a bug report: title, environment, steps, actual, expected, severity, priority. |
| `.cursor/skills/github-bug-board/` | Drafts a GitHub issue from a bug report and publishes it only when asked, naming the repository. |
| `.claude/agents/` | Playwright planner, generator, and healer from `init-agents`. |
| `.mcp.json` | Playwright test MCP server (`playwright-test`). |
| `playwright.config.ts` | `baseURL` `http://localhost:3000/login`. One worker. Matches `tests/ui` and `tests/api` only. |
| `.env` | Admin of the stand under test. Do not commit it. |

## 1. 🧰 Initialize the project

Node.js 18 or newer. From this folder install Playwright and the Chromium build the config uses.

```bash
npm install
npx playwright install chromium
```

Create `.env` in the repo root. `tests/api/team-api.ts` reads these two keys:

```
USER.EMAIL=admin@example.com
USER.PASSWORD=your-password
```

`playwright.config.ts` sets `workers: 1` on purpose. UI and API tests share one database and the same profile names, so a second worker collides with the first.

## 2. 🌐 Where it runs

Locally the UI is at `http://localhost:3000/login` and the API at `http://localhost:8080`. UI tests open only that login URL.

For any other stand, set `baseURL` in `playwright.config.ts` and `apiOrigin` in `tests/api/team-api.ts`, and put that stand's admin in `.env` (`USER.EMAIL`, `USER.PASSWORD`).

## 3. 🔌 Add the Playwright MCP

Planner, generator, and healer drive a real browser through the Playwright test MCP server. `init-agents` writes `.mcp.json` for you. This repo already contains that file. On a new machine, generate it again after `npm install`.

```bash
npx playwright init-agents --loop=claude
```

That command writes `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "cmd",
      "args": ["/c", "npx", "playwright", "run-test-mcp-server"]
    }
  }
}
```

On macOS and Linux the command is `npx` with args `playwright`, `run-test-mcp-server` (no `cmd /c`).

In Cursor, connect this server if it is not already listed: **Settings → MCP → Add server**, same command and args, name `playwright-test`. Reload the window. Planner, generator, and healer need this server. The analyst, API writer, reviewer, and bug reporter do not.

`--loop=vscode` writes `.vscode/mcp.json` instead. This repo uses `--loop=claude`, which matches `.claude/agents/` and `.mcp.json`.

## 4. 🎭 Playwright agents

The same `init-agents` command writes the three browser agents into `.claude/agents/`:

| File | Role |
| --- | --- |
| `playwright-test-planner.md` | Explores the app and saves a markdown plan with `planner_save_plan`. |
| `playwright-test-generator.md` | Acts out one scenario, then writes one spec with `generator_write_test`. |
| `playwright-test-healer.md` | Runs failures, fixes locators and waits, and may mark a test `test.fixme()`. |

In chat, call them by the name after the slash: `/playwright-test-planner`, `/playwright-test-generator`, `/playwright-test-healer`.

## 5. 🤖 Custom subagents

A subagent is a markdown file in `.cursor/agents/`. The `name` in the frontmatter is the name you type after `/`. Cursor reads the folder from this project. The four agents below are already there. Copy the shape when you add another.

```markdown
---
name: story-analyst
description: One sentence. Cursor uses it to decide when to delegate.
---

The instructions for this agent. Say which files to read and which file to write.
```

Add `readonly: true` when the agent must only report and must not edit files. `design-reviewer` is read-only.

| Agent | File | Writes |
| --- | --- | --- |
| `story-analyst` | `.cursor/agents/story-analyst.md` | `docs/test-design.md`, using `.cursor/skills/test-design/SKILL.md` |
| `api-test-writer` | `.cursor/agents/api-test-writer.md` | `tests/api/*.spec.ts` for checks marked API |
| `design-reviewer` | `.cursor/agents/design-reviewer.md` | Nothing. Plan mode after the planner. Tests mode after the healer. |
| `bug-reporter` | `.cursor/agents/bug-reporter.md` | `docs/bugs/<ID>.md` for each `test.fixme()` |

Ask Cursor with `/create-subagent` and one brief: what the agent reads, what it writes, and what it must not invent. Then open the new file and check the frontmatter.

These are the briefs used to create the four agents. A later brief told the same skill to take the real API from `docs/api`.

**story-analyst**

```text
/create-subagent
Create a project subagent in .cursor/agents/story-analyst.md

Name: story-analyst
Description (for delegation): Analyses a user story and writes a test design split into UI/API. Use as the first step of the QA chain.
Role: test analyst.
Reads: the story in docs/stories/<ID>.md and the test-design skill.
Does: applies the test-design skill; each check has an ID, the acceptance criterion from the story (AC-ID), UI or API level, preconditions, steps, expected result; every acceptance criterion is covered by at least one check.
Writes the result to: docs/test-design.md.
Prohibitions: does not invent requirements that are not in the story — open points go under "Questions for the PO"; does not write test code.
Permissions: do not enable readonly, the subagent writes a file.

Keep the instructions short, with no extra roles or steps beyond these. After creating it, show the path and the full file content.
```

**design-reviewer**

```text
/create-subagent
design-reviewer → .cursor/agents/design-reviewer.md
Description: Checks chain artifacts against the test design and the story. Mode plan — after the planner, mode tests — after the healer, with a coverage matrix.
Role: test documentation reviewer.
Plan mode: the reference is docs/test-design.md (UI-level checks only); compares the plan in specs/ with it; flags design checks missing from the plan, scenarios and expected results in the plan that are not in the design, mismatched preconditions and data.
Tests mode: the reference is the acceptance criteria in docs/stories/<ID>.md; builds a coverage matrix: for each criterion — check IDs from docs/test-design.md, test files in tests/ and a status (covered / skipped by the healer / not covered); separately flags criteria with no check in the design, expects that are not in the design, and tests whose assertion the healer weakened (from git diff).
Returns: a discrepancy report, and in tests mode also the coverage matrix.
Prohibitions: changes nothing itself; does not conclude whether to proceed — the human decides that.
Permissions: readonly: true.
```

**api-test-writer**

```text
/create-subagent
api-test-writer → .cursor/agents/api-test-writer.md
Description: Writes Playwright API tests with the request fixture for API-level checks in docs/test-design.md.
Role: API test automation engineer.
Reads: only the API-level checks from docs/test-design.md.
Writes: tests in tests/api/; test name = ID and title of the check from the design.
Rules: assertions (expect) exactly from the expected results, nothing more.
Prohibitions: if the design lacks data (endpoint, request body), does not invent it — reports what is missing.
Permissions: do not enable readonly.
```

**bug-reporter**

```text
/create-subagent
bug-reporter → .cursor/agents/bug-reporter.md
Description: Turns tests skipped by the healer into draft bug reports. Use after playwright-test-healer.
Role: QA engineer who writes bug reports.
Reads: tests in tests/ that the healer marked as skipped, the run output, the plan in specs/ and docs/test-design.md.
Writes: for each skipped test, docs/bugs/<ID>.md — title, preconditions, steps to reproduce, expected result (from docs/test-design.md), actual result (from the run output), links to the design check and to the test.
Prohibitions: does not invent the actual result — takes it only from the run output; does not change tests; does not set priority or severity — the human decides that.
Permissions: do not enable readonly.
```

**Later correction, same skill**

```text
/create-subagent виправи таким чином щоб бралася реальна апі для планування і написання апі тестів з docs\api
```

## 🧩 Skills

A skill is a folder in `.cursor/skills/<name>/` with a `SKILL.md`. The `name` in the frontmatter is what you type after `/`. Cursor also reads the description and may apply the skill when the request matches it. For the two report skills, type the name: their descriptions both mention a Playwright report.

`test-design` is part of the chain. `story-analyst` follows it when it writes `docs/test-design.md`. The other five came from the skills workshop. They do not replace the planner, the generator, or the healer.

| Skill | When to use it |
| --- | --- |
| `test-design` | A story needs checks before anyone writes tests. Output is `docs/test-design.md`: id, `AC-n`, UI or API, preconditions, steps, expected result. |
| `evaluating-playwright-run-metrics` | Decide whether a run can be trusted. Verdict is healthy, risky, or broken, from wall-clock time, tests saved by a retry, and failure clusters. Compares two runs. Accepts JSON, a JUnit XML file, or a pasted log. |
| `playwright-report-metrics` | Turn one JSON report into a short note before a release: flaky share, failure groups, browsers, retry time, and `skip` / `fixme` annotations. It does not compare two runs and it does not say whether to ship. |
| `building-api-test-collections` | Build a Postman collection for one feature: discover the API, check open questions on a live non-production stand, then write and run the collection. |
| `writing-bug-reports` | Turn a free-form problem into a bug report with a title, environment, steps, actual and expected result, severity, and priority. |
| `github-bug-board` | Draft that report as a GitHub issue. It publishes only after you ask and name the repository, and it can report a card's status on a GitHub Project board. |

`bug-reporter` and `writing-bug-reports` are different. The subagent writes `docs/bugs/<ID>.md` from a test the healer skipped and does not set severity. The skill writes a report from a description you give it and does set severity and priority.

## 6. 🔗 The full chain

Run the steps in this order. Wait until a step finishes before you start the next one. Steps 4a and 4b can run together. Steps 6a and 6b can run together. The stand from section 2 has to be up before the planner.

```text
1  story-analyst             docs/stories/1.md + docs/api  →  docs/test-design.md
2  playwright-test-planner   UI checks only                →  specs/US-01.md
3  design-reviewer (plan)    plan vs design                →  discrepancy report in chat
4a playwright-test-generator plan                          →  tests/ui/*.spec.ts
4b api-test-writer            API checks                   →  tests/api/*.spec.ts
5  playwright-test-healer     failing tests                →  fixes, or test.fixme()
6a design-reviewer (tests)    story vs tests               →  coverage matrix + report
6b bug-reporter               skipped tests                →  docs/bugs/*.md
```

You decide whether to continue after step 3 and after step 6. The reviewer only lists discrepancies.

Paste this when you want one chat to walk the whole chain. It is the separate prompts from the next section, joined and tightened.

```text
Run the US-01 QA chain in order. Wait for each step to finish. The app is already up: UI http://localhost:3000/login, API http://localhost:8080. Credentials are USER.EMAIL and USER.PASSWORD in .env. Do not print the password.

1. story-analyst. Read docs/stories/1.md and every file in docs/api/. Follow .cursor/skills/test-design/SKILL.md and write docs/test-design.md. Show the checks with their AC ids and the "Questions for the PO" section.

2. playwright-test-planner. Plan only the UI-level checks from docs/test-design.md, in the order they appear, skipping any check whose expected result is TBD. Save the plan to specs/US-01.md. Seed: tests/seed.spec.ts. The only app address is http://localhost:3000/login. Do not add scenarios that are not in the design. Put the check ID on every scenario. Number sections 1, 2, 3… with no gaps.

3. design-reviewer, plan mode. Compare specs/US-01.md with the UI checks in docs/test-design.md. Change nothing. Return a discrepancy report. Stop and show it to me before generating tests.

4. In parallel:
   - playwright-test-generator: generate UI tests from specs/US-01.md into tests/ui/. One file per scenario. The file name starts with the check ID. Keep each expected result from the design. Seed: tests/ui/seed.spec.ts.
   - api-test-writer: write tests/api/ for the API-level checks in docs/test-design.md. Call only operations in docs/api/. Skip a check that the contract cannot express, and say which path or field is missing. Do not add test.fixme for that skip.
   Show the files each agent created.

5. playwright-test-healer. Run tests/ui and tests/api. Fix failures caused by locators, waits, or test data. Do not change expected results taken from docs/test-design.md. If the app does not match the expected result, mark the test test.fixme() instead of weakening the assertion. Show which tests were fixed and which were skipped.

6. In parallel:
   - design-reviewer, tests mode, story docs/stories/1.md. Build a coverage matrix (check IDs, test files, status: covered / skipped by the healer / not covered) and a discrepancy report. Compare healer edits with git diff against the last commit. Change nothing.
   - bug-reporter. For each test the healer skipped, write docs/bugs/<ID>.md. Expected result from docs/test-design.md. Actual result only from the run output.
   Save the matrix from design-reviewer to docs/coverage-matrix.md. Show the matrix, the report, and the list of drafts.
```

## 7. ▶️ Run one step

Type `/` and the agent name, then the prompt. For two agents at once, say `in parallel` in the same message.

### Test design — `story-analyst`

Reads the story and the OpenAPI file, writes `docs/test-design.md`.

```text
Use the story-analyst subagent for the story in docs/stories/1.md (https://github.com/AI-for-QC/Issues/issues/1).
Apply the test-design skill and write the result to docs/test-design.md.
Bind every API check to an operation in docs/api. Do not invent endpoints or fields.
Show the list of checks with their acceptance criteria and the "Questions for the PO" section.
```

### UI plan — `playwright-test-planner`

Plans only the UI checks. The browser must be able to open `http://localhost:3000/login`.

```text
Use the playwright-test-planner subagent.
Plan only the UI-level checks from docs/test-design.md, in the order they appear. Skip checks whose expected result is TBD.
Save the plan to specs/US-01.md. Seed test: tests/seed.spec.ts.
The only app address is http://localhost:3000/login. Do not open the site root and do not open victorycenter.online.
Do not add scenarios that are not in the design. Put the check ID on every scenario.
Number sections in one continuous sequence with no gaps.
```

### Plan review — `design-reviewer` (plan mode)

Compares `specs/US-01.md` with the UI checks. It does not edit files and does not decide to continue.

```text
Use the design-reviewer subagent in plan mode.
The reference is the UI-level checks in docs/test-design.md. Compare the plan in specs/US-01.md with them.
Flag design checks missing from the plan, scenarios and expected results that are not in the design, and mismatched preconditions and data.
Change nothing. Return a discrepancy report. Do not conclude whether to proceed.
```

### Tests — generator and API writer together

UI specs from the plan, API specs from the design. Run both in one message.

```text
Run two subagents in parallel:
1. playwright-test-generator: generate UI tests from specs/US-01.md into tests/ui/. One file per scenario. The file name starts with the check ID from the design. Keep the expected result from the design. Seed: tests/ui/seed.spec.ts. The only app address is http://localhost:3000/login.
2. api-test-writer: write API tests for the API-level checks in docs/test-design.md into tests/api/. Call only operations defined in docs/api/. Assertions come from the expected results in the design. If a check cannot be expressed with the contract, skip it, do not add a file, and report the missing path or field.
Show the list of created files.
```

### Heal — `playwright-test-healer`

Fixes locators, waits, and test data. A mismatch with the expected result becomes `test.fixme()`, not a softer assertion.

```text
Use the playwright-test-healer subagent: run the tests in tests/ui/ and tests/api/ and fix those failing because of locators, waits, or test data.
Do not change the expected results taken from docs/test-design.md. If the app's behaviour does not match the expected result, mark the test as skipped with test.fixme() instead of weakening the assertion.
The app is already up at http://localhost:3000/login and http://localhost:8080.
Show which tests were fixed and which were skipped.
```

### Coverage and bugs — reviewer and bug reporter together

The matrix is a report. Copy it into `docs/coverage-matrix.md` yourself, or ask the parent agent to save it: the reviewer is read-only. The healer diff needs a git repository, because `git diff HEAD` only works when this folder is one.

```text
Run two subagents in parallel:
1. design-reviewer in tests mode for the story docs/stories/1.md: build the coverage matrix and a discrepancy report. Compare post-healer changes against the last commit.
2. bug-reporter: create draft bug reports in docs/bugs/ for the tests the healer skipped.
Save the matrix from design-reviewer to docs/coverage-matrix.md.
Show the matrix, the report, and the list of drafts.
```

## 8. ✅ Run the tests yourself

The stand from section 2 is up, and `.env` matches it.

```bash
npx playwright test
npx playwright test tests/ui
npx playwright test tests/api
npx playwright test tests/ui/td-010-draft-button-starts-disabled.spec.ts
npx playwright show-report
```

`npx playwright test` runs `tests/ui` and `tests/api` only. A `test.fixme()` test is skipped. The HTML report is `playwright-report/`. Traces and failure output are `test-results/`.

Run one suite at a time. A UI run and an API run together write the same profiles.

---

# Українська

Тести Playwright і субагенти Cursor для історії **[TM01] Create a team member as a draft or publish immediately**. Файл історії — джерело вимог. HTTP-контракт береться лише з OpenAPI. Наступні кроки не вигадують вимог, шляхів і полів.

Промпти англійською: так написані файли агентів. Вставляйте їх у чат як є.

## 📂 Де що лежить

| Шлях | Що це |
| --- | --- |
| `docs/stories/1.md` | Історія US-01 (GitHub issue 1). Файла `docs/stories/US-01.md` немає. |
| `docs/api/victory-center-openapi.json` | Єдиний HTTP-контракт: метод, шлях, тіло, статус, імена полів. |
| `docs/test-design.md` | Перевірки `TD-xxx`. Кожна — UI або API і прив’язана до одного `AC-n`. |
| `docs/questios-to-PO.md` | Відкриті питання (`Q-n`) і перевірки TBD, винесені з дизайну. |
| `specs/US-01.md` | UI-план. Один сценарій на одну UI-перевірку. Seed: `tests/seed.spec.ts`. |
| `tests/ui/` | UI-тести. Ім’я файла починається з id перевірки. |
| `tests/ui/admin-team.ts` | Спільні UI-кроки: вхід, сторінка команди, модалка. |
| `tests/api/` | API-тести. Таке саме іменування. |
| `tests/api/team-api.ts` | Спільний API-клієнт. Читає `USER.EMAIL` і `USER.PASSWORD` з `.env`. Ходить на `http://localhost:8080`. |
| `tests/fixtures/` | Зображення для перевірок фото. |
| `tests/seed.spec.ts` | Seed, який називають planner і generator. Відкриває сторінку входу. |
| `tests/ui/seed.spec.ts` | Той самий seed у `tests/ui/`, щоб його бачив `npx playwright test`. |
| `seed.spec.ts` | Третя копія в корені. Набір її не запускає: `testDir` — `./tests`. |
| `docs/coverage-matrix.md` | Критерій, id перевірки, файл тесту, статус. Пишеться після рев’ю в режимі tests. |
| `docs/bugs/` | Один чернетковий баг на тест, який healer позначив `test.fixme()`. |
| `.cursor/agents/` | Власні субагенти: аналітик, API writer, рев’юер, баг-репортер. |
| `.cursor/skills/test-design/SKILL.md` | Як історія стає `docs/test-design.md`. Аналітик іде за цим файлом. |
| `.cursor/skills/evaluating-playwright-run-metrics/` | Читає лог Playwright, JSON-звіт або JUnit XML і оцінює тривалість, ретраї й скупчення падінь. |
| `.cursor/skills/playwright-report-metrics/` | Перетворює JSON-звіт Playwright на коротку записку і пояснює, навіщо кожна цифра. |
| `.cursor/skills/building-api-test-collections/` | Збирає колекцію Postman для однієї фічі: знаходить API, перевіряє наживо, потім пише й проганяє колекцію. |
| `.cursor/skills/writing-bug-reports/` | З вільного опису проблеми робить баг-репорт: назва, середовище, кроки, факт, очікування, severity, priority. |
| `.cursor/skills/github-bug-board/` | Готує чернетку GitHub Issue з баг-репорту і публікує її лише на пряме прохання з назвою репозиторію. |
| `.claude/agents/` | Playwright planner, generator і healer після `init-agents`. |
| `.mcp.json` | MCP-сервер тестів Playwright (`playwright-test`). |
| `playwright.config.ts` | `baseURL` `http://localhost:3000/login`. Один worker. Лише `tests/ui` і `tests/api`. |
| `.env` | Адмін стенда, який тестуєте. Не комітьте. |

## 1. 🧰 Ініціалізація проєкту

Потрібен Node.js 18 або новіший. З цієї папки поставте Playwright і збірку Chromium, яку використовує конфіг.

```bash
npm install
npx playwright install chromium
```

Створіть `.env` у корені репозиторію. `tests/api/team-api.ts` читає ці два ключі:

```
USER.EMAIL=admin@example.com
USER.PASSWORD=your-password
```

У `playwright.config.ts` стоїть `workers: 1` навмисно. UI- й API-тести ділять одну базу й ті самі імена профілів, тож другий worker стикається з першим.

## 2. 🌐 Де що працює

Локально UI — `http://localhost:3000/login`, API — `http://localhost:8080`. UI-тести відкривають лише цю адресу входу.

Для будь-якого іншого стенда задайте `baseURL` у `playwright.config.ts` і `apiOrigin` у `tests/api/team-api.ts`, а в `.env` покладіть адміна того стенда (`USER.EMAIL`, `USER.PASSWORD`).

## 3. 🔌 MCP Playwright

Planner, generator і healer керують живим браузером через MCP-сервер тестів Playwright. `init-agents` сам пише `.mcp.json`. У цьому репозиторії файл уже є. На новій машині згенеруйте його знову після `npm install`.

```bash
npx playwright init-agents --loop=claude
```

Команда записує `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "cmd",
      "args": ["/c", "npx", "playwright", "run-test-mcp-server"]
    }
  }
}
```

На macOS і Linux команда — `npx` з аргументами `playwright`, `run-test-mcp-server` (без `cmd /c`).

У Cursor підключіть сервер, якщо його ще немає в списку: **Settings → MCP → Add server**, та сама команда й аргументи, ім’я `playwright-test`. Перезавантажте вікно. Сервер потрібен planner, generator і healer. Аналітику, API writer, рев’юеру і баг-репортеру він не потрібен.

`--loop=vscode` пише `.vscode/mcp.json`. Цей репозиторій зібраний через `--loop=claude`: звідси `.claude/agents/` і `.mcp.json`.

## 4. 🎭 Агенти Playwright

Та сама команда `init-agents` кладе трьох браузерних агентів у `.claude/agents/`:

| Файл | Роль |
| --- | --- |
| `playwright-test-planner.md` | Дивиться застосунок і зберігає markdown-план через `planner_save_plan`. |
| `playwright-test-generator.md` | Проходить один сценарій і записує один spec через `generator_write_test`. |
| `playwright-test-healer.md` | Проганяє падіння, лагодить локатори й очікування і може позначити тест `test.fixme()`. |

У чаті їх кличуть ім’ям після слеша: `/playwright-test-planner`, `/playwright-test-generator`, `/playwright-test-healer`.

## 5. 🤖 Власні субагенти

Субагент — це markdown-файл у `.cursor/agents/`. Поле `name` у шапці — це ім’я, яке ви пишете після `/`. Cursor читає теку цього проєкту. Чотири агенти нижче вже лежать у репозиторії. Новий робіть за тим самим зразком.

```markdown
---
name: story-analyst
description: One sentence. Cursor uses it to decide when to delegate.
---

The instructions for this agent. Say which files to read and which file to write.
```

Додайте `readonly: true`, якщо агент лише звітує і не має права змінювати файли. `design-reviewer` саме такий.

| Агент | Файл | Що пише |
| --- | --- | --- |
| `story-analyst` | `.cursor/agents/story-analyst.md` | `docs/test-design.md` за `.cursor/skills/test-design/SKILL.md` |
| `api-test-writer` | `.cursor/agents/api-test-writer.md` | `tests/api/*.spec.ts` для перевірок рівня API |
| `design-reviewer` | `.cursor/agents/design-reviewer.md` | Нічого. Режим plan після planner. Режим tests після healer. |
| `bug-reporter` | `.cursor/agents/bug-reporter.md` | `docs/bugs/<ID>.md` для кожного `test.fixme()` |

Створюйте через `/create-subagent` і один бриф: що агент читає, що пише і чого не вигадує. Потім відкрийте новий файл і перевірте шапку.

Нижче бріфи, якими створені чотири агенти. Окремим повідомленням той самий скіл попросили брати реальне API з `docs/api`. Тексти англійською, як їх і давали.

**story-analyst**

```text
/create-subagent
Create a project subagent in .cursor/agents/story-analyst.md

Name: story-analyst
Description (for delegation): Analyses a user story and writes a test design split into UI/API. Use as the first step of the QA chain.
Role: test analyst.
Reads: the story in docs/stories/<ID>.md and the test-design skill.
Does: applies the test-design skill; each check has an ID, the acceptance criterion from the story (AC-ID), UI or API level, preconditions, steps, expected result; every acceptance criterion is covered by at least one check.
Writes the result to: docs/test-design.md.
Prohibitions: does not invent requirements that are not in the story — open points go under "Questions for the PO"; does not write test code.
Permissions: do not enable readonly, the subagent writes a file.

Keep the instructions short, with no extra roles or steps beyond these. After creating it, show the path and the full file content.
```

**design-reviewer**

```text
/create-subagent
design-reviewer → .cursor/agents/design-reviewer.md
Description: Checks chain artifacts against the test design and the story. Mode plan — after the planner, mode tests — after the healer, with a coverage matrix.
Role: test documentation reviewer.
Plan mode: the reference is docs/test-design.md (UI-level checks only); compares the plan in specs/ with it; flags design checks missing from the plan, scenarios and expected results in the plan that are not in the design, mismatched preconditions and data.
Tests mode: the reference is the acceptance criteria in docs/stories/<ID>.md; builds a coverage matrix: for each criterion — check IDs from docs/test-design.md, test files in tests/ and a status (covered / skipped by the healer / not covered); separately flags criteria with no check in the design, expects that are not in the design, and tests whose assertion the healer weakened (from git diff).
Returns: a discrepancy report, and in tests mode also the coverage matrix.
Prohibitions: changes nothing itself; does not conclude whether to proceed — the human decides that.
Permissions: readonly: true.
```

**api-test-writer**

```text
/create-subagent
api-test-writer → .cursor/agents/api-test-writer.md
Description: Writes Playwright API tests with the request fixture for API-level checks in docs/test-design.md.
Role: API test automation engineer.
Reads: only the API-level checks from docs/test-design.md.
Writes: tests in tests/api/; test name = ID and title of the check from the design.
Rules: assertions (expect) exactly from the expected results, nothing more.
Prohibitions: if the design lacks data (endpoint, request body), does not invent it — reports what is missing.
Permissions: do not enable readonly.
```

**bug-reporter**

```text
/create-subagent
bug-reporter → .cursor/agents/bug-reporter.md
Description: Turns tests skipped by the healer into draft bug reports. Use after playwright-test-healer.
Role: QA engineer who writes bug reports.
Reads: tests in tests/ that the healer marked as skipped, the run output, the plan in specs/ and docs/test-design.md.
Writes: for each skipped test, docs/bugs/<ID>.md — title, preconditions, steps to reproduce, expected result (from docs/test-design.md), actual result (from the run output), links to the design check and to the test.
Prohibitions: does not invent the actual result — takes it only from the run output; does not change tests; does not set priority or severity — the human decides that.
Permissions: do not enable readonly.
```

**Пізніше виправлення, той самий скіл**

```text
/create-subagent виправи таким чином щоб бралася реальна апі для планування і написання апі тестів з docs\api
```

## 🧩 Скіли

Скіл — це тека `.cursor/skills/<name>/` з файлом `SKILL.md`. Поле `name` у шапці — це ім’я після `/`. Cursor також читає опис і може застосувати скіл сам, коли запит йому відповідає. Два скіли про звіт викликайте по імені: в обох описах є звіт Playwright.

`test-design` входить у ланцюжок. `story-analyst` іде за ним, коли пише `docs/test-design.md`. Інші п’ять прийшли з воркшопу зі скілів. Вони не замінюють planner, generator і healer.

| Скіл | Коли його кликати |
| --- | --- |
| `test-design` | З історії треба перевірки, перш ніж хтось пише тести. Результат — `docs/test-design.md`: id, `AC-n`, UI або API, передумови, кроки, очікуваний результат. |
| `evaluating-playwright-run-metrics` | Вирішити, чи прогону можна довіряти. Вердикт healthy, risky або broken: стіна годинника, тести, які врятував повтор, і купи падінь. Порівнює два прогони. Бере JSON, JUnit XML або вставлений лог. |
| `playwright-report-metrics` | З одного JSON зробити коротку записку перед релізом: частка нестабільних, групи поломок, браузери, час повторів, анотації `skip` / `fixme`. Два прогони не порівнює і не каже, чи випускати. |
| `building-api-test-collections` | Зібрати колекцію Postman для однієї фічі: знайти API, перевірити відкриті питання на живому непродакшен-стенді, потім написати й прогнати колекцію. |
| `writing-bug-reports` | З вільного опису проблеми зробити баг-репорт: назва, середовище, кроки, факт, очікування, severity і priority. |
| `github-bug-board` | Оформити цей репорт як чернетку GitHub Issue. Публікує лише після прямого прохання з назвою репозиторію і може сказати статус картки на борді GitHub Project. |

`bug-reporter` і `writing-bug-reports` — різне. Субагент пише `docs/bugs/<ID>.md` з тесту, який healer пропустив, і не ставить severity. Скіл пише репорт з опису, який ви йому даєте, і severity з priority ставить.

## 6. 🔗 Повний ланцюжок

Ідіть у цьому порядку. Наступний крок починайте, коли попередній закінчився. Кроки 4a і 4b можна разом. Кроки 6a і 6b можна разом. Стенд із розділу 2 має працювати до planner.

```text
1  story-analyst             docs/stories/1.md + docs/api  →  docs/test-design.md
2  playwright-test-planner   лише UI-перевірки             →  specs/US-01.md
3  design-reviewer (plan)    план проти дизайну            →  звіт про розбіжності в чаті
4a playwright-test-generator план                          →  tests/ui/*.spec.ts
4b api-test-writer            API-перевірки                →  tests/api/*.spec.ts
5  playwright-test-healer     тести, що падають            →  виправлення або test.fixme()
6a design-reviewer (tests)    історія проти тестів         →  матриця покриття і звіт
6b bug-reporter               пропущені тести              →  docs/bugs/*.md
```

Рішення, чи йти далі після кроку 3 і після кроку 6, лишається за вами. Рев’юер лише перелічує розбіжності.

Вставте це, коли один чат має пройти весь ланцюжок. Це окремі промпти з наступного розділу, зібрані в один.

```text
Run the US-01 QA chain in order. Wait for each step to finish. The app is already up: UI http://localhost:3000/login, API http://localhost:8080. Credentials are USER.EMAIL and USER.PASSWORD in .env. Do not print the password.

1. story-analyst. Read docs/stories/1.md and every file in docs/api/. Follow .cursor/skills/test-design/SKILL.md and write docs/test-design.md. Show the checks with their AC ids and the "Questions for the PO" section.

2. playwright-test-planner. Plan only the UI-level checks from docs/test-design.md, in the order they appear, skipping any check whose expected result is TBD. Save the plan to specs/US-01.md. Seed: tests/seed.spec.ts. The only app address is http://localhost:3000/login. Do not add scenarios that are not in the design. Put the check ID on every scenario. Number sections 1, 2, 3… with no gaps.

3. design-reviewer, plan mode. Compare specs/US-01.md with the UI checks in docs/test-design.md. Change nothing. Return a discrepancy report. Stop and show it to me before generating tests.

4. In parallel:
   - playwright-test-generator: generate UI tests from specs/US-01.md into tests/ui/. One file per scenario. The file name starts with the check ID. Keep each expected result from the design. Seed: tests/ui/seed.spec.ts.
   - api-test-writer: write tests/api/ for the API-level checks in docs/test-design.md. Call only operations in docs/api/. Skip a check that the contract cannot express, and say which path or field is missing. Do not add test.fixme for that skip.
   Show the files each agent created.

5. playwright-test-healer. Run tests/ui and tests/api. Fix failures caused by locators, waits, or test data. Do not change expected results taken from docs/test-design.md. If the app does not match the expected result, mark the test test.fixme() instead of weakening the assertion. Show which tests were fixed and which were skipped.

6. In parallel:
   - design-reviewer, tests mode, story docs/stories/1.md. Build a coverage matrix (check IDs, test files, status: covered / skipped by the healer / not covered) and a discrepancy report. Compare healer edits with git diff against the last commit. Change nothing.
   - bug-reporter. For each test the healer skipped, write docs/bugs/<ID>.md. Expected result from docs/test-design.md. Actual result only from the run output.
   Save the matrix from design-reviewer to docs/coverage-matrix.md. Show the matrix, the report, and the list of drafts.
```

## 7. ▶️ Окремий запуск

Наберіть `/` і ім’я агента, далі промпт. Двох агентів одразу запускайте одним повідомленням зі словами `in parallel`.

### Тест-дизайн — `story-analyst`

Читає історію й OpenAPI, пише `docs/test-design.md`.

```text
Use the story-analyst subagent for the story in docs/stories/1.md (https://github.com/AI-for-QC/Issues/issues/1).
Apply the test-design skill and write the result to docs/test-design.md.
Bind every API check to an operation in docs/api. Do not invent endpoints or fields.
Show the list of checks with their acceptance criteria and the "Questions for the PO" section.
```

### UI-план — `playwright-test-planner`

Планує лише UI-перевірки. Браузер має відкривати `http://localhost:3000/login`.

```text
Use the playwright-test-planner subagent.
Plan only the UI-level checks from docs/test-design.md, in the order they appear. Skip checks whose expected result is TBD.
Save the plan to specs/US-01.md. Seed test: tests/seed.spec.ts.
The only app address is http://localhost:3000/login. Do not open the site root and do not open victorycenter.online.
Do not add scenarios that are not in the design. Put the check ID on every scenario.
Number sections in one continuous sequence with no gaps.
```

### Рев’ю плану — `design-reviewer` (режим plan)

Порівнює `specs/US-01.md` з UI-перевірками. Файлів не змінює і не вирішує, чи йти далі.

```text
Use the design-reviewer subagent in plan mode.
The reference is the UI-level checks in docs/test-design.md. Compare the plan in specs/US-01.md with them.
Flag design checks missing from the plan, scenarios and expected results that are not in the design, and mismatched preconditions and data.
Change nothing. Return a discrepancy report. Do not conclude whether to proceed.
```

### Тести — generator і API writer разом

UI-тести з плану, API-тести з дизайну. Обидва — одним повідомленням.

```text
Run two subagents in parallel:
1. playwright-test-generator: generate UI tests from specs/US-01.md into tests/ui/. One file per scenario. The file name starts with the check ID from the design. Keep the expected result from the design. Seed: tests/ui/seed.spec.ts. The only app address is http://localhost:3000/login.
2. api-test-writer: write API tests for the API-level checks in docs/test-design.md into tests/api/. Call only operations defined in docs/api/. Assertions come from the expected results in the design. If a check cannot be expressed with the contract, skip it, do not add a file, and report the missing path or field.
Show the list of created files.
```

### Healer — `playwright-test-healer`

Лагодить локатори, очікування й тестові дані. Якщо застосунок не збігається з очікуваним результатом, тест стає `test.fixme()`, а не слабшим assert.

```text
Use the playwright-test-healer subagent: run the tests in tests/ui/ and tests/api/ and fix those failing because of locators, waits, or test data.
Do not change the expected results taken from docs/test-design.md. If the app's behaviour does not match the expected result, mark the test as skipped with test.fixme() instead of weakening the assertion.
The app is already up at http://localhost:3000/login and http://localhost:8080.
Show which tests were fixed and which were skipped.
```

### Покриття і баги — рев’юер і баг-репортер разом

Матриця — це звіт. Скопіюйте її в `docs/coverage-matrix.md` самі або попросіть батьківського агента зберегти: рев’юер лише читає. Diff healer потребує git: `git diff HEAD` працює, коли ця тека є репозиторієм.

```text
Run two subagents in parallel:
1. design-reviewer in tests mode for the story docs/stories/1.md: build the coverage matrix and a discrepancy report. Compare post-healer changes against the last commit.
2. bug-reporter: create draft bug reports in docs/bugs/ for the tests the healer skipped.
Save the matrix from design-reviewer to docs/coverage-matrix.md.
Show the matrix, the report, and the list of drafts.
```

## 8. ✅ Запуск тестів вручну

Стенд із розділу 2 працює, `.env` йому відповідає.

```bash
npx playwright test
npx playwright test tests/ui
npx playwright test tests/api
npx playwright test tests/ui/td-010-draft-button-starts-disabled.spec.ts
npx playwright show-report
```

`npx playwright test` запускає лише `tests/ui` і `tests/api`. Тест із `test.fixme()` пропускається. HTML-звіт — `playwright-report/`. Треси й вивід падінь — `test-results/`.

Запускайте один набір за раз. Паралельні UI і API пишуть ті самі профілі.
