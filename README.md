# Digital_marketing_service_management_Platform

# E2E Management System

A role-based project and business management system designed to manage the complete workflow of an IT services company. The system provides separate dashboards for Admins, Managers, Team Leads, Developers, and Clients.

The application is developed using HTML5, CSS3, and Vanilla JavaScript. Each role has dedicated features and permissions to manage its activities and responsibilities.

## 1. Project Overview

The E2E Management System provides a centralized platform for managing clients, service requests, quotations, projects, employees, tasks, payments, invoices, and deliverables.

The system consists of five role-based dashboards:

1. **Admin Dashboard** – Manages users, roles, services, requests, quotations, projects, payments, invoices, reports, and system settings.
2. **Manager Dashboard** – Handles client requests, quotation preparation, project creation, Team Lead assignments, payments, invoices, and reports.
3. **Team Lead Dashboard** – Manages projects, assigns tasks to developers, monitors workloads, and reviews submitted deliverables.
4. **Developer Dashboard** – Views assigned projects and tasks, updates progress, submits deliverables, and communicates with the team.
5. **Client Portal** – Allows clients to submit requests, view quotations, track projects, monitor payments, access invoices, review deliverables, and communicate with the team.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and layout |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality and interactions |
| Local Storage | Browser-based demo data persistence |
| Google Fonts | Manrope typography |
| Spring Boot (Future) | Backend development |
| Spring Data JPA (Future) | Database operations |
| MySQL (Future) | Centralized database |
| Spring Security (Future) | Authentication and authorization |

**Current implementation:** Frontend-only application using HTML5, CSS3, and Vanilla JavaScript.

No frontend framework, npm installation, or build process is required.

## 3. Project Structure

The application is organized into five role-based dashboard modules.

```text
E2E-Management-System/
│
├── E2E-Admin-Dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
│
├── E2E-Manager-Dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
│
├── E2E-Team-Lead-Dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
│
├── E2E-Developer-Dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
│
├── E2E-Client-Portal/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
│
└── README.md
```

## 4. Role-Based Dashboard Modules

### 4.1 Admin Dashboard

Provides centralized administration and system management.

**Features:**
- Dashboard overview and analytics.
- User and role management.
- Add, edit, search, filter, enable, and disable users.
- Service management.
- Client request management.
- Request review and Manager assignment.
- Quotation management with configurable GST.
- Project management and assignments.
- Payment and invoice monitoring.
- Reports and CSV exports.
- Company settings and notification preferences.

### 4.2 Manager Dashboard

Provides project and business operation management.

**Features:**
- Dashboard overview and activity monitoring.
- Review incoming client requests.
- Save internal notes.
- Request clarification from clients.
- Recommend request acceptance.
- Reject requests with reasons.
- Create and manage quotations.
- Configure quotation services and GST.
- Submit quotations for approval.
- Create and manage projects.
- Assign and reassign Team Leads.
- Monitor Team Lead workloads.
- View clients, payments, and invoices.
- Generate project reports and CSV exports.
- Manage Manager profile and support information.

### 4.3 Team Lead Dashboard

Provides project coordination and team management functionality.

**Features:**
- Dashboard overview and project analytics.
- View and create projects.
- Monitor project progress and deadlines.
- Create and assign developer tasks.
- Set task priorities and deadlines.
- View and manage team members.
- Monitor developer workloads.
- Review client requests.
- View quotation information.
- Review submitted tasks.
- Approve tasks or request revisions.
- Track task status and project progress.
- Communicate through project messages.
- Generate reports and export task data.
- Manage Team Lead profile information.

### 4.4 Developer Dashboard

Provides a dedicated workspace for developers to manage assigned work.

**Features:**
- Dashboard summary and task statistics.
- View assigned projects and tasks.
- Search and filter tasks.
- Filter by project, priority, due date, and status.
- View task requirements and acceptance criteria.
- Update task progress.
- Add work notes.
- Start and manage assigned tasks.
- Submit completed tasks for review.
- Submit deliverables with reference links.
- View project-related messages.
- Manage notifications.
- Update profile and preferences.
- Export task reports as CSV.

