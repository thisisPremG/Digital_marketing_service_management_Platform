# E2E Team Lead Dashboard

A responsive, role-based Team Lead Dashboard developed using HTML5, CSS3, and Vanilla JavaScript.

The dashboard helps Team Leads manage projects, assign tasks to developers, review deliverables, monitor team workloads, handle client requests, and track project progress.

---

## 1. Project Overview

The E2E Team Lead Dashboard is a frontend demonstration of a project and team management system for an IT services company.

It provides a centralized interface for Team Leads to:

- Monitor active projects.
- Create and manage projects.
- Assign tasks to developers.
- Track task progress.
- Review submitted tasks.
- Approve tasks or request revisions.
- Manage team members.
- Review client requests.
- View quotations.
- Monitor reports.
- Communicate through messages.

---

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Dashboard structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Dashboard functionality |
| Local Storage | Store demo data in the browser |
| Google Fonts | Manrope typography |

**No backend or database is required for the current demo version.**

---

## 3. Project Structure

```text
E2E_Team_Lead_Dashboard/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

### File Description

**index.html**
- Contains the dashboard layout.
- Defines navigation menus.
- Contains dashboard sections, tables, forms, and modals.

**style.css**
- Contains the dashboard design.
- Provides responsive styling.
- Defines colors, layouts, cards, tables, and buttons.

**app.js**
- Handles dashboard functionality.
- Manages projects and tasks.
- Handles task assignment and reviews.
- Manages team members and messages.
- Saves demo data using Local Storage.

**README.md**
- Contains project documentation and setup instructions.

---

## 4. Dashboard Modules

### 4.1 Dashboard
Displays an overview of the Team Lead's activities.

Features:
- Active Projects
- Total Tasks
- Pending Reviews
- Approved Tasks
- Project Progress
- Team Overview
- Recent Activities

### 4.2 My Projects
Allows Team Leads to view and create projects.

Features:
- View project details.
- Add new projects.
- View client information.
- Track project deadlines.
- Monitor project progress.

### 4.3 Tasks
Provides task assignment and tracking functionality.

Features:
- Create new tasks.
- Assign tasks to developers.
- Select the related project.
- Set task deadlines.
- Add task descriptions.
- Search tasks.
- Filter tasks by status.

### 4.4 Team Members
Provides an overview of the development team.

Features:
- View team members.
- View developer roles.
- View email addresses.
- Monitor assigned task counts.
- Add new team members.

### 4.5 Client Requests
Allows Team Leads to review incoming client requests.

Features:
- View client requests.
- Review requests.
- Update request status.
- Approve requests.

### 4.6 Quotations
Displays quotation information.

Features:
- View quotation details.
- View client names.
- View quotation amounts.
- Track quotation status.

### 4.7 Reports
Provides task-related reporting information.

Features:
- Total tasks.
- Approved tasks.
- Tasks in progress.
- Pending reviews.
- Task status distribution.
- Export task data as CSV.

### 4.8 Messages
Provides a basic messaging interface.

Features:
- View messages.
- Send messages.
- Display message timestamps.
- Store demo messages in Local Storage.

### 4.9 Profile
Allows the Team Lead to manage basic profile information.

Features:
- Update name.
- Update email.
- Update department.
- Save profile information.

---

## 5. Task Workflow

The dashboard supports the following task lifecycle:

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
   +--------------------+
   |                    |
   v                    v
Approved          Revision Required
                        |
                        v
                   In Progress
```

### Task Status Description

| Status | Description |
|---|---|
| Pending | Task is waiting for assignment. |
| Assigned | Task has been assigned to a developer. |
| In Progress | Developer is working on the task. |
| Submitted for Review | Developer has submitted the task for review. |
| Revision Required | Team Lead has requested changes. |
| Approved | Team Lead has approved the task. |

**Important:** Only approved tasks are counted as completed tasks in the dashboard.

---

## 6. Installation and Setup

### Prerequisites

You need:

- A computer.
- Visual Studio Code (recommended).
- A modern web browser such as Chrome or Edge.

No Node.js installation is required for this frontend-only version.

### Step 1: Create the Project Folder

Create a folder named:

```text
E2E_Team_Lead_Dashboard
```

### Step 2: Create the Files

Inside the folder, create:

```text
index.html
style.css
app.js
README.md
```

### Step 3: Add the Code

Copy the respective code into each file.

Make sure the filenames are correct.

### Step 4: Run the Application

You can run the dashboard in either of these ways:

**Method 1: Direct Browser**

1. Open the project folder.
2. Double-click `index.html`.
3. The dashboard will open in your default browser.

**Method 2: Using Visual Studio Code**

1. Open the project folder in VS Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The dashboard will open in your browser.

---

## 7. Data Storage

The current version uses browser Local Storage.

Example:

```javascript
localStorage.setItem(
    "e2e_team_lead_dashboard",
    JSON.stringify(data)
);
```

### Advantages

- No database setup required.
- Demo data remains available after refreshing the page.
- Easy to test frontend functionality.
- Suitable for an initial UI prototype.

### Limitations

- Data is stored only in the current browser.
- Different users do not share the same data.
- It does not provide secure authentication.
- Clearing browser storage can remove saved demo data.

---

## 8. Future Enhancements

The dashboard can be extended into a complete enterprise application.

### Backend Integration
- Spring Boot REST APIs.
- Node.js and Express APIs.
- MySQL database integration.

### Authentication and Authorization
- Employee login.
- Role-based access control.
- Secure session or token management.
- Protected dashboard pages.

### Project Management
- Project creation and assignment.
- Project team allocation.
- Advanced project tracking.
- Deadline notifications.

### Task Management
- Developer task updates.
- Task reassignment.
- Priority management.
- File and document uploads.
- Complete task history.

### Communication
- Real-time messaging.
- Notifications.
- Project discussions.

### Reporting
- Advanced analytics.
- Downloadable PDF reports.
- Project performance reports.
- Developer workload reports.

---

## 9. Current Project Limitations

This is a frontend demonstration, not a production-ready management system.

- No real employee authentication.
- No backend API integration.
- No MySQL database connection.
- No real-time messaging.
- No multi-user synchronization.
- Demo data is stored in browser Local Storage.
- Some workflow transitions require additional implementation.

---

## 10. Project Objective

The main objective of the E2E Team Lead Dashboard is to simplify project coordination, task distribution, developer monitoring, and deliverable review within an IT services company.

The frontend MVP provides a foundation for future integration with backend services and a centralized database.

---

**Project Name:** E2E Team Lead Dashboard  
**Project Type:** Frontend Web Application  
**Frontend:** HTML5, CSS3, Vanilla JavaScript  
**Storage:** Browser Local Storage  
**Version:** 1.0  
**Status:** Frontend Demo / MVP