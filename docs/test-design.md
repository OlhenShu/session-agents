# Test design: 1 [TM01] Create a team member as a draft or publish immediately

## Coverage summary
- AC-1: TD-010
- AC-2: TD-013, TD-014 (TBD, docs/questios-to-PO.md)
- AC-3: TD-015
- AC-4: TD-021
- AC-5: TD-028, TD-029, TD-053, TD-055; TD-054, TD-057, TD-058, TD-059, TD-172, TD-173 (TBD, docs/questios-to-PO.md)
- AC-6: TD-060
- AC-7: TD-064, TD-065
- AC-8: TD-069, TD-070 (TBD, docs/questios-to-PO.md)
- AC-9: TD-072
- AC-10: TD-078; TD-073, TD-074, TD-075, TD-077 (TBD, docs/questios-to-PO.md)
- AC-11: TD-079; TD-081 (TBD, docs/questios-to-PO.md)
- AC-12: TD-083; TD-085, TD-086, TD-087, TD-088 (TBD, docs/questios-to-PO.md)
- AC-13: TD-092; TD-094 (TBD, docs/questios-to-PO.md)
- AC-14: TD-095, TD-096, TD-097 (TBD, docs/questios-to-PO.md)
- AC-15: TD-110; TD-098, TD-099, TD-100, TD-101, TD-102, TD-103, TD-104, TD-111, TD-114, TD-117, TD-118 (TBD, docs/questios-to-PO.md)
- AC-16: TD-122
- AC-17: TD-131, TD-132
- AC-18: TD-134, TD-135, TD-138, TD-139, TD-140; TD-133, TD-136, TD-141 (TBD, docs/questios-to-PO.md)
- AC-19: TD-142
- AC-20: TD-156
- AC-21: TD-159, TD-160, TD-161, TD-166, TD-167; TD-158, TD-162 (TBD, docs/questios-to-PO.md)
- AC-22: TD-169

## Checks

### TD-010 Draft button starts disabled
- Acceptance criterion: AC-1
- Level: UI
- Technique: state transition
- Preconditions: The «Додати в команду» modal has just been opened. Every field is empty.
- Test data: None.
- Steps:
  1. Look at «Зберегти як чернетку».
- Expected result: «Зберегти як чернетку» is disabled.
- Absorbed: TD-001, TD-002, TD-003, TD-004, TD-005, TD-006, TD-007, TD-008, TD-009, TD-011, TD-012

### TD-015 Category control is a drop-down
- Acceptance criterion: AC-3
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. The category «Керівництво» exists.
- Test data: «Керівництво».
- Steps:
  1. Open «Категорія».
- Expected result: «Категорія» is a drop-down that lists «Керівництво».
- Absorbed: TD-016, TD-017, TD-018

### TD-021 Name counter shows fifty of fifty
- Acceptance criterion: AC-4
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open.
- Test data: 50 characters «А». Maximum 50.
- Steps:
  1. Enter 50 characters «А» into «Ім'я та Прізвище».
  2. Look at the character counter for «Ім'я та Прізвище».
- Expected result: The counter shows used count 50 of maximum 50.
- Absorbed: TD-019, TD-020, TD-022, TD-023, TD-024, TD-025, TD-026

### TD-028 Name accepts 50 characters
- Acceptance criterion: AC-5
- Level: UI
- Technique: boundary value analysis (3-value because blocking the next character is an off-by-one boundary)
- Preconditions: The «Додати в команду» modal is open.
- Test data: 50 characters «А».
- Steps:
  1. Enter 50 characters «А» into «Ім'я та Прізвище».
- Expected result: «Ім'я та Прізвище» shows 50 characters «А».
- Absorbed: TD-027, TD-032, TD-033, TD-034, TD-036, TD-040, TD-041, TD-042, TD-043, TD-044, TD-047, TD-051, TD-170, TD-171

