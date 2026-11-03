const STORAGE_KEY = "e2e_team_lead_dashboard";

// Demo data
const defaultData = {
    projects: [
        {
            id: 1,
            name: "E-Commerce Platform",
            client: "ABC Technologies",
            deadline: "2026-12-15",
            progress: 70,
            status: "In Progress"
        },
        {
            id: 2,
            name: "HR Management System",
            client: "Global Solutions",
            deadline: "2026-12-25",
            progress: 45,
            status: "In Progress"
        },
        {
            id: 3,
            name: "Inventory Management",
            client: "Smart Retail",
            deadline: "2027-01-10",
            progress: 20,
            status: "Planning"
        }
    ],

    tasks: [
        {
            id: 101,
            title: "Create login API",
            project: "E-Commerce Platform",
            developer: "Arun Kumar",
            deadline: "2026-11-10",
            status: "In Progress",
            description: "Develop login and authentication API."
        },
        {
            id: 102,
            title: "Design dashboard UI",
            project: "HR Management System",
            developer: "Priya",
            deadline: "2026-11-12",
            status: "Submitted for Review",
            description: "Create responsive dashboard interface."
        },
        {
            id: 103,
            title: "Database integration",
            project: "Inventory Management",
            developer: "Rahul",
            deadline: "2026-11-15",
            status: "Assigned",
            description: "Connect the application with MySQL."
        },
        {
            id: 104,
            title: "API testing",
            project: "E-Commerce Platform",
            developer: "Arun Kumar",
            deadline: "2026-11-18",
            status: "Approved",
            description: "Test product and order APIs."
        }
    ],

    team: [
        {
            id: 1,
            name: "Arun Kumar",
            role: "Backend Developer",
            email: "arun@e2e.com"
        },
        {
            id: 2,
            name: "Priya",
            role: "Frontend Developer",
            email: "priya@e2e.com"
        },
        {
            id: 3,
            name: "Rahul",
            role: "Full Stack Developer",
            email: "rahul@e2e.com"
        }
    ],

    requests: [
        {
            id: 1,
            title: "Add payment gateway",
            client: "ABC Technologies",
            date: "2026-11-01",
            status: "Pending"
        },
        {
            id: 2,
            title: "Add employee reports",
            client: "Global Solutions",
            date: "2026-11-02",
            status: "Under Review"
        }
    ],

    quotations: [
        {
            id: 1,
            title: "Mobile Application Development",
            client: "Smart Retail",
            amount: 75000,
            submittedDate: "2026-10-29",
            status: "Pending"
        },
        {
            id: 2,
            title: "Website Maintenance",
            client: "ABC Technologies",
            amount: 25000,
            submittedDate: "2026-10-25",
            status: "Approved"
        }
    ],

    messages: [
        {
            id: 1,
            sender: "Project Manager",
            text: "Please update the project progress.",
            time: new Date().toLocaleString()
        }
    ],

    activities: [
        "Team Lead dashboard initialized.",
        "Demo projects loaded.",
        "Team members added."
    ]
};

let data = loadData();
let selectedReviewTaskId = null;

// ============================================
// LOCAL STORAGE
// ============================================

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (
                parsed &&
                Array.isArray(parsed.projects) &&
                Array.isArray(parsed.tasks) &&
                Array.isArray(parsed.team)
            ) {
                return parsed;
            }
        }
    } catch (error) {
        console.error("Could not load dashboard data:", error);
    }

    return JSON.parse(JSON.stringify(defaultData));
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Could not save dashboard data:", error);
        alert("Unable to save data in this browser.");
    }
}

function addActivity(message) {
    data.activities.unshift(message);
    data.activities = data.activities.slice(0, 10);
    saveData();
}

// ============================================
// COMMON HELPERS
// ============================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function formatDate(date) {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
}

function getStatusClass(status) {
    return String(status || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const element = getElement(id);
    if (element) element.textContent = value;
}

// ============================================
// NAVIGATION
// ============================================

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("active", page.id === pageName);
    });

    document.querySelectorAll(".nav-item[data-page]").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );
    });

    const title = getElement("pageTitle");

    if (title) {
        const activeItem = document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );

        title.textContent = activeItem
            ? activeItem.textContent.trim()
            : "Dashboard";
    }

    renderAll();
}

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

