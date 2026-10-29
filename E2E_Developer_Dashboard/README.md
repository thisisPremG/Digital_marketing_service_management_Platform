# E2E Developer Dashboard

A responsive developer workspace prototype built with **HTML5, CSS3, and vanilla JavaScript**. It runs locally by opening `index.html`; no build tools or frontend frameworks are required.

## Files

- `index.html` — semantic page structure, navigation, views, and modal containers.
- `style.css` — E2E visual system, responsive layouts, accessible focus styles, and reduced-motion support.
- `app.js` — demo data, navigation, task workflow, filtering, local persistence, notifications, deliverables, messaging, profile preferences, and CSV export.

## Run locally

1. Extract the project folder.
2. Open `index.html` in a modern browser.
3. Use the left navigation to explore the dashboard.
4. Changes are saved in the browser's `localStorage` under `e2eDeveloperDashboard_v1`.

The Manrope font is loaded from Google Fonts when internet access is available. The dashboard remains usable with a local sans-serif fallback if it cannot load.

## Demo capabilities

- Dashboard summary counts are calculated from the current task data.
- Task filters support search, project, priority, due date, and status.
- Open a task to read its requirements and acceptance criteria, update progress and notes, start work, or submit it for review.
- Tasks can move through `Pending → Assigned → In Progress → Submitted for Review → Revision Required → Approved`. In this developer-only demo, a developer can submit work but cannot approve it. A real Team Lead review must be implemented in the backend or a separate authorized Team Lead interface.
- A submitted task with progress below 100% cannot be submitted. Work notes are required for submission.
- Deliverables store descriptive metadata and optional URL/file references. Submitting a deliverable marks the linked open task as submitted for review.
- Project chats and messages are scoped to projects assigned to the demo developer.
- Profile name, email, and notification preferences are stored locally.
- Notifications can be marked as read.
- Export report downloads task data as CSV.

## Reset demo data

To reset the demo, open browser developer tools → Application/Storage → Local Storage, remove `e2eDeveloperDashboard_v1`, then reload `index.html`.

## Important prototype limitations

- `localStorage` is browser-local demo storage, not a server database. Data can be changed by anyone using browser developer tools and does not sync across devices or users.
- The developer identity is a demo selection, not authenticated identity. Client-side filtering is not security. Do not use this prototype to store real client data or confidential information.
- File references are text only; this page does **not** upload file bytes. Real file storage and secure uploads require a backend, authentication, authorization, file-size/type validation, malware scanning, access-controlled storage, and audit logging.
- Demo messages do not reach another user. Real-time/shared messaging requires a backend.
- The Team Lead's review, approval, and revision actions are intentionally not available in the Developer view. A real application should enforce authorization on every server request and record review history.
- The dashboard uses sample tasks and projects for the currently selected demo Developer. Adjust the seed data in `app.js` to test other scenarios.

## Suggested Spring Boot + MySQL integration

A future backend can expose REST endpoints such as:

- `GET /api/developer/me`
- `GET /api/developer/tasks?status=&projectId=&priority=&dueBefore=`
- `GET /api/developer/tasks/{taskId}`
- `PATCH /api/developer/tasks/{taskId}/progress`
- `POST /api/developer/tasks/{taskId}/submissions`
- `GET /api/developer/projects`
- `GET /api/developer/projects/{projectId}`
- `GET /api/developer/projects/{projectId}/messages`
- `POST /api/developer/projects/{projectId}/messages`
- `GET /api/developer/deliverables`
- `POST /api/developer/deliverables`
- `GET /api/developer/notifications`
- `PATCH /api/developer/notifications/{notificationId}/read`
- `PATCH /api/developer/me/preferences`

Suggested database entities: `users`, `roles`, `projects`, `project_members`, `tasks`, `task_assignments`, `task_requirements`, `task_acceptance_criteria`, `task_status_history`, `task_submissions`, `review_comments`, `deliverables`, `project_messages`, and `notifications`.

For production, use Spring Security authentication, server-side role and project authorization, request validation, database transactions, secure upload handling, and audit trails. Never trust the developer ID, role, project ID, or task assignment supplied by the browser; derive the authenticated user from the server-side security context and verify access on every request.