### TD-029 Name blocks the 51st character
- Acceptance criterion: AC-5
- Level: UI
- Technique: boundary value analysis (3-value because blocking the next character is an off-by-one boundary)
- Preconditions: The «Додати в команду» modal is open. «Ім'я та Прізвище» contains 50 characters «А».
- Test data: Next character «Б». Message «Не більше 50 символів».
- Steps:
  1. Type «Б» into «Ім'я та Прізвище».
- Expected result: The message «Не більше 50 символів» is shown.
- Absorbed: TD-030, TD-031, TD-035, TD-037, TD-038, TD-039, TD-045, TD-046, TD-048, TD-049, TD-050, TD-052, TD-056

### TD-053 A category that is not stored is rejected
- Acceptance criterion: AC-5
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns no item whose id is 999999. No stored team member has fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». categoryId 999999.
- Steps:
  1. GET /api/TeamCategories and confirm that no item has id 999999.
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and categoryId 999999.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: No entry in items has fullName «Анна Коваленко».

### TD-055 One stored category is accepted
- Acceptance criterion: AC-5
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». categoryId is the id of the category named «Керівництво».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and that categoryId.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has categoryId equal to the id of the category named «Керівництво».

### TD-060 X closes an empty form without confirmation
- Acceptance criterion: AC-6
- Level: UI
- Technique: state transition
- Preconditions: The «Додати в команду» modal is open. «Ім'я та Прізвище» is empty. «Опис» is empty. «Категорія» shows «Оберіть категорію». No photo is chosen.
- Test data: None.
- Steps:
  1. Click X.
- Expected result: The «Додати в команду» modal closes without showing «Зміни будуть втрачені. Бажаєте продовжити?».
- Absorbed: TD-061

### TD-064 Confirming discard closes the create modal
- Acceptance criterion: AC-7
- Level: UI
- Technique: state transition
- Preconditions: The discard confirmation «Зміни будуть втрачені. Бажаєте продовжити?» is open over the «Додати в команду» modal.
- Test data: «ТАК».
- Steps:
  1. Click «ТАК».
- Expected result: The «Додати в команду» modal is closed.
- Absorbed: TD-062, TD-063, TD-066, TD-067, TD-068

### TD-065 Confirming discard does not save a profile
- Acceptance criterion: AC-7
- Level: API
- Contract: GET /api/TeamMembers/search
- Technique: state transition
- Preconditions: No stored team member has fullName «Анна». The discard confirmation «Зміни будуть втрачені. Бажаєте продовжити?» was accepted for fullName «Анна». POST /api/TeamMembers was not sent for that name.
- Test data: FullName «Анна».
- Steps:
  1. GET /api/TeamMembers/search with FullName «Анна».
- Expected result: No entry in items has fullName «Анна».

### TD-072 A file dragged onto the media icon is used
- Acceptance criterion: AC-9
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: portrait.png, 320×400 px, 500 Kb.
- Steps:
  1. Drag portrait.png onto the media icon.
- Expected result: The media icon shows portrait.png.
- Absorbed: TD-071

### TD-078 A file larger than 3 Mb is not shown
- Acceptance criterion: AC-10
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. The media icon is empty.
- Test data: over-3mb.jpeg, 320×400 px, 1 byte larger than 3 Mb.
- Steps:
  1. Choose over-3mb.jpeg for «Фото».
- Expected result: The media icon does not show over-3mb.jpeg.
- Absorbed: TD-076

### TD-079 A gif shows the format message
- Acceptance criterion: AC-11
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: diagram.gif, 320×400 px, 100 Kb. Message «Невірний формат фото, дозволено jpeg, jpg, png, webp».
- Steps:
  1. Choose diagram.gif for «Фото».
- Expected result: The message «Невірний формат фото, дозволено jpeg, jpg, png, webp» is shown.
- Absorbed: TD-080, TD-082

### TD-083 A jpg file is shown after validation
- Acceptance criterion: AC-12
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: portrait.jpg, 320×400 px, 500 Kb.
- Steps:
  1. Choose portrait.jpg for «Фото».
