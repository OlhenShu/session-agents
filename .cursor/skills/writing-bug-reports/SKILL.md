---
name: writing-bug-reports
description: >-
  Turns a free-form problem description into a structured
  bug report with a title, environment, steps, actual and
  expected result, severity and priority. Use it for
  requests like "write a bug report", "log a defect",
  "file a bug". Do not use it for requirements analysis,
  test cases, emails to the PO, or explaining the
  difference between severity and priority.
---

# Bug report

## Goal
Turn the description into a report that lets a developer
reproduce the defect. Missing data must stay visible and
must not be replaced with invented details.

## Answer language
Answer in the language of the request. If the user asks
for two languages, give Ukrainian first, then English,
with the same facts and IDs. Follow the workflow once.

## Workflow
1. Find the actions, data, observations and environment.
   If there is no problem description, ask for it and do
   not invent a defect.
2. Separate what the author saw from a guess about the
   cause. Do not put the cause into report fields. If
   needed, give it after the report as an unconfirmed
   hypothesis.
3. Several different problems: one report for each.
   Say briefly why you did not mix them.
4. Title in one line: where, what happens, under which
   condition. No judgments.
5. Steps: numbered, one action per step, only with the
   given values. Mark a gap as "[to clarify]".
6. Actual result: only what was observed. Take the
   expected result from the given requirement or test
   case and name the source. No source: "[to clarify:
   source of the expected result]".
7. Suggest severity with its impact. Mark priority as a
   recommendation for triage. If the team scale is given,
   use it.
8. List the attachments you have and the ones worth
   adding. Put questions to the author after the report.

## Output format
- Title
- Test object and environment: product, version or build,
  environment, browser or device, OS
- Context: requirement, test case or activity
- Preconditions
- Steps to reproduce
- Actual result
- Expected result with source
- Severity: value and impact
- Priority (recommendation) and reason
- Attachments
- Links to the given IDs
- Questions to the author, outside the report. Skip this
  block if there are no questions.

## Rules
- Do not invent versions, environments, IDs, accounts,
  logs, error texts or the number of attempts.
- Do not turn the author's guess into a confirmed cause.
- No emotional judgments or blame.
- Do not set the final priority for the team or the PO.
- Prepare text only. Do not create a ticket in the tracker.
- Do not stop the draft because of gaps if the given data
  already makes a useful report with "[to clarify]" marks.

## Example request
"Write a bug report from this description. Description: [text]"