function setupNavigation() {
    document.querySelectorAll(".nav-item[data-page]").forEach(item => {
        item.addEventListener("click", () => {
            showPage(item.dataset.page);

            if (window.innerWidth <= 768) {
                document.querySelector(".sidebar")?.classList.remove("open");
            }
        });
    });
}

// ============================================
// DASHBOARD STATISTICS
// ============================================

function renderStats() {
    const activeProjects = data.projects.filter(
        project => project.status !== "Completed"
    ).length;

    const pendingReviews = data.tasks.filter(
        task => task.status === "Submitted for Review"
    ).length;

    const approvedTasks = data.tasks.filter(
        task => task.status === "Approved"
    ).length;

    setText("activeProjects", activeProjects);
    setText("totalTasks", data.tasks.length);
    setText("pendingReviews", pendingReviews);
    setText("approvedTasks", approvedTasks);
}

// ============================================
// PROJECTS
// ============================================

function renderProjects() {
    const container = getElement("projectList");
    const dashboardContainer = getElement("dashboardProjects");

    const projectHTML = data.projects.map(project => `
        <div class="project-card">
            <div class="project-card-header">
                <h3>${escapeHTML(project.name)}</h3>
                <span class="status ${getStatusClass(project.status)}">
                    ${escapeHTML(project.status)}
                </span>
            </div>

            <p>Client: ${escapeHTML(project.client)}</p>
            <p>Deadline: ${formatDate(project.deadline)}</p>

            <div class="progress-info">
                <span>Progress</span>
                <strong>${project.progress}%</strong>
            </div>

            <div class="progress-bar">
                <div class="progress-fill"
                     style="width: ${Math.min(100, Math.max(0, project.progress))}%">
                </div>
            </div>
        </div>
    `).join("");

    if (container) {
        container.innerHTML = projectHTML || "<p>No projects available.</p>";
    }

    if (dashboardContainer) {
        dashboardContainer.innerHTML =
            projectHTML || "<p>No projects available.</p>";
    }

    const taskProject = getElement("taskProject");

    if (taskProject) {
        const currentValue = taskProject.value;

        taskProject.innerHTML = `
            <option value="">Select Project</option>
            ${data.projects.map(project => `
                <option value="${escapeHTML(project.name)}">
                    ${escapeHTML(project.name)}
                </option>
            `).join("")}
        `;

        if (data.projects.some(project => project.name === currentValue)) {
            taskProject.value = currentValue;
        }
    }
}
// ============================================
// TASKS
// ============================================

