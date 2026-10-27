# E2E Client Portal — Frontend Demo

A responsive client dashboard for a web-development services company, built with HTML5, CSS3 and vanilla JavaScript. It runs directly in a modern browser without a build step. Includes a demo login and sign-up screen.

## Folder structure

```text
E2E-Client-Dashboard/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Run locally

1. Download and extract the project folder.
2. Open `index.html` in a modern browser.
3. No package manager or build process is required. Google Fonts needs an internet connection; system fonts are used as a fallback.

## Files

- **index.html** — semantic page shell, sidebar navigation, top bar, modal and toast containers.
- **style.css** — theme tokens, component styling, responsive breakpoints, focus states and reduced-motion support.
- **app.js** — demo records, rendering, navigation, form validation, localStorage persistence, messages and download behavior.
- **README.md** — this guide and future integration notes.

## Login and sign-up (demo only)

- The site opens on a login screen with a Sign up tab and account-creation form.
- Create a demo account using a name, email address and a password of at least 6 characters, then log in with those credentials.
- A Log out button returns to the login screen.
- **Security limitation:** this is only a front-end demonstration. Demo credentials are stored in browser `localStorage` and are not secure; do not use a real or reused password. It does not provide production authentication, password hashing, email verification, password recovery, server-side sessions or access control. Use a backend such as Spring Security before handling real users or sensitive client data.

## Navigation pages

1. **Dashboard** — summary cards, recent requests, project progress, action-needed items, activity and illustrative company stats.
2. **My Requests** — searchable/filterable requests, request details and a validated new-request modal.
3. **Quotations** — quote totals with GST at 18%, details, acceptance confirmation and link to Messages.
4. **Payments** — payment summary, search/status filters and detail modal. No real payments are processed.
5. **Invoices** — invoice summary, filters and a downloadable plain-text demo receipt, explicitly not a tax invoice.
6. **Deliverables** — pending/completed tabs, example staging links and approve/revision workflow with a two-revision demo limit.
7. **Messages** — three example conversations with local demo message sending.
8. **Profile** — editable contact details, notification preferences and backend-only security placeholders.

## How navigation works

Each sidebar item has a `data-page` attribute. A single delegated click handler calls `navigate(page)`, which updates the active navigation state, renders the matching page into `#pageContent`, and updates the breadcrumb without reloading the browser.

## localStorage

Demo records are loaded from the `e2ePortalData` key. Changes to requests, quotation acceptance, deliverable reviews, messages and profile data are saved in this browser. To reset demo data, open browser developer tools and run:

```js
localStorage.removeItem('e2ePortalData');
location.reload();
```

This is not secure storage and should not be used for secrets or production authorization.

## Change services and prices

Edit the `services` array near the top of `app.js`. Each item contains a service `name` and base `price`. The quotation examples live in the `seed.quotations` array. GST is calculated as `subtotal * 0.18`; total is subtotal plus GST.

## Known limitations

- All records and state are demonstration data stored locally in the browser.
- Authentication and sign-up are UI-only demo flows backed by browser `localStorage`; no secure server authentication, authorization, server validation, real employee messaging or email delivery is implemented.
- Payment status is never changed by a client-side click. Production payment status must be verified by a backend against a trusted payment-provider response.
- Quotation acceptance in this demo is not a legally binding acceptance and is not server-validated.
- Receipt downloads are text demo receipts, not valid tax invoices.
- Staging URLs use `example.com` placeholders.
- Security actions are placeholders and require backend implementation.
- For a production app, validate all input server-side, protect endpoints, implement audit logs and use HTTPS.

## Future Java Spring Boot REST API integration

1. Create Spring Boot REST endpoints, for example:
   - `GET /api/requests`, `POST /api/requests`, `GET /api/requests/{id}`
   - `GET /api/quotations`, `POST /api/quotations/{id}/accept`
   - `GET /api/payments`, `GET /api/invoices`
   - `GET /api/deliverables`, `POST /api/deliverables/{id}/review`
   - `GET /api/conversations`, `GET /api/conversations/{id}/messages`, `POST /api/conversations/{id}/messages`
   - `GET /api/profile`, `PUT /api/profile`
2. Replace seeded arrays and `loadData()`/`persist()` with `fetch()` calls to the API. Use `async` functions, show loading and error states, and handle non-2xx responses.
3. Configure CORS on Spring Boot for the exact frontend origin during development. Prefer serving the frontend and API from the same origin in production where practical.
4. Add Spring Security authentication (session cookies or an appropriate token strategy), authorization checks for every client-owned resource, CSRF protections where relevant, rate limits and server-side validation.
5. Keep payment-provider secrets on the server. Verify signed provider webhooks and update payment records only after trusted confirmation.
6. Generate legally compliant invoices/receipts on the server as PDFs and return them with the correct content type and authorization.
7. Add automated tests for validation, permissions, quote acceptance, payment status transitions and deliverable approvals before deploying.

## Accessibility and responsive behavior

The interface uses semantic buttons, labels, visible keyboard focus, dialog semantics, touch-friendly controls, narrow-screen sidebar navigation and a reduced-motion preference. Tables scroll within their own containers on smaller screens.