**Task Workflow:**

```text
Pending
   |
   v
Assigned
   |
   v
In Progress
   |
   v
Submitted for Review
   |
   +----------------------+
   |                      |
   v                      v
Approved             Revision Required
                          |
                          v
                     In Progress
```

Only the authorized Team Lead can approve submitted tasks or request revisions.

### 4.5 Client Portal

Provides clients with a dedicated interface to interact with the company.

**Features:**
- Demo login and sign-up.
- Dashboard overview.
- Submit new service requests.
- View and track submitted requests.
- View quotation details.
- Accept quotations through the demo workflow.
- Monitor project progress.
- View payment records.
- Access downloadable demo receipts.
- View and review deliverables.
- Approve deliverables or request revisions.
- Communicate through project messages.
- Manage client profile information.
- Configure notification preferences.

## 5. Overall Business Workflow

The E2E Management System follows a structured workflow from client request submission to project completion.

```text
Client
   |
   v
Submit Service Request
   |
   v
Admin / Manager Review
   |
   v
Request Acceptance
   |
   v
Quotation Preparation
   |
   v
Quotation Approval
   |
   v
Project Creation
   |
   v
Team Lead Assignment
   |
   v
Task Creation and Assignment
   |
   v
Developer Works on Tasks
   |
   v
Task Submission
   |
   v
Team Lead Review
   |
   +-----------------------+
   |                       |
   v                       v
Approved              Revision Required
   |                       |
   v                       v
Client Review          Developer Updates
   |                       |
   v                       |
Project Completion <-------+
   |
   v
Invoice and Payment Tracking
```

The workflow represents the intended business process. Some transitions are simulated in the current frontend prototypes.

## 6. Data Storage

The current application uses browser Local Storage to maintain demonstration data.

**Advantages:**
- No database configuration required.
- Data remains available after refreshing the browser.
- Easy to test dashboard functionality.
- Suitable for frontend prototyping.

**Limitations:**
- Data is stored only in the current browser.
- Different users and devices do not share data.
- Local Storage does not provide secure authentication.
- Clearing browser storage may remove saved information.
- Changes are not synchronized between role-based dashboards.

Each dashboard may use its own Local Storage key.

## 7. Installation and Setup

### Prerequisites

- Computer or laptop.
- Visual Studio Code (recommended).
- Modern browser such as Chrome, Edge, Firefox, or Safari.

### Step 1: Download the Project

Download or clone the E2E Management System repository.

### Step 2: Extract the Project

Extract the downloaded project folder if it is provided as a ZIP file.

### Step 3: Open in Visual Studio Code

Open the extracted project folder in Visual Studio Code.

### Step 4: Run the Dashboard

Navigate to the required dashboard folder and open its `index.html` file.

You can also use the VS Code Live Server extension.

Alternatively, run a local server from the project directory:

```bash
python -m http.server 8000
```

Open the following URL:

```text
http://localhost:8000
```

Navigate to the relevant dashboard folder to access its interface.

**Note:** Each dashboard is currently a separate frontend prototype. Its demo data is maintained independently.

## 8. Design and UI

The dashboards follow a consistent visual design system.

**Design specifications:**

- Primary Color: `#3B2F8F`
- Accent Color: `#FF6B5B`
- Background Color: `#F5F4FB`
- Text Color: `#1B1740`
- Font Family: Manrope

**UI Features:**
- Responsive dashboard layouts.
- Sidebar navigation.
- Top navigation bars.
- Summary cards and analytics.
- Search and filtering.
- Tables and status badges.
- Forms and modal dialogs.
- Notifications and profile sections.
- Mobile-friendly navigation.
- Accessible focus styles and reduced-motion support where implemented.

## 9. Security and Access Control

The current version provides role-specific frontend interfaces, but it does not implement production-level authentication or authorization.

