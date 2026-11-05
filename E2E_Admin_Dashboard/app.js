const KEY = "e2e_admin_demo_v1";
const seed = () => ({
  users: [
    ["USR-001", "Priya Nair", "priya@e2e.com", "Admin"],
    ["USR-002", "Rahul Sharma", "rahul@acmecorp.com", "Client"],
    ["USR-003", "Arjun Mehta", "arjun@e2e.com", "Manager"],
    ["USR-004", "Sneha Reddy", "sneha@e2e.com", "Team Lead"],
    ["USR-005", "Karthik S", "karthik@e2e.com", "Developer"],
  ].map(([id, name, email, role], i) => ({
    id,
    name,
    email,
    role,
    status: "Active",
    created: `2026-0${i + 1}-12`,
  })),
  services: [
    [
      "SRV-001",
      "Business Website",
      35000,
      14,
      "Responsive business website",
      "Responsive design, CMS, contact form",
    ],
    [
      "SRV-002",
      "E-commerce Store",
      85000,
      30,
      "Online store with catalogue and checkout",
      "Products, cart, checkout",
    ],
    [
      "SRV-003",
      "Web Application",
      150000,
      45,
      "Custom business workflow application",
      "Authentication, dashboard, APIs",
    ],
    [
      "SRV-004",
      "Landing Page",
      12000,
      7,
      "Campaign or product landing page",
      "Responsive layout, lead form",
    ],
    [
      "SRV-005",
      "Maintenance and Support",
      8000,
      30,
      "Ongoing website maintenance",
      "Updates, monitoring, support",
    ],
  ].map((a) => ({
    id: a[0],
    name: a[1],
    price: a[2],
    days: a[3],
    description: a[4],
    features: a[5],
    active: true,
  })),
  requests: [
    [
      "REQ-001",
      "Acme Corp",
      "Business Website",
      "In Development",
      "2026-04-12",
      "Arjun Mehta",
      "Corporate website with service pages",
    ],
    [
      "REQ-002",
      "Bright Solutions",
      "E-commerce Store",
      "Quoted",
      "2026-04-10",
      "Arjun Mehta",
      "Online store for lifestyle products",
    ],
    [
      "REQ-003",
      "TechVista",
      "Web Application",
      "Under Review",
      "2026-04-08",
      "Unassigned",
      "Internal workflow application",
    ],
    [
      "REQ-004",
      "Sunrise Ltd",
      "Landing Page",
      "Submitted",
      "2026-04-06",
      "Unassigned",
      "Campaign landing page",
    ],
    [
      "REQ-005",
      "Global Media",
      "Maintenance and Support",
      "Paid",
      "2026-04-04",
      "Arjun Mehta",
      "Monthly website maintenance",
    ],
  ].map((a) => ({
    id: a[0],
    client: a[1],
    service: a[2],
    status: a[3],
    date: a[4],
    manager: a[5],
    details: a[6],
    features: "Requirements and project features",
  })),
  quotations: [
    {
      id: "QUO-001",
      request: "REQ-002",
      client: "Bright Solutions",
      service: "E-commerce Store",
      subtotal: 85000,
      gst: 15300,
      total: 100300,
      status: "Sent",
      validity: "7 days",
      revisions: 1,
      date: "2026-04-11",
    },
    {
      id: "QUO-002",
      request: "REQ-001",
      client: "Acme Corp",
      service: "Business Website",
      subtotal: 35000,
      gst: 6300,
      total: 41300,
      status: "Accepted",
      validity: "7 days",
      revisions: 0,
      date: "2026-04-09",
    },
  ],
  projects: [
    [
      "PRJ-001",
      "Business Website",
      "Acme Corp",
      "Arjun Mehta",
      "Sneha Reddy",
      "Karthik S",
      60,
      "In Development",
    ],
    [
      "PRJ-002",
      "E-commerce Store",
      "Bright Solutions",
      "Arjun Mehta",
      "Sneha Reddy",
      "Karthik S",
      35,
      "In Development",
    ],
    [
      "PRJ-003",
      "Web Application",
      "TechVista",
      "Arjun Mehta",
      "Unassigned",
      "Unassigned",
      10,
      "Planning",
    ],
    [
      "PRJ-004",
      "Landing Page",
      "Sunrise Ltd",
      "Arjun Mehta",
      "Sneha Reddy",
      "Karthik S",
      80,
      "Ready for Review",
    ],
  ].map((a) => ({
    id: a[0],
    name: a[1],
    client: a[2],
    manager: a[3],
    lead: a[4],
    developers: a[5],
    progress: a[6],
    status: a[7],
    due: "2026-12-15",
  })),
  payments: [
    {
      id: "PAY-001",
      client: "Acme Corp",
      project: "Business Website",
      amount: 41300,
      date: "2026-04-13",
      reference: "DEMO-PAY-1001",
      status: "Verified",
    },
    {
      id: "PAY-002",
      client: "Bright Solutions",
      project: "E-commerce Store",
      amount: 50150,
      date: "2026-04-12",
      reference: "DEMO-PAY-1002",
      status: "Pending",
    },
    {
      id: "PAY-003",
      client: "Global Media",
      project: "Maintenance",
      amount: 9440,
      date: "2026-04-05",
      reference: "DEMO-PAY-1003",
      status: "Verified",
    },
  ],
  invoices: [
    {
      id: "INV-001",
      client: "Acme Corp",
      project: "Business Website",
      amount: 41300,
      date: "2026-04-13",
      status: "Issued",
    },
    {
      id: "INV-002",
      client: "Bright Solutions",
      project: "E-commerce Store",
      amount: 50150,
      date: "2026-04-12",
      status: "Pending",
    },
    {
      id: "INV-003",
      client: "Global Media",
      project: "Maintenance",
      amount: 9440,
      date: "2026-04-05",
      status: "Paid",
    },
  ],
  activity: [
    ["◈", "Quotation ready for review", "QUO-001 · E-commerce Store", "2 hours ago"],
    ["₹", "Payment received", "PAY-001 · Business Website", "Yesterday"],
    ["▤", "New request submitted", "REQ-005 · Maintenance", "2 days ago"],
    ["▣", "Project status updated", "PRJ-001 · Business Website", "3 days ago"],
  ],
  settings: {
    company: "E2E",
    email: "support@e2e.com",
    gst: 18,
    notifications: true,
    weekly: false,
  },
});
let db;
try {
  db = JSON.parse(localStorage.getItem(KEY)) || seed();
} catch {
  db = seed();
}
const save = () => localStorage.setItem(KEY, JSON.stringify(db));
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
const cash = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
const id = (p, a) =>
  p +
  "-" +
  String(Math.max(0, ...a.map((x) => +(x.id.match(/\d+/) || [0])[0])) + 1).padStart(3, "0");
