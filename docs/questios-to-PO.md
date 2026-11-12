## Questions for the PO

- Q-1 (AC-1–AC-22): The source issue listed the acceptance criteria as unnumbered checkboxes. This design numbers them AC-1 through AC-22 in the order they appear in the issue. Confirm that this order is the identity of each criterion.
- Q-2 (AC-2, AC-5, AC-8, AC-13, AC-14): The Figma frames could not be read, so no pixels, colors, or layout were specified. Please supply the visual expected result, or confirm a later pass will add it, for the profile form (node 180-1224), the additional state (node 180-1290), field validation (node 281-751), the photo section (node 279-828), the media-icon hover (node 593-1159), the empty Photo section (node 279-884), and the cropper modal (node 5768-7616). Until then TD-013, TD-014, TD-058, TD-069, TD-070, TD-094, and TD-097 stay TBD.
- Q-3 (AC-4): The story requires a live used/maximum character counter but does not give its exact text. The checks assert that the used count and the maximum are both shown. What is the exact counter text?
- Q-4 (AC-5): The name rule allows an apostrophe written as ('), while the message «Поле може містити лише літери, пробіли, ’ -» uses ’ (U+2019). TD-034 enters U+0027 only. Which of U+0027 and U+2019 are accepted?
- Q-5 (AC-5): Does «Не більше 50 символів» or «Не більше 200 символів» appear when the field reaches exactly 50 or 200, or only when the next character is blocked? TD-029 and TD-045 expect the message when the next character is blocked. TD-170 and TD-171 expect that extra character not to be entered.
- Q-6 (AC-5): The maximum is specified while typing. What happens when 60 characters «А» are pasted into «Ім'я та Прізвище», and when more than 200 characters are pasted into «Опис»? TD-059 is TBD until this is decided.
- Q-7 (AC-5): A digit matches both the digit rule and the letters-only rule. Confirm that the only message is «Поле не може містити цифри».
- Q-8 (AC-5): The character rules state the message, not whether the rejected character remains in the field. The digit and symbol checks assert the message only. Does the character stay, or is it refused?
- Q-9 (AC-5, AC-16): «Опис» is optional for a draft, and the validation table also says that on blur it is required and must contain at least 10 characters. TD-048 and TD-049 expect those blur messages during draft entry. TD-122 expects «Зберегти як чернетку» to become enabled while «Опис» is empty. Confirm that both are intended.
- Q-10 (AC-5): When does the on-submit category rule run: on clicking «Зберегти як чернетку» or «Опублікувати», or on «ТАК»? The drop-down lists a category that already exists, so how does an Admin submit a category that is not stored, or two categories? TD-053, TD-054, TD-056, TD-172, and TD-173 need that path.
- Q-11 (AC-10, AC-15): The story rejects a file larger than 3 Mb with «Фото не більше 3 Mb». Cropper specification section 1.3 says an image must not exceed 5 MB and gives no message. Which limit applies to a file larger than 3 Mb and not larger than 5 MB? Does 3 Mb mean 3×1024×1024 bytes or 3×1000×1000 bytes? TD-073 and TD-074 treat a file of exactly 3 Mb as allowed. TD-102 is TBD until this is decided.
- Q-12 (AC-12, AC-14, AC-15): What are the designed frame width and height in pixels? The story gives a recommended size of 320×400, not a designed frame. TD-071, TD-072, TD-083, and TD-084 use 320×400 and expect the image in the media icon. If 320×400 is larger than the designed frame, say so, because AC-14 would open the cropper instead. TD-095, TD-096, TD-098, TD-099, TD-100, TD-103, and TD-104 stay incomplete until the pixel size is known. TD-104 needs the crop-frame pixel size as its expected result.
- Q-13 (AC-15): Cropper specification section 1.2 rejects an image that is lesser or has a different dimension than the designed display area, with «Розмір зображення менший за рекомендований». What does a different dimension mean when the image is larger on one side only, or has another aspect ratio but is not smaller? Those images are also the ones AC-14 and section 2.1 send to the cropper. TD-101 is TBD until this is decided.
- Q-14 (AC-14, AC-15): AC-14 opens the cropper immediately for an image larger than the designed size. Cropper specification section 2.2 opens it when the Admin clicks the Crop icon on hover. Confirm that both happen: the modal opens on upload, and the icon opens it again. TD-119, TD-120, and TD-121 cover the icon.
- Q-15 (AC-15): Cropper specification section 3.3 says the Admin can publish an uncropped image. The image-management enhancement for US #966 says to block publishing if the image is not cropped if required. When is cropping required, and which rule wins? TD-118 is TBD until this is decided.
- Q-16 (AC-15): The Cropper specification labels the modal buttons Так, Ні, and X, and it also says Crop icon (section 2.2) and Cropper icon (section 4.1). The story's other confirmations use «ТАК» and «НІ». Confirm the cropper labels, and confirm that the Crop icon and the Cropper icon are the same control.
- Q-17 (AC-18, AC-22): In the admin category tab, are drafts and published profiles one list? The order checks place the new profile after the existing member «Іван Петренко». Confirm that "last" means the bottom of that tab's list.
- Q-18 (AC-18): If «ТАК» on «Зберегти нового члена команди?» is activated twice, POST /api/TeamMembers is sent twice with the same fullName «Анна Коваленко» and the same categoryId. How many profiles are stored? GET /api/TeamMembers/search can return items and totalItemsCount, and the story does not say which count is correct. TD-141 stays TBD until this is decided.
- Q-19 (AC-21): The story does not say where «Не забудь встановити порядок відображення» appears. TD-164, TD-165, and TD-166 assert only that the text is shown, is still shown at 2 seconds, and is not shown at 3 seconds. Confirm that reading of the 3-second boundary.
- Q-20 (AC-5, AC-18, AC-21): The space rules are stated for input and for save without naming a field. The checks apply them to both «Ім'я та Прізвище» and «Опис». Confirm that this is intended.
- Q-21 (AC-5): On blur, an empty category shows «Поле обов'язкове». On submit, the category rule's message is «Учасник команди може належати лише до однієї категорії.» Which message is shown when the form is submitted with no category? TD-057 is TBD until this is decided. The draft and publish buttons are specified as disabled while the category is empty, so also say whether that submit can be reached.
- Q-22 (AC-20): AC-20 says «НІ» closes only the publish confirmation. It does not repeat AC-7's statement that entered values are kept. TD-157 expects «Ім'я та Прізвище» to still show «Анна Коваленко». Confirm that declining publish leaves the entered values in place.
- Q-23 (AC-18, AC-21): CreateTeamMemberDto.status and TeamMemberDto.status use Status, whose enum is [0, 1] and has no names. The story values «Чернетка» and «Опубліковано» are not values that schema can represent. Which enum value is «Чернетка», and which is «Опубліковано»? TD-133 and TD-158 stay TBD until this is decided.
- Q-24 (AC-5): POST /api/TeamMembers defines only response 200 with no response schema. It does not define an error response or ProblemDetails, so no response property can contain «Учасник команди може належати лише до однієї категорії.» TD-172 stays TBD until that property exists.
- Q-25 (AC-5): CreateTeamMemberDto has a single categoryId and additionalProperties false. No request property can send two categories. POST /api/TeamMembers also has no response property for «Учасник команди може належати лише до однієї категорії.» (see Q-24). TD-054 and TD-173 stay TBD.
- Q-26 (AC-10, AC-11, AC-12, AC-21): POST /api/Image accepts only base64 and mimeType, and its only defined response is 429 ProblemDetails, so it does not return an image id. GET /api/Image/{id} and GET /api/Image/by-name/{name} define 200 with no response schema. ImageDto has id, blobName, url, mimeType, createdAt, and updatedAt, and it has no file name, no byte size, and no image bytes. The checks cannot assert that exact-3mb.jpeg, over-3mb.jpeg, diagram.gif, or portrait.jpeg / portrait.jpg / portrait.png / portrait.webp is stored or not stored. TD-074, TD-077, TD-081, TD-085, TD-086, TD-087, TD-088, and TD-162 stay TBD. The byte length of 3 Mb remains the open point in Q-11.
- Q-27 (AC-15): No path crops an image or stores a cropped copy. CreateImageDto and UpdateImageDto have only base64 and mimeType, with no width, height, or crop region. ImageDto has no pixel size. GET /api/Image/{id} defines 200 with no response schema, so a cropped or rejected image cannot be read back. The designed frame size is still the open point in Q-12. Separately, Cropper specification section 3.3 allows publishing an uncropped image, and the image-management enhancement for US #966 says to block publishing when cropping is required. Which rule wins, and when is cropping required? TD-099, TD-111, TD-114, TD-117, and TD-118 stay TBD. See also Q-15.
- Q-28 (AC-18): CreateTeamMemberDto.imageId is nullable. TeamMemberDto.image is an ImageDto, it is not nullable, and it is not listed as required. No response property has a value that means no photo. What should be read when a draft is saved with imageId null? TD-136 stays TBD until this is decided.

## TBD checks

### TD-013 Profile form matches the profile-form frame
- Acceptance criterion: AC-2
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open.
- Test data: Figma profile form, node 180-1224.
- Steps:
  1. Compare the open form with the profile-form frame.
- Expected result: TBD — see Q-2

### TD-014 Form matches the additional-state frame
- Acceptance criterion: AC-2
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open.
- Test data: Figma additional state, node 180-1290.
- Steps:
  1. Compare the form with the additional-state frame.
- Expected result: TBD — see Q-2

### TD-054 Two categories are rejected
- Acceptance criterion: AC-5
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns one item whose name is «Керівництво» and one item whose name is «Ментори». No stored team member has fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». The ids of the categories named «Керівництво» and «Ментори».
- Steps:
  1. GET /api/TeamCategories and take the id of the item named «Керівництво» and the id of the item named «Ментори».
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and both of those category ids.
- Expected result: TBD — see Q-25

### TD-057 Empty category on submit
- Acceptance criterion: AC-5
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. «Категорія» shows «Оберіть категорію». «Ім'я та Прізвище» is «Анна Коваленко».
- Test data: No category selected.
- Steps:
  1. Submit the form with no category selected.
- Expected result: TBD — see Q-21

### TD-058 Validation messages match the validation frame
- Acceptance criterion: AC-5
- Level: UI
- Technique: equivalence partitioning
- Preconditions: A validation message from the validation table is visible on the create form.
- Test data: Figma field validation, node 281-751.
- Steps:
  1. Compare the visible validation message with the field-validation frame.
- Expected result: TBD — see Q-2

### TD-059 Pasting more than 50 characters into the name
- Acceptance criterion: AC-5
- Level: UI
- Technique: error guessing
- Preconditions: The «Додати в команду» modal is open. «Ім'я та Прізвище» is empty.
- Test data: 60 characters «А».
- Steps:
  1. Paste 60 characters «А» into «Ім'я та Прізвище».
- Expected result: TBD — see Q-6

### TD-069 Photo section matches the photo-section frame
- Acceptance criterion: AC-8
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open.
- Test data: Figma photo section, node 279-828.
- Steps:
  1. Compare the «Фото» section with the photo-section frame.
- Expected result: TBD — see Q-2

### TD-070 Media-icon hover matches the hover frame
- Acceptance criterion: AC-8
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. The pointer is over the media icon.
- Test data: Figma hover mock-up, node 593-1159.
- Steps:
  1. Hover the media icon.
  2. Compare that hover state with the hover frame.
- Expected result: TBD — see Q-2

### TD-073 A file of exactly 3 Mb is shown
- Acceptance criterion: AC-10
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: exact-3mb.jpeg, 320×400 px, exactly 3 Mb. The byte length of 3 Mb is TBD — see Q-11.
- Steps:
  1. Choose exact-3mb.jpeg for «Фото».
- Expected result: The media icon shows exact-3mb.jpeg.

### TD-074 A file of exactly 3 Mb is stored
- Acceptance criterion: AC-10
- Level: API
- Contract: POST /api/Image
- Technique: boundary value analysis
- Preconditions: No stored team member photo is this image.
- Test data: base64 of exact-3mb.jpeg, 320×400 px, exactly 3 Mb. mimeType for that jpeg. The byte length of 3 Mb is still open under Q-11.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-075 A file larger than 3 Mb shows the size message
- Acceptance criterion: AC-10
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: over-3mb.jpeg, 320×400 px, 1 byte larger than 3 Mb. Message «Фото не більше 3 Mb». The byte length of 3 Mb is TBD — see Q-11.
- Steps:
  1. Choose over-3mb.jpeg for «Фото».
- Expected result: The message «Фото не більше 3 Mb» is shown.

### TD-077 A file larger than 3 Mb is not stored
- Acceptance criterion: AC-10
- Level: API
- Contract: POST /api/Image
- Technique: boundary value analysis
- Preconditions: This image is not already stored.
- Test data: base64 of over-3mb.jpeg, 320×400 px, 1 byte larger than 3 Mb. mimeType for that jpeg. The byte length of 3 Mb is still open under Q-11.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-081 A gif is not stored
- Acceptance criterion: AC-11
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: This image is not already stored.
- Test data: base64 of diagram.gif, 320×400 px, 100 Kb. mimeType for that gif.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-085 A validated jpeg is stored
- Acceptance criterion: AC-12
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: This image is not already stored.
- Test data: base64 of portrait.jpeg, 320×400 px, 500 Kb. mimeType for that jpeg.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-086 A validated jpg is stored
- Acceptance criterion: AC-12
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: This image is not already stored.
- Test data: base64 of portrait.jpg, 320×400 px, 500 Kb. mimeType for that jpg.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-087 A validated png is stored
- Acceptance criterion: AC-12
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: This image is not already stored.
- Test data: base64 of portrait.png, 320×400 px, 500 Kb. mimeType for that png.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-088 A validated webp is stored
- Acceptance criterion: AC-12
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: This image is not already stored.
- Test data: base64 of portrait.webp, 320×400 px, 500 Kb. mimeType for that webp.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-26

### TD-094 The restored empty photo section matches its frame
- Acceptance criterion: AC-13
- Level: UI
- Technique: equivalence partitioning
- Preconditions: «Фото» has been returned to the empty state by confirming delete.
- Test data: Figma empty Photo section, node 279-884.
- Steps:
  1. Compare the empty «Фото» section with the empty-photo frame.
- Expected result: TBD — see Q-2

### TD-095 A larger image opens the cropper immediately
- Acceptance criterion: AC-14
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: TBD — see Q-12. A jpeg under 3 Mb whose width and height are both larger than the designed frame.
- Steps:
  1. Choose that jpeg for «Фото».
- Expected result: The cropper modal opens immediately.

### TD-096 An image at the designed size does not open the cropper
- Acceptance criterion: AC-14
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. No photo is chosen.
- Test data: TBD — see Q-12. A jpeg under 3 Mb whose width and height equal the designed frame.
- Steps:
  1. Choose that jpeg for «Фото».
- Expected result: The cropper modal does not open.

### TD-097 The cropper modal matches its frame
- Acceptance criterion: AC-14
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The cropper modal is open.
- Test data: Figma cropper modal, node 5768-7616.
- Steps:
  1. Compare the cropper modal with the cropper frame.
- Expected result: TBD — see Q-2

### TD-098 A smaller image shows the pixel-size message
- Acceptance criterion: AC-15
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. No photo is chosen. Cropper specification section 1.2.
- Test data: TBD — see Q-12. A jpeg under 3 Mb whose width and height are both smaller than the designed frame. Message «Розмір зображення менший за рекомендований».
- Steps:
  1. Choose that jpeg for «Фото».
- Expected result: The message «Розмір зображення менший за рекомендований» is shown.

### TD-099 A smaller image is not stored
- Acceptance criterion: AC-15
- Level: API
- Contract: POST /api/Image
- Technique: equivalence partitioning
- Preconditions: Cropper specification section 1.2. This image is not already stored.
- Test data: base64 of a jpeg under 3 Mb whose width and height are both smaller than the designed frame. mimeType for that jpeg. The designed frame size is still open under Q-12.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-27

### TD-100 A smaller image is not shown
- Acceptance criterion: AC-15
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. The media icon is empty. Cropper specification section 1.2.
- Test data: TBD — see Q-12. A jpeg under 3 Mb whose width and height are both smaller than the designed frame.
- Steps:
  1. Choose that jpeg for «Фото».
- Expected result: The media icon does not show that jpeg.

### TD-101 An image with a different dimension
- Acceptance criterion: AC-15
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The «Додати в команду» modal is open. No photo is chosen. Cropper specification section 1.2.
- Test data: TBD — see Q-13.
- Steps:
  1. Choose the image described in Q-13 for «Фото».
- Expected result: TBD — see Q-13

### TD-102 A file between the 3 Mb and 5 MB limits
- Acceptance criterion: AC-15
- Level: UI
- Technique: boundary value analysis
- Preconditions: The «Додати в команду» modal is open. No photo is chosen. Cropper specification section 1.3.
- Test data: A jpeg larger than 3 Mb and not larger than 5 MB. Exact byte length TBD — see Q-11.
- Steps:
  1. Choose that jpeg for «Фото».
- Expected result: TBD — see Q-11

### TD-103 The cropper shows the full uploaded image
- Acceptance criterion: AC-15
- Level: UI
- Technique: state transition
- Preconditions: The cropper modal is open for an image larger than the designed frame. Cropper specification section 2.3.
- Test data: TBD — see Q-12. The full source image.
- Steps:
  1. Look at the image in the cropper modal.
- Expected result: The cropper modal shows the full uploaded image.

### TD-104 The crop frame matches the designed size
- Acceptance criterion: AC-15
- Level: UI
- Technique: equivalence partitioning
- Preconditions: The cropper modal is open. Cropper specification section 2.3.
- Test data: TBD — see Q-12. The designed pixel size.
- Steps:
  1. Look at the crop frame.
- Expected result: TBD — see Q-12

### TD-111 Так stores the cropped image
- Acceptance criterion: AC-15
- Level: API
- Contract: POST /api/Image
- Technique: state transition
- Preconditions: The cropper modal is open. The crop frame covers the top-left of the uploaded image. Cropper specification section 3.1.
- Test data: base64 of the top-left area inside the crop frame. mimeType of the uploaded image.
- Steps:
  1. POST /api/Image with that base64 and mimeType.
- Expected result: TBD — see Q-27

### TD-114 Ні saves no cropped image
- Acceptance criterion: AC-15
- Level: API
- Contract: GET /api/Image/{id}
- Technique: state transition
- Preconditions: The cropper modal was open for an uploaded image, and Ні was chosen. Cropper specification section 3.2. The uploaded image has an id.
- Test data: id of the uploaded image.
- Steps:
  1. GET /api/Image/{id} for that uploaded image.
- Expected result: TBD — see Q-27

### TD-117 X saves no cropped image
- Acceptance criterion: AC-15
- Level: API
- Contract: GET /api/Image/{id}
- Technique: state transition
- Preconditions: The cropper modal was open for an uploaded image, and X was chosen. Cropper specification section 3.2. The uploaded image has an id.
- Test data: id of the uploaded image.
- Steps:
  1. GET /api/Image/{id} for that uploaded image.
- Expected result: TBD — see Q-27

### TD-118 Publishing an image that was not cropped
- Acceptance criterion: AC-15
- Level: API
- Contract: POST /api/TeamMembers
- Technique: decision table
- Preconditions: An image larger than the designed frame was uploaded. The admin closed the cropper with Ні, so the full original is the photo. Cropper specification section 3.3. Image-management enhancement US #966.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст». imageId is an int64. No property records that the image was not cropped.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, description «Опис текст», and imageId.
- Expected result: TBD — see Q-27

### TD-133 Confirming draft save stores status Чернетка
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Draft confirmation «ТАК» applies to this profile. description is empty. No photo is chosen.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». status for «Чернетка». description is an empty string. imageId is null.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, status for «Чернетка», description «», and imageId null.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: TBD — see Q-23

### TD-136 Confirming draft save stores no photo
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Draft confirmation «ТАК» applies to this profile. No photo was chosen.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». imageId null.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, and imageId null.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: TBD — see Q-28

### TD-141 Confirming draft save twice
- Acceptance criterion: AC-18
- Level: API
- Contract: POST /api/TeamMembers
- Technique: error guessing
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Draft confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». The same request is sent twice.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers twice with fullName «Анна Коваленко» and that categoryId.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: TBD — see Q-18

### TD-158 Confirming publish stores status Опубліковано
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». No stored team member has fullName «Анна Коваленко». Publish confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст». status for «Опубліковано». imageId is omitted: portrait.jpeg is not an imageId.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, description «Опис текст», and status for «Опубліковано».
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко».
- Expected result: TBD — see Q-23

### TD-162 Confirming publish stores the photo
- Acceptance criterion: AC-21
- Level: API
- Contract: POST /api/TeamMembers
- Technique: state transition
- Preconditions: GET /api/TeamCategories returns an item whose name is «Керівництво». Publish confirmation «ТАК» applies to this profile.
- Test data: fullName «Анна Коваленко». categoryId of the category named «Керівництво». description «Опис текст». imageId is an int64. The story file is portrait.jpeg, 320×400 px, 500 Kb.
- Steps:
  1. GET /api/TeamCategories and take the id of the item whose name is «Керівництво».
  2. POST /api/TeamMembers with fullName «Анна Коваленко», that categoryId, description «Опис текст», and imageId.
  3. GET /api/TeamMembers/search with FullName «Анна Коваленко» and read image.
- Expected result: TBD — see Q-26

### TD-172 An unknown category returns the single-category message
- Acceptance criterion: AC-5
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns no item whose id is 999999. No stored team member has fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». categoryId 999999. Message «Учасник команди може належати лише до однієї категорії.»
- Steps:
  1. GET /api/TeamCategories and confirm that no item has id 999999.
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and categoryId 999999.
- Expected result: TBD — see Q-24

### TD-173 Two categories return the single-category message
- Acceptance criterion: AC-5
- Level: API
- Contract: POST /api/TeamMembers
- Technique: equivalence partitioning
- Preconditions: GET /api/TeamCategories returns one item whose name is «Керівництво» and one item whose name is «Ментори». No stored team member has fullName «Анна Коваленко».
- Test data: fullName «Анна Коваленко». The ids of the categories named «Керівництво» and «Ментори». Message «Учасник команди може належати лише до однієї категорії.»
- Steps:
  1. GET /api/TeamCategories and take the id of the item named «Керівництво» and the id of the item named «Ментори».
  2. POST /api/TeamMembers with fullName «Анна Коваленко» and both of those category ids.
- Expected result: TBD — see Q-25