The intended role responsibilities are:

| Role | Responsibilities |
|---|---|
| Admin | Complete system administration |
| Manager | Request review, quotations, projects, and business operations |
| Team Lead | Project coordination, task assignments, and task reviews |
| Developer | Assigned tasks, progress updates, and deliverable submissions |
| Client | Requests, quotations, project tracking, and deliverable reviews |

For production implementation, Spring Security should enforce authentication and authorization on the server.

Client-side role checks must never be treated as actual security controls.

## 10. Future Backend Integration

The frontend prototypes can be integrated with a centralized Java Spring Boot backend and MySQL database.

### Suggested Backend Technologies

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- MySQL
- REST APIs
- Maven

### Suggested Backend Modules

```text
E2E-Backend/
│
├── auth/
├── users/
├── roles/
├── clients/
├── services/
├── requests/
├── quotations/
├── projects/
├── assignments/
├── tasks/
├── deliverables/
├── payments/
├── invoices/
├── messages/
├── notifications/
└── reports/
```

### Suggested API Structure

| Module | Example Endpoint |
|---|---|
| Authentication | `/api/auth/login` |
| Users | `/api/users` |
| Clients | `/api/clients` |
| Services | `/api/services` |
| Requests | `/api/requests` |
| Quotations | `/api/quotations` |
| Projects | `/api/projects` |
| Assignments | `/api/assignments` |
| Tasks | `/api/tasks` |
| Deliverables | `/api/deliverables` |
| Payments | `/api/payments` |
| Invoices | `/api/invoices` |
| Messages | `/api/messages` |
| Notifications | `/api/notifications` |
| Reports | `/api/reports` |

### Database Integration

Suggested MySQL database tables:

- users
- roles
- user_roles
- clients
- services
- requests
- request_notes
- quotations
- quotation_items
- quotation_approvals
- projects
- project_members
- milestones
- tasks
- task_assignments
- task_status_history
- task_submissions
- review_comments
- deliverables
- payments
- payment_events
- invoices
- project_messages
- notifications
- audit_logs

### Integration Steps

1. Develop REST APIs using Spring Boot.
2. Configure MySQL database connectivity.
3. Create entities and repositories using Spring Data JPA.
4. Implement service and controller layers.
5. Configure Spring Security authentication.
6. Implement role-based access control.
7. Replace Local Storage operations with authenticated JavaScript `fetch()` calls.
8. Implement server-side validation and error handling.
9. Integrate secure file uploads and document storage.
10. Implement centralized notifications and messaging.
11. Add audit logging and automated tests.
12. Deploy the backend and frontend.

## 11. Important Project Limitations

The current E2E Management System is a frontend demonstration and is not production-ready.

- No centralized backend or database.
- No production authentication.
- No server-side role authorization.
- No multi-user data synchronization.
- No real-time messaging.
- No real payment processing or verification.
- No production email delivery.
- No secure document storage.
- No centralized audit logging.
- Dashboard actions and business workflows are simulated using local demonstration data.

Downloaded receipts are demonstration documents and are not legally compliant tax invoices.

Real-world implementation requires backend integration, security controls, database persistence, and proper validation.

## 12. Project Objective

The main objective of the E2E Management System is to simplify and centralize business operations, client interactions, project coordination, task assignments, and employee collaboration within an IT services company.

By providing dedicated dashboards for different organizational roles, the system aims to improve workflow visibility, task accountability, project tracking, and communication.

The current frontend MVP establishes the foundation for developing a complete enterprise-level project management application using Java Spring Boot and MySQL.

---

## Project Information

| Attribute | Details |
|---|---|
| Project Name | E2E Management System |
| Project Type | Role-Based Management System |
| Architecture | Multiple Role-Based Dashboards |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Storage | Browser Local Storage |
| Backend | Planned – Java Spring Boot |
| Database | Planned – MySQL |
| Authentication | Planned – Spring Security |
| Version | 1.0 |
| Current Status | Frontend Prototype / MVP |
