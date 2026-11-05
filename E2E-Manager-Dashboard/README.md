# E2E Manager Dashboard

A responsive manager-workspace prototype built with **HTML5, CSS3 and vanilla JavaScript**. It runs directly in a modern browser and uses `localStorage` for demo persistence.

## Run locally

1. Download and extract the project.
2. Open `index.html` in Chrome, Edge, Firefox or Safari.
3. No build step, package manager or server is required.

For a local development server, you can also run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html` — application structure and page sections.
- `style.css` — E2E visual system and responsive layouts.
- `app.js` — sample data, navigation, forms, workflow actions, rendering and localStorage.
- `README.md` — setup and integration notes.

## Demo workflows

- Review client requests, save internal notes, request clarification, recommend acceptance, reject with a required reason, or save an alternative recommendation.
- Create quotations only from accepted requests. Sample service rates are prefilled, GST is calculated at 18%, and quotation terms include seven-day validity and two free revisions.
- Save quotation drafts or submit them for approval. Approve a quotation to simulate sending it to the client.
- Create projects from accepted requests, assign a Team Lead, track milestones and update status/progress.
- Reassign Team Leads after checking their displayed workload.
- Browse clients, payment records, invoices, deadlines and reports.
- Export project data as CSV.
- Changes are saved in the browser's `localStorage`.

## Reset demo data

Open the browser developer console and run:

```js
localStorage.removeItem('e2e_manager_dashboard_v1');
location.reload();
```

## Important demo limitations

This is a **frontend-only demonstration**, not a production authorization or transaction system.

- The visible Manager role is a UI demo gate only. A user can modify browser JavaScript or localStorage. Do not rely on client-side checks for access control.
- Payments are monitoring records only. The application never marks a payment as verified from a client-side action. A production system must confirm payment status using a trusted payment-provider webhook or backend reconciliation.
- “Send to client”, approval, acceptance and status changes are simulated locally. No email, payment, or external API is called.
- Sample records and monetary amounts are illustrative.

## Suggested Java Spring Boot + MySQL integration

A production architecture can preserve the current page structure while replacing the localStorage data layer with authenticated REST APIs.

### Suggested modules

- `auth` — login, session/JWT handling, role and permission checks.
- `users` — managers, team leads and developers.
- `clients` — client profiles and contact information.
- `requests` — client submissions, reviews, clarification and decisions.
- `quotations` — quote lines, tax calculations, revisions, approval and delivery.
- `projects` — project records, milestones, progress and due dates.
- `assignments` — team-lead ownership and scoped developer tasks.
- `payments` — payment intents, provider references and verified webhook events.
- `invoices` — invoice numbering, line items, tax and payment state.
- `reports` — aggregated reporting endpoints and export.

### Example REST endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/manager/dashboard` | Dashboard metrics and alerts |
| GET/POST | `/api/requests` | List/create client requests |
| GET | `/api/requests/{id}` | Request detail |
| PATCH | `/api/requests/{id}/decision` | Manager decision and reason |
| POST | `/api/quotations` | Create quotation |
| POST | `/api/quotations/{id}/submit` | Submit for approval |
| POST | `/api/quotations/{id}/send` | Send approved quotation |
| GET/POST | `/api/projects` | List/create projects |
| PATCH | `/api/projects/{id}` | Update permitted project fields |
| PUT | `/api/projects/{id}/lead` | Assign/reassign Team Lead |
| GET | `/api/team/workload` | Workload and availability |
| GET | `/api/payments` | Payment monitoring |
| POST | `/api/webhooks/payments/{provider}` | Trusted payment confirmation |
| GET | `/api/reports/manager` | Manager reports |

### Authorization requirements

Enforce permissions on every protected Spring Boot endpoint using Spring Security (for example, method-level authorization with `@PreAuthorize`). Suggested role boundaries:

- **Manager:** review requests, record decisions, prepare/approve quotations as configured, create projects, assign Team Leads, view financial records and reports.
- **Team Lead:** manage assigned projects and create/assign scoped developer tasks.
- **Developer:** view assigned tasks and update only permitted task fields.
- **Client:** submit requests, view their own quotations/projects/invoices and respond to clarification.

Validate client ownership and project assignment on the server for every read and write. Never trust a role, user ID, amount, status or ownership value supplied by the browser.

### Data model starting point

Use relational tables such as `users`, `roles`, `user_roles`, `clients`, `requests`, `request_notes`, `quotations`, `quotation_items`, `quotation_approvals`, `projects`, `milestones`, `project_assignments`, `tasks`, `payments`, `payment_events`, and `invoices`.

Store money using `DECIMAL`, dates as date/time types, and use foreign keys and transactions for related updates. Keep an audit log for decisions, quotation approvals, assignments and payment events.

## Design tokens

- Primary: `#3B2F8F`
- Accent: `#FF6B5B`
- Background: `#F5F4FB`
- Text: `#1B1740`
- Font: Manrope (Google Fonts; system fallback is available)

## Manager profile and support

- Select the manager name/avatar in the top bar or the profile area at the bottom of the sidebar to open Manager Profile.
- Update the manager name, work email, phone number, and department. The demo saves these details in the same localStorage workspace record.
- Select **Help** in the top bar or **Help & Support** in the sidebar to open the support center, including email, phone, FAQs, and support hours.
- The displayed support contact details are demo placeholders and should be replaced with your organization's verified support channels before production use.

### Project list and button reliability update
- The Projects page now restores the five built-in demo projects when older browser storage contains an incomplete/empty project list, while retaining additional projects saved in the browser.
- Project search/status filters show a visible result count and an option to show all projects when no results match.
- Dashboard action clicks are handled in the capture phase with error feedback, so modal actions are less likely to be blocked by nested elements.
- If an older browser session still looks stale, refresh the page once. The app keeps its demo data in browser localStorage.
