# E2E Admin Dashboard

A responsive admin dashboard prototype built with HTML5, CSS3, and vanilla JavaScript.

## Run locally
1. Extract the folder.
2. Open `index.html` in a modern browser.
3. No npm installation or build step is required. The Manrope font is loaded from Google Fonts when internet is available; system fonts are used as fallback.

## Included features
- Dashboard overview, request activity, role distribution, and simple charts.
- Users & Roles: add, edit, search, filter, enable, and disable demo accounts.
- Services: add, edit, enable, and disable services.
- Requests: create, review, assign to a Manager, and update status.
- Quotations: create/edit quotations and calculate configurable GST (default 18%).
- Projects: create/edit project assignments, progress, due dates, and status.
- Payments and invoices: sample records and downloadable demo receipts.
- Reports: request/project charts and CSV request export.
- Settings: company details, GST, and local notification preferences.
- Responsive layout with mobile navigation and localStorage persistence.

## Demo limitations
This is a frontend-only prototype. Data is saved in the current browser's localStorage and is not shared across users or devices. Reset demo data restores the sample records. There is no secure authentication, server-side authorization, real payment verification, email delivery, secure file storage, audit logging, or multi-user synchronization. Payment entries and statuses are sample data; they do not prove that funds were received. Downloaded receipts are demonstrations and are not legal tax invoices.

## Suggested Spring Boot integration
Create authenticated REST endpoints for users/roles, services, requests, quotations, projects, payments, invoices, reports, and settings. Persist data in MySQL, validate inputs server-side, enforce role permissions on every protected endpoint, and replace localStorage operations with authenticated `fetch()` calls. Verify payments using trusted payment-provider APIs and webhooks.
