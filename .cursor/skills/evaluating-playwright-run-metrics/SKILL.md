---
name: evaluating-playwright-run-metrics
description: >-
  Evaluates metrics from a Playwright test run: wall-clock duration and
  the slowest tests, retries and tests that passed only after a retry,
  and failure clusters by file, project, and error. Use it whenever the
  user pastes a Playwright log, points at a JSON report
  (--reporter=json), JUnit XML, a playwright-report folder, or asks to
  assess, score, or compare a UI test run, flaky tests, slow tests, or
  whether a run is healthy, risky, or broken — even if they do not say
  "metrics". Also use it when they give two runs and ask what got better
  or worse. Do not use it to write or fix Playwright tests, debug a
  single assertion, configure reporters, or explain Playwright itself.
---

# Playwright run metrics

## Goal
Say whether a run can be trusted, from the numbers that are actually
in the report. The judgment hangs on three things: how long the run
and its slowest tests took, which tests passed only because a retry
saved them, and whether failures clump (same file, project, or error).
Pass and fail counts are the floor under that judgment, not a
pass-rate gate.

A second run is a comparison, not a second essay. Same metrics, then
what improved and what got worse.

## Answer language
Answer in the language of the request. If the user asks for two
languages, give Ukrainian first, then English, with the same numbers.
Follow the workflow once.

## Workflow
1. If there is no report, log, or path, ask for one. Do not invent a run.
2. Read the source before judging. Prefer a machine-readable file over
   a screenshot of the HTML report.
   - JSON (`--reporter=json`): use `stats` for the run, then walk
     `suites` for each test. The file name often sits on a parent suite.
   - JUnit XML: `time` is seconds. A retried test is flaky only when
     the XML shows a failed attempt and a later pass (separate cases
     or a retry marker). If it does not, flaky is not in the report.
   - Pasted log: use the summary line and the per-test lines. A line
     without an error text does not share an error with the line below.
   - `playwright-report/`: look for `report.json` or a JSON/XML file
     the user also passed. `index.html` alone and `.last-run.json`
     (status only) are not enough for duration, retries, or clusters.
     Say so and stop, instead of scraping a guess out of the page.
3. One run: fill the single-run template. Two runs: fill the comparison
   template. Name which file is the earlier run and which is the later
   one. If the user did not say, the order they gave is earlier then
   later, and say that you assumed it.
4. Put a hypothesis about the product after the report, labeled as
   unconfirmed. The verdict itself stays a reading of the metrics.

## How to read a test
Identity is file + title + project. Missing project stays missing.

- **Failure**: the final status is unexpected, failed, or timedOut, and
  no later attempt passed.
- **Flaky**: status is flaky, or an earlier attempt failed and a later
  one passed. A test that failed on every attempt is a failure, not a
  flaky test.
- **Skipped**: skipped, or not run. Do not count it as passed or failed.
- **Duration of a test**: the longest single attempt, in the unit the
  source uses. Mention extra time from retries only when the source
  gives each attempt.
- **Wall-clock**: `stats.duration` (milliseconds in JSON) or the summary
  line of a log. Do not add up test durations and call that the run
  duration. Workers overlap, so the sum is a different number.
- **Slowest**: the three longest tests. A test dominates the run when
  its longest attempt is more than half the wall-clock, and the
  wall-clock is known.
- **Cluster**: two or more failures share a file, or a project, or the
  first line of the error after stripping timings and counts. One
  failure is isolated, not a cluster. Do not merge different error
  texts because they look related.

Keep the source unit and show a readable form next to it
(`142000 ms, 2 min 22 s`). Do not round in a way that changes which
test is slowest or whether it is more than half the wall-clock.

If a summary total and the per-test lines disagree, report both and
say they disagree. Do not "fix" either number.

## Verdict
The verdict answers "can we trust this run?", not "is the product
correct?". The worst matching rule wins.

- **broken** — two or more failures form a cluster, or the report says
  the run aborted or did not finish.
- **risky** — any flaky test, or exactly one isolated failure, or a
  test longer than half the wall-clock. On a comparison, also when the
  later run's wall-clock grew or its flaky count grew.
- **healthy** — no failures, no flaky tests, and no test over half the
  wall-clock.

Name the rule that fired. Still list the other signals. A broken run
can also be flaky and slow; hiding that makes the next step worse.

There is no pass-rate threshold. A single clustered pair of failures
is broken even when almost everything else passed.

## Output format
Single run:

```
# Playwright run
## Source
## Counts
## Duration
## Retries and flaky
## Failure clusters
## Verdict
## Look at next
```

- Source: kind of report, and what you could not see.
- Counts: expected, unexpected, flaky, skipped, or passed and failed,
  only from the source. A missing count is `[not in the report]`.
- Duration: wall-clock, then the three slowest tests with file, title,
  project, and duration. Say when one dominates.
- Retries and flaky: each flaky test, how many attempts, and which
  attempt passed. No retry data: `[not in the report]`, not zero.
- Failure clusters: for each cluster, the shared file or project or
  error, the tests, and the attempt count. Then isolated failures.
- Verdict: one of healthy, risky, broken, plus the rule.
- Look at next: the cluster, the flaky test, or the dominating test,
  in that order, at most three items. No root-cause steps.

Comparison, after a short single-run verdict for the later run only:

```
# Comparison
## Runs
## What improved
## What got worse
## Unchanged clusters
## Verdict of the later run
```

Match tests by file + title + project. A test in only one run is
"only in <run>", not a pass and not a new failure unless that run
shows a failure.

Improved and worse are changes in the three metrics: clusters gone or
shrunk, flaky tests gone or added, wall-clock and the slowest tests
up or down. Quote both numbers. Do not call the later run better
overall when one metric improved and another got worse; say it is mixed
and name both.

## Rules
- Do not invent durations, retry counts, projects, error texts, or
  browser names.
- Do not turn a count of retries into a flaky count. Retries on a test
  that still failed are failed attempts.
- Do not set a pass-rate gate and do not grade the team.
- Prepare the assessment only. Do not edit tests or rerun them.
- A gap stays `[not in the report]`. Still write the verdict from the
  rules you can apply, and say which signal was missing.

## Example request
"Оціни цей прогін. Звіт у results.json. Порівняй із вчорашнім
run-a.json, якщо він є."