const cls = (s) =>
  ({
    Active: "green",
    Verified: "green",
    Paid: "green",
    Accepted: "green",
    "In Development": "blue",
    Quoted: "orange",
    Pending: "orange",
    Submitted: "gray",
    "Under Review": "blue",
    "Ready for Review": "orange",
    Planning: "gray",
    Sent: "blue",
    Rejected: "red",
    Inactive: "gray",
    Disabled: "gray",
  })[s] || "gray";
const badge = (s) => `<span class="badge ${cls(s)}">${esc(s)}</span>`;
let page = "dashboard",
  modalType = "",
  editing = null,
  filters = {};
const titles = {
  dashboard: [
    "Dashboard overview",
    "Welcome back, Priya. Here's what's happening across your platform.",
  ],
  users: ["Users & Roles", "Manage platform accounts and role assignments."],
  services: ["Services", "Configure the services your company offers."],
  requests: ["Requests", "Review client requirements and route approved requests."],
  quotations: ["Quotations", "Prepare and track client quotations."],
  projects: ["Projects", "Monitor project ownership, delivery, and progress."],
  payments: ["Payments", "Review payment records and verification references."],
  invoices: ["Invoices", "Manage invoice records and demo receipts."],
  reports: ["Reports & Analytics", "Understand platform activity and delivery performance."],
  settings: ["Settings", "Manage workspace preferences and company information."],
};
function toast(s) {
  let e = document.createElement("div");
  e.className = "toast";
  e.textContent = s;
  $("#toasts").append(e);
  setTimeout(() => e.remove(), 2600);
}
function go(p) {
  page = p;
  document
    .querySelectorAll("#nav button")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === p));
  $("#title").textContent = titles[p][0];
  $("#subtitle").textContent = titles[p][1];
  $("#primary").textContent = {
    dashboard: "＋ New user",
    users: "＋ Add user",
    services: "＋ Add service",
    requests: "＋ New request",
    quotations: "＋ Create quotation",
    projects: "＋ New project",
    payments: "＋ Record payment",
    invoices: "＋ Create invoice",
    reports: "↓ Export report",
    settings: "Save settings",
  }[p];
  $("#sidebar").classList.remove("open");
  render();
}
$("#nav").onclick = (e) => {
  let b = e.target.closest("[data-page]");
  if (b) go(b.dataset.page);
};
$("#menu").onclick = () => $("#sidebar").classList.toggle("open");
$("#today").textContent = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
$("#support").onclick = () => toast("Contact support: support@e2e.com");
$("#notify").onclick = () => toast("You are all caught up.");
$("#profile").onclick = () => $("#profileMenu").classList.toggle("hidden");
$("#reset").onclick = () => {
  if (confirm("Reset all demo records?")) {
    db = seed();
    save();
    $("#profileMenu").classList.add("hidden");
    go("dashboard");
    toast("Demo data reset.");
  }
};
document.addEventListener("click", (e) => {
  if (!e.target.closest("#profile") && !e.target.closest("#profileMenu"))
    $("#profileMenu").classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    $("#profileMenu").classList.add("hidden");
    $("#sidebar").classList.remove("open");
  }
});
$("#primary").onclick = () => {
  const actions = {
    dashboard: () => openForm("Add user", "users"),
    users: () => openForm("Add user", "users"),
    services: () => openForm("Add service", "services"),
    requests: () => openForm("Create client request", "requests"),
    quotations: () => openForm("Create quotation", "quotations"),
    projects: () => openForm("Create project", "projects"),
    payments: () => openForm("Record payment", "payments"),
    invoices: () => openForm("Create invoice", "invoices"),
    reports: csv,
    settings: saveSettings,
  };
  (actions[page] || (() => {}))();
};
$("#globalSearch").oninput = (e) => {
  let q = e.target.value.toLowerCase();
  if (!q) return;
  let match = [
    ["users", db.users],
    ["requests", db.requests],
    ["projects", db.projects],
    ["services", db.services],
    ["quotations", db.quotations],
    ["payments", db.payments],
    ["invoices", db.invoices],
  ].find(([p, a]) => a.some((x) => JSON.stringify(x).toLowerCase().includes(q)));
  if (match && page !== match[0]) go(match[0]);
  else render();
};
function stat(icon, value, label, trend) {
  return `<article class="stat"><span class="stat-icon">${icon}</span><strong>${value}</strong><small>${label}</small><span class="trend">${trend}</span></article>`;
}
function table(head, rows) {
  return `<div class="table-wrap"><table><thead><tr>${head.map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows || ""}</tbody></table></div>`;
}
function requestRows(a) {
  return a
    .map(
      (r) =>
        `<tr><td class="bold">${r.id}</td><td>${esc(r.client)}</td><td>${esc(r.service)}</td><td>${badge(r.status)}</td><td>${r.date}</td><td><button class="action" data-act="request" data-id="${r.id}">View</button></td></tr>`,
    )
    .join("");
}
function dashboard() {
  let rev = db.payments.filter((x) => x.status === "Verified").reduce((s, x) => s + x.amount, 0),
    active = db.projects.filter((x) => x.status !== "Completed").length;
  return `<div class="stats">${stat("♙", db.users.length, "Total Users", "↑ 2 this week")}${stat("▤", db.requests.length, "Total Requests", "↑ 3 this week")}${stat("◈", active, "Active Projects", "↑ 1 this week")}${stat("₹", cash(rev), "Total Revenue", "Verified demo payments")}</div><div class="grid"><section class="panel"><div class="panel-head"><div><h3>Recent Requests</h3><small>Latest activity from your clients</small></div><button class="link" data-go="requests">View all →</button></div>${table(["REQUEST ID", "CLIENT", "SERVICE", "STATUS", "CREATED ON", ""], requestRows(db.requests.slice(0, 5)))}</section><section class="panel"><div class="panel-head"><div><h3>Platform Overview</h3><small>Requests by status</small></div></div><div class="chart">${["Submit", "Review", "Quoted", "Paid", "Dev.", "Review", "Done"].map((x, i) => `<div class="bar-group"><div class="bar ${i === 2 ? "orange" : i === 4 ? "green" : ""}" style="height:${[28, 45, 24, 60, 78, 42, 90][i]}%"></div><small>${x}</small></div>`).join("")}</div></section></div><div class="grid"><section class="panel"><div class="panel-head"><h3>Recent Activity</h3><button class="link" data-go="reports">View report →</button></div><div class="activity">${db.activity.map((a) => `<div class="activity-row"><span class="activity-icon">${a[0]}</span><div><b>${esc(a[1])}</b><p>${esc(a[2])} · ${a[3]}</p></div></div>`).join("")}</div></section><section class="panel"><div class="panel-head"><h3>Role Distribution</h3></div><div class="stats">${["Client", "Admin", "Manager", "Team Lead", "Developer"].map((r) => `<div class="stat"><strong>${db.users.filter((u) => u.role === r).length}</strong><small>${r}</small></div>`).join("")}</div></section></div>`;
}
function users() {
  let a = db.users.filter(
    (u) =>
      (!filters.q || JSON.stringify(u).toLowerCase().includes(filters.q)) &&
      (!filters.role || filters.role === "All roles" || u.role === filters.role),
  );
  return `<section class="table-panel"><div class="panel-head"><div><h3>All users</h3><small>${a.length} accounts in the platform</small></div></div><div class="toolbar"><input id="searchTable" placeholder="Search name, email or ID" value="${esc(filters.q || "")}"><select id="roleFilter"><option>All roles</option>${["Client", "Admin", "Manager", "Team Lead", "Developer"].map((r) => `<option ${filters.role === r ? "selected" : ""}>${r}</option>`).join("")}</select></div>${table(["USER ID", "NAME", "EMAIL", "ROLE", "ACCOUNT STATUS", "CREATED", "ACTIONS"], a.map((u) => `<tr><td class="bold">${u.id}</td><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${u.role}</td><td>${badge(u.status)}</td><td>${u.created}</td><td><button class="action" data-act="edit-user" data-id="${u.id}">Edit</button><button class="action danger" data-act="toggle-user" data-id="${u.id}">${u.status === "Active" ? "Disable" : "Enable"}</button></td></tr>`).join(""))}</section><section class="panel" style="margin-top:14px"><div class="panel-head"><h3>Role permissions overview</h3></div><div class="roles">${[
    ["Admin", "Platform and account configuration", "Full platform access"],
    ["Manager", "Requests, quotations and projects", "Business operations"],
    ["Team Lead", "Projects, tasks and reviews", "Team operations"],
    ["Developer", "Assigned tasks and submissions", "Assigned work only"],
    ["Client", "Own requests and deliverables", "Own account only"],
  ]
    .map((x) => `<div class="role"><b>${x[0]}</b><p>${x[1]}</p><small>${x[2]}</small></div>`)
    .join(
      "",
    )}</div><div class="notice">This is a frontend demo. Enforce role permissions on the server in production; localStorage is not a security boundary.</div></section>`;
}
function services() {
  return `<div class="service-grid">${db.services.map((s) => `<article class="service"><span class="stat-icon">◇</span><h3>${esc(s.name)}　${badge(s.active ? "Active" : "Disabled")}</h3><p>${esc(s.description)}</p><div class="price">${cash(s.price)}</div><p>Estimated ${s.days} days · ${esc(s.features)}</p><button class="action" data-act="edit-service" data-id="${s.id}">Edit</button><button class="action danger" data-act="toggle-service" data-id="${s.id}">${s.active ? "Disable" : "Enable"}</button></article>`).join("")}</div><div class="notice">Quotation previews calculate ${db.settings.gst}% GST. Changes are stored in this browser only.</div>`;
}
function requests() {
  let a = db.requests.filter(
    (r) =>
      (!filters.q || JSON.stringify(r).toLowerCase().includes(filters.q)) &&
      (!filters.status || filters.status === "All statuses" || r.status === filters.status),
  );
  return `<section class="table-panel"><div class="panel-head"><h3>Client requests</h3></div><div class="toolbar"><input id="searchTable" placeholder="Search request, client or service" value="${esc(filters.q || "")}"><select id="statusFilter"><option>All statuses</option>${["Submitted", "Under Review", "Quoted", "Paid", "In Development", "Rejected"].map((s) => `<option ${filters.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>${table(["REQUEST ID", "CLIENT", "SERVICE", "STATUS", "SUBMITTED", "MANAGER", "ACTIONS"], a.map((r) => `<tr><td class="bold">${r.id}</td><td>${esc(r.client)}</td><td>${esc(r.service)}</td><td>${badge(r.status)}</td><td>${r.date}</td><td>${esc(r.manager)}</td><td><button class="action" data-act="review-request" data-id="${r.id}">Review</button></td></tr>`).join(""))}</section>`;
}
function quotations() {
  return `<section class="table-panel"><div class="panel-head"><div><h3>Quotation register</h3><small>GST calculated at ${db.settings.gst}%</small></div></div>${table(["QUOTATION", "REQUEST", "CLIENT", "SUBTOTAL", "GST", "TOTAL", "STATUS", "ACTIONS"], db.quotations.map((q) => `<tr><td class="bold">${q.id}</td><td>${q.request}</td><td>${esc(q.client)}</td><td>${cash(q.subtotal)}</td><td>${cash(q.gst)}</td><td class="bold">${cash(q.total)}</td><td>${badge(q.status)}</td><td><button class="action" data-act="edit-quotation" data-id="${q.id}">Edit</button></td></tr>`).join(""))}<div class="notice">Quotation acceptance must be explicitly recorded by an authorized workflow action. No real emails or agreements are created.</div></section>`;
}
function projects() {
  return `<section class="table-panel"><div class="panel-head"><h3>All projects</h3></div><div class="toolbar"><input id="searchTable" placeholder="Search project or client" value="${esc(filters.q || "")}"><select id="statusFilter"><option>All statuses</option>${["Planning", "In Development", "Ready for Review", "Completed", "On Hold"].map((s) => `<option ${filters.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>${table(
    [
      "PROJECT",
      "CLIENT",
      "MANAGER",
      "TEAM LEAD",
      "DEVELOPERS",
      "PROGRESS",
      "DUE DATE",
      "STATUS",
      "ACTIONS",
    ],
    db.projects
      .filter(
        (p) =>
          (!filters.q || JSON.stringify(p).toLowerCase().includes(filters.q)) &&
          (!filters.status || filters.status === "All statuses" || p.status === filters.status),
      )
      .map(
        (p) =>
          `<tr><td class="bold">${esc(p.name)}<br><small>${p.id}</small></td><td>${esc(p.client)}</td><td>${esc(p.manager)}</td><td>${esc(p.lead)}</td><td>${esc(p.developers)}</td><td><div class="progress"><span style="width:${p.progress}%"></span></div>${p.progress}%</td><td>${p.due}</td><td>${badge(p.status)}</td><td><button class="action" data-act="edit-project" data-id="${p.id}">Manage</button></td></tr>`,
      )
      .join(""),
  )}</section>`;
}
function payments() {
  return `<section class="table-panel"><div class="panel-head"><h3>Payment records</h3></div>${table(["PAYMENT ID", "CLIENT", "PROJECT", "AMOUNT", "DATE", "REFERENCE", "VERIFICATION"], db.payments.map((p) => `<tr><td class="bold">${p.id}</td><td>${esc(p.client)}</td><td>${esc(p.project)}</td><td>${cash(p.amount)}</td><td>${p.date}</td><td>${esc(p.reference)}</td><td>${badge(p.status)}</td></tr>`).join(""))}<div class="notice">Payment statuses are sample data. Real payments must be verified server-side through a trusted payment provider callback or API.</div></section>`;
}
function invoices() {
  return `<section class="table-panel"><div class="panel-head"><h3>Invoice register</h3></div>${table(["INVOICE ID", "CLIENT", "PROJECT", "AMOUNT", "ISSUED DATE", "STATUS", "ACTIONS"], db.invoices.map((i) => `<tr><td class="bold">${i.id}</td><td>${esc(i.client)}</td><td>${esc(i.project)}</td><td>${cash(i.amount)}</td><td>${i.date}</td><td>${badge(i.status)}</td><td><button class="action" data-act="download-invoice" data-id="${i.id}">Download</button></td></tr>`).join(""))}<div class="notice">Downloads are sample receipts, not legally valid tax invoices.</div></section>`;
}
function reports() {
  let rev = db.payments.filter((p) => p.status === "Verified").reduce((s, p) => s + p.amount, 0);
  return `<div class="stats">${stat("▤", db.requests.length, "Total Requests", "All recorded requests")}${stat("₹", cash(rev), "Verified Demo Revenue", "Sample records only")}${stat("▣", db.projects.length, "Total Projects", "Across all clients")}${stat("♙", db.users.length, "Platform Users", "All roles")}</div><div class="report-grid">${[
    [
      "Requests by status",
      ["Submitted", "Under Review", "Quoted", "Paid", "In Development"],
      (s) => db.requests.filter((r) => r.status === s).length,
    ],
    [
      "Projects by status",
      ["Planning", "In Development", "Ready for Review", "Completed"],
      (s) => db.projects.filter((p) => p.status === s).length,
    ],
  ]
    .map(
      ([title, labels, fn]) =>
        `<section class="panel"><div class="panel-head"><h3>${title}</h3></div><div class="chart">${labels.map((s, i) => `<div class="bar-group"><div class="bar ${i === 2 ? "orange" : ""}" style="height:${Math.max(5, fn(s) * 25)}%"></div><small>${s}</small></div>`).join("")}</div></section>`,
    )
    .join(
      "",
    )}<section class="panel"><div class="panel-head"><h3>Service popularity</h3></div>${db.services.map((s) => `<p>${esc(s.name)} · ${db.requests.filter((r) => r.service === s.name).length} requests</p>`).join("")}</section><section class="panel"><div class="panel-head"><h3>User activity</h3></div><div class="stats">${["Active", "Inactive"].map((s) => `<div class="stat"><strong>${db.users.filter((u) => u.status === s).length}</strong><small>${s} accounts</small></div>`).join("")}</div></section></div>`;
}
function settings() {
  return `<div class="settings-grid"><section class="panel"><div class="panel-head"><h3>Company profile</h3></div><div class="field"><label>Company name</label><input id="company" value="${esc(db.settings.company)}"></div><div class="field"><label>Support email</label><input id="email" type="email" value="${esc(db.settings.email)}"></div><div class="field"><label>GST rate (%)</label><input id="gst" type="number" min="0" max="100" value="${db.settings.gst}"></div><button class="primary" id="saveSettings">Save company settings</button></section><section class="panel"><div class="panel-head"><h3>Workspace preferences</h3></div><div class="setting-row"><span>Email notifications<small>Preference only; no email is sent</small></span><input id="notifications" type="checkbox" class="toggle" ${db.settings.notifications ? "checked" : ""}></div><div class="setting-row"><span>Weekly reports<small>No scheduled report is sent</small></span><input id="weekly" type="checkbox" class="toggle" ${db.settings.weekly ? "checked" : ""}></div><div class="notice">Authentication, email delivery, audit logs, and shared settings require a backend. These preferences are saved locally.</div></section></div>`;
}
function render() {
  let fn = {
    dashboard,
    users,
    services,
    requests,
    quotations,
    projects,
    payments,
    invoices,
    reports,
    settings,
  };
  $("#view").innerHTML = fn[page]();
  $("#view")
    .querySelectorAll("[data-go]")
    .forEach((b) => (b.onclick = () => go(b.dataset.go)));
  $("#view")
    .querySelectorAll("[data-act]")
    .forEach((b) => (b.onclick = () => action(b.dataset.act, b.dataset.id)));
  let si = $("#searchTable");
  if (si)
    si.oninput = () => {
      filters.q = si.value.toLowerCase();
      let pos = si.selectionStart;
      render();
      $("#searchTable").focus();
      $("#searchTable").setSelectionRange(pos, pos);
    };
  let rf = $("#roleFilter");
  if (rf)
    rf.onchange = () => {
      filters.role = rf.value;
      render();
    };
  let sf = $("#statusFilter");
  if (sf)
    sf.onchange = () => {
      filters.status = sf.value;
      render();
    };
  let saveBtn = $("#saveSettings");
  if (saveBtn) saveBtn.onclick = saveSettings;
}
function action(a, idv) {
  let arr, key;
  switch (a) {
    case "toggle-user": {
      let u = db.users.find((x) => x.id === idv);
      u.status = u.status === "Active" ? "Inactive" : "Active";
      break;
    }
    case "toggle-service": {
      let s = db.services.find((x) => x.id === idv);
      s.active = !s.active;
      break;
    }
    case "edit-user":
      openForm(
        "Edit user",
        "users",
        db.users.find((x) => x.id === idv),
      );
      return;
    case "edit-service":
      openForm(
        "Edit service",
        "services",
        db.services.find((x) => x.id === idv),
      );
      return;
    case "review-request":
    case "request":
      openForm(
        "Review request",
        "requestReview",
        db.requests.find((x) => x.id === idv),
        a === "request",
      );
      return;
    case "edit-quotation":
      openForm(
        "Edit quotation",
        "quotations",
        db.quotations.find((x) => x.id === idv),
      );
      return;
    case "edit-project":
      openForm(
        "Manage project",
        "projects",
        db.projects.find((x) => x.id === idv),
      );
      return;
    case "download-invoice": {
      let i = db.invoices.find((x) => x.id === idv);
      download(
        `${i.id}-demo-receipt.txt`,
        `E2E DEMO RECEIPT\nNOT A LEGAL TAX INVOICE\nInvoice: ${i.id}\nClient: ${i.client}\nProject: ${i.project}\nAmount: ${cash(i.amount)}\nDate: ${i.date}\nStatus: ${i.status}`,
      );
      toast("Demo receipt downloaded.");
      return;
    }
  }
  save();
  render();
  toast("Record updated in local demo data.");
}
function field(name, label, type = "text", value = "", opts = null, full = false) {
  let input = opts
    ? `<select name="${name}">${opts.map((o) => `<option ${o === value ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`
    : type === "textarea"
      ? `<textarea name="${name}">${esc(value)}</textarea>`
      : `<input name="${name}" type="${type}" value="${esc(value)}" ${type === "number" ? 'min="0"' : ""} required>`;
  return `<div class="field ${full ? "full" : ""}"><label>${label}</label>${input}</div>`;
}
function openForm(title, type, rec = null, readonly = false) {
  modalType = type;
  editing = rec;
  $("#modalTitle").textContent = title;
  let f = "";
  if (type === "users")
    f =
      field("name", "Full name", "text", rec?.name) +
      field("email", "Email", "email", rec?.email) +
      field("role", "Role", "text", rec?.role || "Client", [
        "Client",
        "Admin",
        "Manager",
        "Team Lead",
        "Developer",
      ]) +
      field("status", "Account status", "text", rec?.status || "Active", ["Active", "Inactive"]);
  if (type === "services")
    f =
      field("name", "Service name", "text", rec?.name) +
      field("price", "Base price (₹)", "number", rec?.price) +
      field("days", "Estimated delivery (days)", "number", rec?.days) +
      field(
        "active",
        "Availability",
        "text",
        rec ? (rec.active ? "Enabled" : "Disabled") : "Enabled",
        ["Enabled", "Disabled"],
      ) +
      field("description", "Description", "textarea", rec?.description, null, true) +
      field("features", "Features", "textarea", rec?.features, null, true);
  if (type === "requests")
    f =
      field("client", "Client name", "text") +
      field(
        "service",
        "Service",
        "text",
        db.services[0].name,
        db.services.map((s) => s.name),
      ) +
      field("date", "Submission date", "date", new Date().toISOString().slice(0, 10)) +
      field("details", "Project details", "textarea", "", null, true) +
      field("features", "Required features", "textarea", "", null, true);
  if (type === "requestReview")
    f =
      field("id", "Request ID", "text", rec.id) +
      field("client", "Client", "text", rec.client) +
      field("service", "Service", "text", rec.service) +
      field("status", "Decision / status", "text", rec.status, [
        "Submitted",
        "Under Review",
        "Quoted",
        "Paid",
        "In Development",
        "Rejected",
      ]) +
      field("manager", "Assign Manager", "text", rec.manager, [
        "Unassigned",
        ...db.users.filter((u) => u.role === "Manager").map((u) => u.name),
      ]) +
      field("notes", "Internal notes / rejection reason", "textarea", "", null, true);
  if (type === "quotations")
    f =
      field(
        "request",
        "Request ID",
        "text",
        rec?.request || db.requests[0].id,
        db.requests.map((r) => r.id),
      ) +
      field("client", "Client", "text", rec?.client || db.requests[0].client) +
      field(
        "service",
        "Service",
        "text",
        rec?.service || db.services[0].name,
        db.services.map((s) => s.name),
      ) +
      field("subtotal", "Subtotal (₹)", "number", rec?.subtotal || db.services[0].price) +
      field("status", "Status", "text", rec?.status || "Draft", [
        "Draft",
        "Pending Approval",
        "Sent",
        "Accepted",
        "Rejected",
        "Expired",
      ]) +
      field("validity", "Validity", "text", rec?.validity || "7 days") +
      field("revisions", "Revision count", "number", rec?.revisions || 0);
  if (type === "projects")
    f =
      field("name", "Project name", "text", rec?.name) +
      field("client", "Client", "text", rec?.client) +
      field("manager", "Manager", "text", rec?.manager || "Unassigned", [
        "Unassigned",
        ...db.users.filter((u) => u.role === "Manager").map((u) => u.name),
      ]) +
      field("lead", "Team Lead", "text", rec?.lead || "Unassigned", [
        "Unassigned",
        ...db.users.filter((u) => u.role === "Team Lead").map((u) => u.name),
      ]) +
      field("developers", "Developers", "text", rec?.developers || "Unassigned") +
      field("progress", "Progress (%)", "number", rec?.progress || 0) +
      field("status", "Project status", "text", rec?.status || "Planning", [
        "Planning",
        "In Development",
        "Ready for Review",
        "Completed",
        "On Hold",
      ]) +
      field("due", "Due date", "date", rec?.due || "2026-12-15");
  if (type === "payments")
    f =
      field("client", "Client", "text") +
      field("project", "Project", "text") +
      field("amount", "Amount (₹)", "number") +
      field("reference", "Payment reference", "text", "DEMO-" + Date.now()) +
      field("status", "Verification status", "text", "Pending", ["Pending", "Verified", "Failed"]) +
      `<div class="notice full">Demo entry only. A browser form cannot verify a real payment.</div>`;
  if (type === "invoices")
    f =
      field("client", "Client", "text") +
      field("project", "Project", "text") +
      field("amount", "Amount (₹)", "number") +
      field("date", "Issue date", "date", new Date().toISOString().slice(0, 10)) +
      field("status", "Invoice status", "text", "Issued", ["Issued", "Pending", "Paid"]);
  $("#fields").innerHTML = f;
  $("#form")
    .querySelectorAll("input,select,textarea")
    .forEach((x) => (x.disabled = readonly));
  $("#modal").classList.remove("hidden");
  $("#form button[type=submit]").classList.toggle("hidden", readonly);
}
function closeModal() {
  $("#modal").classList.add("hidden");
  modalType = "";
  editing = null;
}
$("#close").onclick = closeModal;
$("#cancel").onclick = closeModal;
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") closeModal();
};
$("#form").onsubmit = (e) => {
  e.preventDefault();
  let o = Object.fromEntries(new FormData(e.target));
  let r = editing;
  if (modalType === "users") {
    if (r) Object.assign(r, o);
    else
      db.users.push({
        id: id("USR", db.users),
        ...o,
        created: new Date().toISOString().slice(0, 10),
      });
  }
  if (modalType === "services") {
    let x = { ...o, price: +o.price, days: +o.days, active: o.active === "Enabled" };
    if (r) Object.assign(r, x);
    else db.services.push({ id: id("SRV", db.services), ...x });
  }
  if (modalType === "requests")
    db.requests.unshift({
      id: id("REQ", db.requests),
      client: o.client,
      service: o.service,
      date: o.date,
      details: o.details,
      features: o.features,
      status: "Submitted",
      manager: "Unassigned",
    });
  if (modalType === "requestReview")
    Object.assign(r, { status: o.status, manager: o.manager, notes: o.notes });
  if (modalType === "quotations") {
    let sub = +o.subtotal,
      gst = Math.round((sub * db.settings.gst) / 100),
      x = { ...o, subtotal: sub, gst, total: sub + gst, revisions: +o.revisions };
    if (r) Object.assign(r, x);
    else
      db.quotations.push({
        id: id("QUO", db.quotations),
        ...x,
        date: new Date().toISOString().slice(0, 10),
      });
  }
  if (modalType === "projects") {
    let x = { ...o, progress: +o.progress };
    if (r) Object.assign(r, x);
    else db.projects.push({ id: id("PRJ", db.projects), ...x });
  }
  if (modalType === "payments")
    db.payments.push({
      id: id("PAY", db.payments),
      ...o,
      amount: +o.amount,
      date: new Date().toISOString().slice(0, 10),
    });
  if (modalType === "invoices")
    db.invoices.push({ id: id("INV", db.invoices), ...o, amount: +o.amount });
  save();
  closeModal();
  render();
  toast("Saved to local demo data.");
};
function saveSettings() {
  db.settings.company = $("#company")?.value || db.settings.company;
  db.settings.email = $("#email")?.value || db.settings.email;
  db.settings.gst = Number($("#gst")?.value ?? db.settings.gst);
  db.settings.notifications = $("#notifications")?.checked ?? db.settings.notifications;
  db.settings.weekly = $("#weekly")?.checked ?? db.settings.weekly;
  save();
  render();
  toast("Settings saved locally.");
}
function download(name, text) {
  let u = URL.createObjectURL(new Blob([text], { type: "text/plain" })),
    a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  URL.revokeObjectURL(u);
}
function csv() {
  let rows = db.requests,
    keys = Object.keys(rows[0] || {});
  download(
    "e2e-requests-report.csv",
    [
      keys.join(","),
      ...rows.map((r) =>
        keys.map((k) => '"' + String(r[k] ?? "").replaceAll('"', '""') + '"').join(","),
      ),
    ].join("\n"),
  );
  toast("CSV report exported.");
}
go("dashboard");