- Expected result: The media icon shows portrait.jpg.
- Absorbed: TD-084

### TD-092 Confirming delete removes the image
- Acceptance criterion: AC-13
- Level: UI
- Technique: state transition
- Preconditions: The confirmation «Видалити фото?» is open. The media icon shows portrait.jpeg.
- Test data: «ТАК».
- Steps:
  1. Click «ТАК».
- Expected result: The media icon does not show portrait.jpeg.
- Absorbed: TD-089, TD-090, TD-091, TD-093

### TD-110 Так shows the cropped image in the media icon
- Acceptance criterion: AC-15
- Level: UI
- Technique: state transition
- Preconditions: The cropper modal is open. The crop frame covers the top-left of the uploaded image. Cropper specification section 3.1.
- Test data: The top-left area inside the crop frame.
- Steps:
  1. Click Так.
- Expected result: The media icon shows the top-left area that was inside the crop frame.
- Absorbed: TD-105, TD-106, TD-107, TD-108, TD-109, TD-112, TD-113, TD-115, TD-116, TD-119, TD-120, TD-121

### TD-122 Draft becomes enabled at the name minimum
- Acceptance criterion: AC-16
- Level: UI
- Technique: decision table (Опис and Фото are collapsed because AC-16 does not depend on them)
- Preconditions: The «Додати в команду» modal is open. «Опис» is empty. No photo is chosen. The category «Керівництво» exists.
- Test data: Name «Ан». Category «Керівництво».
- Steps:
  1. Type «Ан» into «Ім'я та Прізвище».
  2. Leave «Ім'я та Прізвище».
  3. Choose «Керівництво».
- Expected result: «Зберегти як чернетку» is enabled.
- Absorbed: TD-123, TD-124, TD-125, TD-126, TD-127, TD-128

### TD-131 Declining draft save closes the create modal
- Acceptance criterion: AC-17
- Level: UI
- Technique: state transition
- Preconditions: The confirmation «Зберегти нового члена команди?» is open over the «Додати в команду» modal.
- Test data: «НІ».
- Steps:
  1. Click «НІ».
- Expected result: The «Додати в команду» modal is closed.
- Absorbed: TD-129, TD-130

### TD-132 Declining draft save does not create a profile
- Acceptance criterion: AC-17
- Level: API
- Contract: GET /api/TeamMembers/search
- Technique: state transition
- Preconditions: No stored team member has fullName «Анна Коваленко». «НІ» was chosen on «Зберегти нового члена команди?» for that fullName. POST /api/TeamMembers was not sent for that name.
- Test data: FullName «Анна Коваленко».
- Steps:
  1. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: No entry in items has fullName «Анна Коваленко».

### TD-134 Confirming draft save stores the entered name
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Draft confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and that categoryId.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has fullName «Анна Коваленко».

### TD-135 Confirming draft save stores an empty description
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Draft confirmation «ТАК» applies to this profile. description was left empty.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, and description «».
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has description equal to an empty string.

### TD-138 The new draft is last in its category tab
- Acceptance criterion: AC-18
- Level: UI
- Technique: state transition
- Preconditions: The admin Team view category tab «Керівництво» already shows «Іван Петренко». A draft «Анна Коваленко» in «Керівництво» has just been saved with «ТАК». See Q-17.
- Test data: Existing member «Іван Петренко». New draft «Анна Коваленко».
- Steps:
  1. Open the admin Team view.
  2. Open the «Керівництво» category tab.
- Expected result: «Анна Коваленко» is the last profile in the «Керівництво» tab, after «Іван Петренко».
- Absorbed: TD-137

### TD-139 Draft save trims and collapses the name
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Марія».
- Test data: fullName «  Анна  Марія  » (two leading spaces, two spaces between the words, two trailing spaces). categoryId of the category named «Керівництво».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «  Анна  Марія  » and that categoryId.
  3. GET /api/TeamMembers with CategoryId of that category.
