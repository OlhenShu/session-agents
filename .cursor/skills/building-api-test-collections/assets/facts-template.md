# API facts: <feature>

Status: stage <1|2|3|4> in progress
Environment: <URL> (non-production: yes/no)
Last updated: <date>

Legend: **observed** = seen in traffic or a live response; **documented** = from the
spec only; **assumed** = not checked yet.

## 1. Base URL and auth

- Frontend URL:
- API base URL: (observed / documented)
- Auth flow: <login endpoint, request body shape, where the token is in the response,
  how it is sent: header name and format>
- Token lifetime / refresh: (observed / assumed)

## 2. Endpoints in scope

| Method | Path | Request body | Response body | Documented statuses | Auth | Source |
|--------|------|--------------|---------------|---------------------|------|--------|
|        |      |              |               |                     |      |        |

## 3. Open questions

What the spec does not answer and must be checked live (enum meanings, required
fields per state, upload format, side effects of delete, auth per endpoint,
validation, ordering, pagination...).

| # | Question | Why it matters for the tests |
|---|----------|------------------------------|
| Q1 |         |                              |

## 4. Live verification results

| # | Request (method, path, key body fields) | Status | Relevant body | Conclusion |
|---|------------------------------------------|--------|---------------|------------|
| Q1 |                                         |        |               |            |

### Surprises and findings

- <behavior that contradicts the spec or the requirements, missing server-side
  validation, side effects>

### Cleanup

- Created during verification: <ids>
- Deleted: <ids>
- Left behind (and why):

## 5. Not covered

- <question or scenario> — <reason it is not in the collection>
