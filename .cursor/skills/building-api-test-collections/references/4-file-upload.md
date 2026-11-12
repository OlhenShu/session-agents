# Stage 4 — File upload scenario (optional)

Use when the feature attaches a file or image to an entity. Uploads get their own
folder because they have their own format rules and their own cleanup: files often
outlive the entity they were attached to.

## Prerequisites in the facts file

Verified in stage 2, not assumed:

- upload endpoint and format (multipart field name, or base64 with/without `data:` prefix);
- size and type limits the server actually enforces;
- whether deleting the entity also deletes the file;
- how to delete the file and what reading it after delete returns.

If any of these is missing, go back to stage 2 for that question first.

## Folder "Upload: <entity> with file"

Typical flow, adjust to the verified behavior:

1. Upload the file → save `fileId`.
2. Create the entity that references `fileId` → save a separate id variable
   (e.g. `entityWithFileId`), do not overwrite the CRUD variables.
3. Read the entity (admin and public view if both exist) → the file is attached.
4. Delete the entity.
5. Check the file: still exists or gone, as verified in stage 2.
6. Delete the file if it still exists → reading it returns the verified status.
7. Unset the temporary variables.

## Rules

- Keep the test file small. For base64, store it in a collection variable so it is
  easy to replace. For multipart, keep the file under `postman/fixtures/` and note
  that newman resolves it relative to the working directory.
- If the server accepts a file the requirements forbid (wrong size, type,
  dimensions), report it as a finding. Do not change the test to hide it.
- Re-run the **whole** collection with newman (twice) and report the summary.
