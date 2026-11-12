# Coverage matrix: US-01

Story: **US-01**, [TM01] Create a team member as a draft or publish immediately.

Acceptance criteria are AC-1 through AC-22 in `docs/stories/1.md`. `docs/stories/US-01.md` is not in this workspace. `docs/test-design.md` uses the same numbering. This matrix uses that list.

Check ids are the ids in the coverage summary of `docs/test-design.md`, including ids marked TBD. Absorbed ids are not separate rows; the design folds them into the surviving check.

**How status was assigned**

- **covered** — `tests/` has a `*.spec.ts` for that check, and the test does not call `test.fixme()` or `test.skip()`.
- **skipped by the healer** — that file calls `test.fixme()`.
- **not covered** — the design lists the check and no spec implements it.

Each row has one status. A criterion with mixed checks has more than one row. Counts: 26 covered, 6 skipped by the healer, 39 not covered (71 checks).

| Criterion | Check IDs | Test files | Status |
| --- | --- | --- | --- |
| AC-1 | TD-010 | `tests/ui/td-010-draft-button-starts-disabled.spec.ts` | covered |
| AC-2 | TD-013, TD-014 | — | not covered |
| AC-3 | TD-015 | `tests/ui/td-015-category-control-is-a-drop-down.spec.ts` | covered |
| AC-4 | TD-021 | `tests/ui/td-021-name-counter-shows-fifty-of-fifty.spec.ts` | covered |
| AC-5 | TD-028 | `tests/ui/td-028-name-accepts-50-characters.spec.ts` | covered |
| AC-5 | TD-029 | `tests/ui/td-029-name-blocks-the-51st-character.spec.ts` | skipped by the healer |
| AC-5 | TD-053 | `tests/api/td-053-a-category-that-is-not-stored-is-rejected.spec.ts` | covered |
| AC-5 | TD-055 | `tests/api/td-055-one-stored-category-is-accepted.spec.ts` | covered |
| AC-5 | TD-054, TD-057, TD-058, TD-059, TD-172, TD-173 | — | not covered |
| AC-6 | TD-060 | `tests/ui/td-060-x-closes-an-empty-form-without-confirmation.spec.ts` | covered |
| AC-7 | TD-064 | `tests/ui/td-064-confirming-discard-closes-the-create-modal.spec.ts` | covered |
| AC-7 | TD-065 | `tests/api/td-065-confirming-discard-does-not-save-a-profile.spec.ts` | covered |
| AC-8 | TD-069, TD-070 | — | not covered |
| AC-9 | TD-072 | `tests/ui/td-072-a-file-dragged-onto-the-media-icon-is-used.spec.ts` | covered |
| AC-10 | TD-078 | `tests/ui/td-078-a-file-larger-than-3-mb-is-not-shown.spec.ts` | covered |
| AC-10 | TD-073, TD-074, TD-075, TD-077 | — | not covered |
| AC-11 | TD-079 | `tests/ui/td-079-a-gif-shows-the-format-message.spec.ts` | covered |
| AC-11 | TD-081 | — | not covered |
| AC-12 | TD-083 | `tests/ui/td-083-a-jpg-file-is-shown-after-validation.spec.ts` | covered |
| AC-12 | TD-085, TD-086, TD-087, TD-088 | — | not covered |
| AC-13 | TD-092 | `tests/ui/td-092-confirming-delete-removes-the-image.spec.ts` | covered |
| AC-13 | TD-094 | — | not covered |
| AC-14 | TD-095, TD-096, TD-097 | — | not covered |
| AC-15 | TD-110 | `tests/ui/td-110-tak-shows-the-cropped-image-in-the-media-icon.spec.ts` | covered |
| AC-15 | TD-098, TD-099, TD-100, TD-101, TD-102, TD-103, TD-104, TD-111, TD-114, TD-117, TD-118 | — | not covered |
| AC-16 | TD-122 | `tests/ui/td-122-draft-becomes-enabled-at-the-name-minimum.spec.ts` | skipped by the healer |
| AC-17 | TD-131 | `tests/ui/td-131-declining-draft-save-closes-the-create-modal.spec.ts` | skipped by the healer |
| AC-17 | TD-132 | `tests/api/td-132-declining-draft-save-does-not-create-a-profile.spec.ts` | covered |
| AC-18 | TD-134 | `tests/api/td-134-confirming-draft-save-stores-the-entered-name.spec.ts` | covered |
| AC-18 | TD-135 | `tests/api/td-135-confirming-draft-save-stores-an-empty-description.spec.ts` | covered |
| AC-18 | TD-138 | `tests/ui/td-138-the-new-draft-is-last-in-its-category-tab.spec.ts` | covered |
| AC-18 | TD-139 | `tests/api/td-139-draft-save-trims-and-collapses-the-name.spec.ts` | skipped by the healer |
| AC-18 | TD-140 | `tests/api/td-140-draft-save-trims-and-collapses-the-description.spec.ts` | skipped by the healer |
| AC-18 | TD-133, TD-136, TD-141 | — | not covered |
| AC-19 | TD-142 | `tests/ui/td-142-publish-becomes-enabled-when-every-field-is-valid.spec.ts` | covered |
| AC-20 | TD-156 | `tests/ui/td-156-declining-publish-leaves-the-create-modal-open.spec.ts` | covered |
| AC-21 | TD-159 | `tests/api/td-159-confirming-publish-stores-the-entered-name.spec.ts` | covered |
| AC-21 | TD-160 | `tests/api/td-160-confirming-publish-stores-the-description.spec.ts` | covered |
| AC-21 | TD-161 | `tests/api/td-161-confirming-publish-stores-the-category.spec.ts` | covered |
| AC-21 | TD-166 | `tests/ui/td-166-the-order-reminder-is-gone-at-3-seconds.spec.ts` | covered |
| AC-21 | TD-167 | `tests/api/td-167-publish-save-trims-and-collapses-the-name.spec.ts` | skipped by the healer |
| AC-21 | TD-158, TD-162 | — | not covered |
| AC-22 | TD-169 | `tests/ui/td-169-the-published-profile-is-last-on-the-public-team-page.spec.ts` | covered |

`tests/seed.spec.ts` and `tests/ui/seed.spec.ts` are seeds. They are not checks.