function renderTasks() {
    const table = getElement("taskTable");
    if (!table) return;

    const search = (getElement("taskSearch")?.value || "").toLowerCase();
    const filter = getElement("taskFilter")?.value || "";

    const filteredTasks = data.tasks.filter(task => {
        const matchesSearch =
            task.title.toLowerCase().includes(search) ||
            task.project.toLowerCase().includes(search) ||
            task.developer.toLowerCase().includes(search);

        const matchesFilter = !filter || filter === "All" || task.status === filter;

        return matchesSearch && matchesFilter;
    });

    table.innerHTML = filteredTasks.length
        ? filteredTasks.map(task => `
            <tr>
                <td>${escapeHTML(task.title)}</td>
                <td>${escapeHTML(task.project)}</td>
                <td>${escapeHTML(task.developer)}</td>
                <td>${formatDate(task.deadline)}</td>
                <td>
                    <span class="status ${getStatusClass(task.status)}">
                        ${escapeHTML(task.status)}
                    </span>
                </td>
                <td>
                    ${
                        task.status === "Submitted for Review"
                            ? `<button class="btn btn-primary"
                                onclick="reviewTask(${task.id})">
                                Review
                               </button>`
                            : `<button class="btn btn-secondary"
                                onclick="viewTask(${task.id})">
                                View
                               </button>`
                    }
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="6">No tasks found.</td></tr>`;
}

function openTaskModal() {
    const modal = getElement("taskModal");
    if (!modal) return;

    getElement("taskForm")?.reset();
    renderProjects();

    modal.classList.add("show");
}

function createTask(event) {
    event.preventDefault();

    const title = getElement("taskTitle")?.value.trim();
    const project = getElement("taskProject")?.value;
    const developer = getElement("taskDeveloper")?.value;
    const deadline = getElement("taskDeadline")?.value;
    const description = getElement("taskDescription")?.value.trim();

    if (!title || !project || !developer || !deadline) {
        alert("Please fill in all required task fields.");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        project,
        developer,
        deadline,
        status: "Assigned",
        description
    };

    data.tasks.push(task);

    addActivity(`Task "${title}" assigned to ${developer}.`);
    saveData();
    closeModal();

    renderAll();
    alert("Task created and assigned successfully.");
}

function viewTask(taskId) {
    const task = data.tasks.find(item => item.id === taskId);
    if (!task) return;

    const details = getElement("taskDetailsContent");
    if (!details) return;

    const detailRow = (label, value) => `
        <div class="task-detail-row">
            <span>${escapeHTML(label)}</span>
            <strong>${escapeHTML(value || "Not provided")}</strong>
        </div>
    `;

    details.innerHTML = `
        <div class="task-detail-heading">
            <div>
                <span class="task-detail-id">TASK #${escapeHTML(task.id)}</span>
                <h3>${escapeHTML(task.title)}</h3>
            </div>
            <span class="status ${getStatusClass(task.status)}">${escapeHTML(task.status)}</span>
        </div>
        <div class="task-detail-grid">
            ${detailRow("Project", task.project)}
            ${detailRow("Assigned developer", task.developer)}
            ${detailRow("Deadline", formatDate(task.deadline))}
            ${detailRow("Priority", task.priority || "Not set")}
            ${detailRow("Start date", task.startDate ? formatDate(task.startDate) : "Not provided")}
            ${detailRow("Created on", task.createdAt ? formatDate(task.createdAt) : "Not recorded")}
        </div>
        <div class="task-detail-description">
            <h4>Task Description</h4>
            <p>${escapeHTML(task.description || "No description provided.")}</p>
        </div>
        ${task.submissionDetails || task.submissionLink ? `
            <div class="task-detail-description">
                <h4>Submission Details</h4>
                <p>${escapeHTML(task.submissionDetails || "No submission notes provided.")}</p>
                ${task.submissionLink ? `<p><a href="${escapeHTML(task.submissionLink)}" target="_blank" rel="noopener noreferrer">Open submitted work</a></p>` : ""}
            </div>
        ` : ""}
        ${task.reviewComment || task.reviewComments ? `
            <div class="task-detail-description">
                <h4>Review Comments</h4>
                <p>${escapeHTML(task.reviewComment || task.reviewComments)}</p>
            </div>
        ` : ""}
    `;

    getElement("taskDetailsModal")?.classList.add("show");
}

// ============================================
// TASK REVIEW WORKFLOW
// ============================================

function reviewTask(taskId) {
    const task = data.tasks.find(item => item.id === taskId);

    if (!task) return;

    selectedReviewTaskId = taskId;

    setText("reviewTaskName", task.title);

    const comment = getElement("reviewComment");
    if (comment) comment.value = "";

    getElement("reviewModal")?.classList.add("show");
}

function submitReview(decision) {
    const task = data.tasks.find(
        item => item.id === selectedReviewTaskId
    );

    if (!task) return;

    const comment = getElement("reviewComment")?.value.trim() || "";

    if (decision === "Revision Required" && !comment) {
        alert("Please enter a comment explaining the required changes.");
        return;
    }

    task.status = decision;

    if (decision === "Approved") {
        addActivity(`Task "${task.title}" approved.`);
    } else {
        addActivity(`Revision requested for "${task.title}".`);
    }

    saveData();
    selectedReviewTaskId = null;
    closeModal();
    renderAll();
}

// ============================================
// TEAM MEMBERS
// ============================================

function renderTeam() {
    const table = getElement("teamTable");
    const dashboardTeam = getElement("dashboardTeam");

    const rows = data.team.map(member => {
        const memberTasks = data.tasks.filter(task => task.developer === member.name);
        const activeTasks = memberTasks.filter(task => task.status !== "Approved").length;
        const approvedTasks = memberTasks.filter(task => task.status === "Approved").length;

        return `
            <tr>
                <td><strong>${escapeHTML(member.name)}</strong><small class="table-subtext">${escapeHTML(member.email)}</small></td>
                <td>${escapeHTML(member.role)}</td>
                <td>${activeTasks}</td>
                <td>${approvedTasks}</td>
                <td><span class="status active">Active</span></td>
            </tr>
        `;
    }).join("");

    if (table) {
        table.innerHTML = rows || `<tr><td colspan="5" class="empty-cell">No team members found.</td></tr>`;
    }

    if (dashboardTeam) {
        dashboardTeam.innerHTML = data.team.length ? data.team.map(member => {
            const activeTasks = data.tasks.filter(task => task.developer === member.name && task.status !== "Approved").length;
            const approvedTasks = data.tasks.filter(task => task.developer === member.name && task.status === "Approved").length;
            const initials = member.name.split(/\s+/).map(part => part[0]).slice(0, 2).join("").toUpperCase();
            return `
                <div class="team-workload-item">
                    <div class="member-avatar">${escapeHTML(initials)}</div>
                    <div class="team-workload-copy">
                        <strong>${escapeHTML(member.name)}</strong>
                        <span>${escapeHTML(member.role)}</span>
                        <small>${activeTasks} active · ${approvedTasks} approved</small>
                    </div>
                </div>
            `;
        }).join("") : `<p class="empty">No team members available.</p>`;
    }

    const developerSelect = getElement("taskDeveloper");
    if (developerSelect) {
        const currentValue = developerSelect.value;
        developerSelect.innerHTML = `
            <option value="">Select Developer</option>
            ${data.team.map(member => `<option value="${escapeHTML(member.name)}">${escapeHTML(member.name)}</option>`).join("")}
        `;
        if (data.team.some(member => member.name === currentValue)) developerSelect.value = currentValue;
    }
}

function openMemberModal() {
    getElement("memberForm")?.reset();
    getElement("memberModal")?.classList.add("show");
}

function addMember(event) {
    event.preventDefault();

    const name = getElement("memberName")?.value.trim();
    const role = getElement("memberRole")?.value;
    const email = getElement("memberEmail")?.value.trim();

    if (!name || !role || !email) {
        alert("Please fill in all team member fields.");
        return;
    }

    const exists = data.team.some(
        member => member.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
        alert("A team member with this email already exists.");
        return;
    }

    data.team.push({
        id: Date.now(),
        name,
        role,
        email
    });

    addActivity(`${name} added to the team.`);
    saveData();
    closeModal();
    renderAll();

    alert("Team member added successfully.");
}

// ============================================
// CLIENT REQUESTS
// ============================================

function renderRequests() {
    const table = getElement("requestTable");
    if (!table) return;

    table.innerHTML = data.requests.length
        ? data.requests.map(request => `
            <tr>
                <td><strong>${escapeHTML(request.title)}</strong></td>
                <td>${escapeHTML(request.client)}</td>
                <td><span class="status ${getStatusClass(request.status)}">${escapeHTML(request.status)}</span></td>
                <td>${formatDate(request.date || request.createdAt)}</td>
                <td class="action-cell">
                    <button class="secondary-btn table-action" onclick="updateRequest(${request.id}, 'Under Review')">Review</button>
                    <button class="primary-btn table-action" onclick="updateRequest(${request.id}, 'Approved')">Approve</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" class="empty-cell">No requests available.</td></tr>`;
}

function updateRequest(requestId, status) {
    const request = data.requests.find(
        item => item.id === requestId
    );

    if (!request) return;

    request.status = status;

    addActivity(`Request "${request.title}" marked as ${status}.`);
    saveData();
    renderAll();
}

// ============================================
// QUOTATIONS
// ============================================

function renderQuotations() {
    const table = getElement("quotationTable");
    if (!table) return;

    table.innerHTML = data.quotations.length
        ? data.quotations.map(quotation => `
            <tr>
                <td><strong>${escapeHTML(quotation.title)}</strong></td>
                <td>${escapeHTML(quotation.client)}</td>
                <td>${formatCurrency(quotation.amount)}</td>
                <td>${formatDate(quotation.submittedDate || quotation.date)}</td>
                <td><span class="status ${getStatusClass(quotation.status)}">${escapeHTML(quotation.status)}</span></td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" class="empty-cell">No quotations available.</td></tr>`;
}

// ============================================
// REPORTS
// ============================================

function renderReports() {
    const total = data.tasks.length;

    const approved = data.tasks.filter(
        task => task.status === "Approved"
    ).length;

    const progress = data.tasks.filter(
        task => task.status === "In Progress"
    ).length;

    const review = data.tasks.filter(
        task => task.status === "Submitted for Review"
    ).length;

    setText("reportTotal", total);
    setText("reportApproved", approved);
    setText("reportProgress", progress);
    setText("reportReview", review);

    const bars = getElement("reportBars");

    if (bars) {
        const statuses = [
            "Assigned",
            "In Progress",
            "Submitted for Review",
            "Revision Required",
            "Approved"
        ];

        bars.innerHTML = statuses.map(status => {
            const count = data.tasks.filter(
                task => task.status === status
            ).length;

            const percentage = total
                ? (count / total) * 100
                : 0;

            return `
                <div class="report-bar-item">
                    <div class="report-bar-label">
                        <span>${escapeHTML(status)}</span>
                        <strong>${count}</strong>
                    </div>

                    <div class="progress-bar">
                        <div class="progress-fill"
                             style="width: ${percentage}%">
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }
}

function exportReport() {
    const rows = [
        ["Task ID", "Task", "Project", "Developer", "Deadline", "Status"],
        ...data.tasks.map(task => [
            task.id,
            task.title,
            task.project,
            task.developer,
            task.deadline,
            task.status
        ])
    ];

    const csv = rows.map(row =>
        row.map(value =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
        ).join(",")
    ).join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "e2e-team-lead-report.csv";
    link.click();

    URL.revokeObjectURL(url);
}

// ============================================
// MESSAGES
// ============================================

function renderMessages() {
    const list = getElement("messageList");
    if (!list) return;

    list.innerHTML = data.messages.map(message => `
        <div class="message-item">
            <strong>${escapeHTML(message.sender)}</strong>
            <p>${escapeHTML(message.text)}</p>
            <small>${escapeHTML(message.time)}</small>
        </div>
    `).join("");
}

function sendMessage() {
    const input = getElement("messageInput");
    if (!input) return;

    const messageText = input.value.trim();

    if (!messageText) {
        alert("Please enter a message.");
        return;
    }

    data.messages.push({
        id: Date.now(),
        sender: "Team Lead",
        text: messageText,
        time: new Date().toLocaleString()
    });

    input.value = "";

    addActivity("A new message was sent.");
    saveData();
    renderMessages();
}

// ============================================
// PROFILE
// ============================================

function saveProfile() {
    const name = getElement("profileName")?.value.trim();
    const email = getElement("profileEmail")?.value.trim();
    const department = getElement("profileDepartment")?.value.trim();

    if (!name || !email || !department) {
        alert("Please complete all profile fields.");
        return;
    }

    const profile = { name, email, department };

    localStorage.setItem(
        `${STORAGE_KEY}_profile`,
        JSON.stringify(profile)
    );

    addActivity("Team Lead profile updated.");
    alert("Profile saved successfully.");
}

function loadProfile() {
    try {
        const profile = JSON.parse(
            localStorage.getItem(`${STORAGE_KEY}_profile`)
        );

        if (!profile) return;

        if (getElement("profileName")) {
            getElement("profileName").value = profile.name || "";
        }

        if (getElement("profileEmail")) {
            getElement("profileEmail").value = profile.email || "";
        }

        if (getElement("profileDepartment")) {
            getElement("profileDepartment").value =
                profile.department || "";
        }
    } catch (error) {
        console.error("Could not load profile:", error);
    }
}

// ============================================
// ACTIVITIES
// ============================================

function renderActivities() {
    const container = getElement("recentActivities");
    if (!container) return;

    container.innerHTML = data.activities.map(activity => `
        <div class="activity-item">
            <p>${escapeHTML(activity)}</p>
        </div>
    `).join("");
}

// ============================================
// MODALS
// ============================================

function closeModal() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("show");
    });
}

function setupModalClosing() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

// ============================================
// SEARCH AND NOTIFICATIONS
// ============================================

function globalSearch() {
    const searchInput = getElement("globalSearch");

    if (!searchInput) {
        alert("Search is not available in this HTML layout.");
        return;
    }

    const query = searchInput.value.trim().toLowerCase();

    if (!query) return;

    const task = data.tasks.find(item =>
        item.title.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.developer.toLowerCase().includes(query)
    );

    const project = data.projects.find(item =>
        item.name.toLowerCase().includes(query) ||
        item.client.toLowerCase().includes(query)
    );

    if (task) {
        showPage("tasks");
        if (getElement("taskSearch")) {
            getElement("taskSearch").value = query;
        }
        renderTasks();
        return;
    }

    if (project) {
        showPage("projects");
        return;
    }

    alert("No matching task or project found.");
}

function showNotifications() {
    const pending = data.tasks.filter(
        task => task.status === "Submitted for Review"
    ).length;

    alert(
        pending
            ? `You have ${pending} task(s) waiting for review.`
            : "You have no pending task reviews."
    );
}

// ============================================
// UPDATE NOTIFICATION RED DOT
// ============================================

function updateNotificationIndicator() {
    const bell = document.getElementById("notificationBell");

    if (!bell) return;

    const pendingReviews = data.tasks.filter(
        task => task.status === "Submitted for Review"
    ).length;

    bell.classList.toggle(
        "has-notifications",
        pendingReviews > 0
    );
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    getElement("taskForm")?.addEventListener("submit", createTask);
    getElement("memberForm")?.addEventListener("submit", addMember);

    getElement("projectForm")?.addEventListener("submit", createProject);

    getElement("taskSearch")?.addEventListener("input", renderTasks);
    getElement("taskFilter")?.addEventListener("change", renderTasks);

    getElement("messageInput")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
}

// ============================================
// CREATE PROJECT
// ============================================

function openProjectModal() {
    getElement("projectForm")?.reset();
    getElement("projectModal")?.classList.add("show");
}

function createProject(event) {
    event.preventDefault();

    const name = getElement("projectName")?.value.trim();
    const client = getElement("projectClient")?.value.trim();
    const deadline = getElement("projectDeadline")?.value;

    if (!name || !client || !deadline) {
        alert("Please complete all project fields.");
        return;
    }

    data.projects.push({
        id: Date.now(),
        name,
        client,
        deadline,
        progress: 0,
        status: "Planning"
    });

    addActivity(`Project "${name}" created.`);
    saveData();
    closeModal();
    renderAll();

    alert("Project created successfully.");
}

// ============================================
// RENDER EVERYTHING
// ============================================

function renderAll() {
    renderStats();
    renderProjects();
    renderTasks();
    renderTeam();
    renderRequests();
    renderQuotations();
    renderReports();
    renderMessages();
    renderActivities();
    updateNotificationIndicator();
}

// ============================================
// HELP & SUPPORT
// ============================================

function showHelpSupport() {
    alert(
        "E2E Help & Support\n\n" +
        "For assistance with the Team Lead Dashboard:\n\n" +
        "1. Project Management - Contact your Project Manager.\n" +
        "2. Task Assignment - Contact your Administrator.\n" +
        "3. Technical Issues - Contact the IT Support Team.\n\n" +
        "Support Email: support@e2e.com"
    );
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupEventListeners();
    setupModalClosing();
    loadProfile();
    renderAll();

    // Open dashboard by default
    showPage("dashboard");
});