- Expected result: An entry in items has fullName «Анна Марія».

### TD-140 Draft save trims and collapses the description
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Богдан Мельник».
- Test data: fullName «Богдан Мельник». description «  Опис  текст  » (two leading spaces, two spaces between the words, two trailing spaces). categoryId of the category named «Керівництво».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Богдан Мельник», that categoryId, and description «  Опис  текст  ».
  3. GET /api/TeamMembers/search with FullName «Богдан Мельник».
- Expected result: An entry in items has description «Опис текст».

### TD-142 Publish becomes enabled when every field is valid
- Acceptance criterion: AC-19
- Level: UI
- Technique: decision table (one rule for all four conditions valid; each later check turns one condition off)
- Preconditions: The «Додати в команду» modal is open. The category «Керівництво» exists.
- Test data: Name «Анна Коваленко». Category «Керівництво». Description «Опис текст» (10 characters). Photo portrait.jpeg, 320×400 px, 500 Kb.
- Steps:
  1. Type «Анна Коваленко» into «Ім'я та Прізвище».
  2. Leave «Ім'я та Прізвище».
  3. Choose «Керівництво».
  4. Type «Опис текст» into «Опис».
  5. Leave «Опис».
  6. Choose portrait.jpeg for «Фото».
- Expected result: «Опублікувати» is enabled.
- Absorbed: TD-143, TD-144, TD-145, TD-146, TD-147, TD-148, TD-149, TD-150, TD-151, TD-152

### TD-156 Declining publish leaves the create modal open
- Acceptance criterion: AC-20
- Level: UI
- Technique: state transition
- Preconditions: The confirmation titled «Підтвердження» is open over the «Додати в команду» modal.
- Test data: «НІ».
- Steps:
  1. Click «НІ».
- Expected result: The «Додати в команду» modal is open.
- Absorbed: TD-153, TD-154, TD-155, TD-157

### TD-159 Confirming publish stores the entered name
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». Publish confirmation «ТАК» applies to fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, and description «Опис текст».
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has fullName «Анна Коваленко».

### TD-160 Confirming publish stores the description
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». Publish confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, and description «Опис текст».
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has description «Опис текст».

### TD-161 Confirming publish stores the category
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». Publish confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст».
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, and description «Опис текст».
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: An entry in items has categoryId equal to the id of the category named «Керівництво».

### TD-166 The order reminder is gone at 3 seconds
- Acceptance criterion: AC-21
- Level: UI
- Technique: boundary value analysis (2-value; the story states whole seconds, so the boundary is 3)
- Preconditions: «Не забудь встановити порядок відображення» has just been shown after publish confirmation.
- Test data: 3 seconds.
- Steps:
  1. Wait 3 seconds.
- Expected result: «Не забудь встановити порядок відображення» is not shown.
- Absorbed: TD-163, TD-164, TD-165

### TD-167 Publish save trims and collapses the name
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Марія». description «Опис текст» is valid.
- Test data: fullName «  Анна  Марія  » (two leading spaces, two spaces between the words, two trailing spaces). categoryId of the category named «Керівництво». description «Опис текст». imageId is omitted: portrait.jpeg is not an imageId, and POST /api/Image does not return an id (Q-26).
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «  Анна  Марія  », that categoryId, and description «Опис текст».
  3. GET /api/TeamMembers with CategoryId of that category.
- Expected result: An entry in items has fullName «Анна Марія».

### TD-169 The published profile is last on the public Team page
- Acceptance criterion: AC-22
- Level: UI
- Technique: state transition
- Preconditions: The public Team page already shows «Іван Петренко» in «Керівництво». «Анна Коваленко» has just been published in «Керівництво».
- Test data: Existing public profile «Іван Петренко». Published profile «Анна Коваленко».
- Steps:
  1. Open the public Team page.
  2. Open the «Керівництво» category.
- Expected result: «Анна Коваленко» is the last profile in «Керівництво», after «Іван Петренко».
- Absorbed: TD-168
