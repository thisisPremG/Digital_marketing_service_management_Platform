/* E2E Client Portal — front-end demonstration only. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const today = new Date();
const dateText = (offset = 0) => { const d = new Date(today); d.setDate(d.getDate() + offset); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
const services = [
    { name: 'Business Website', price: 35000 }, { name: 'E-commerce Store', price: 85000 },
    { name: 'Web Application', price: 150000 }, { name: 'Landing Page', price: 12000 },
    { name: 'Maintenance and Support', price: 8000 }
];
const seed = {
    requests: [
        { id: 'REQ-003', service: 'Web Application', project: 'Client management app', status: 'In Development', created: dateText(-8), due: dateText(24), progress: 60, description: 'A web application to organize client workflows.', features: 'Client profiles, reports, role-based access', timeline: '8–10 weeks', overdue: false },
        { id: 'REQ-002', service: 'E-commerce Store', project: 'Everyday Goods Store', status: 'Quoted', created: dateText(-5), due: dateText(30), progress: 20, description: 'An online store for everyday products.', features: 'Product catalogue, cart, checkout', timeline: '6–8 weeks', overdue: false },
        { id: 'REQ-001', service: 'Business Website', project: 'Northstar Consulting Website', status: 'Submitted', created: dateText(-2), due: dateText(38), progress: 10, description: 'A modern website for a consulting company.', features: 'Services, about, contact form', timeline: '4–5 weeks', overdue: false }
    ],
    quotations: [
        { id: 'QUO-002', request: 'REQ-002', service: 'E-commerce Store', subtotal: 85000, valid: dateText(10), status: 'Pending', description: 'Responsive online store with product management and checkout flow.' },
        { id: 'QUO-001', request: 'REQ-001', service: 'Business Website', subtotal: 35000, valid: dateText(5), status: 'Accepted', description: 'Professional responsive business website.' }
    ],
    payments: [
        { id: 'PAY-003', request: 'REQ-002', amount: 10030, method: '—', status: 'Pending', date: '—' },
        { id: 'PAY-002', request: 'REQ-001', amount: 20650, method: 'UPI', status: 'Success', date: dateText(-4) },
        { id: 'PAY-001', request: 'REQ-001', amount: 20650, method: 'Bank transfer', status: 'Success', date: dateText(-8) }
    ],
    invoices: [
        { id: 'INV-003', request: 'REQ-002', amount: 10030, status: 'Outstanding', date: dateText(-1) },
        { id: 'INV-002', request: 'REQ-001', amount: 20650, status: 'Paid', date: dateText(-4) },
        { id: 'INV-001', request: 'REQ-001', amount: 20650, status: 'Paid', date: dateText(-8) }
    ],
    deliverables: [
        { id: 'DEL-002', project: 'Landing page design', request: 'REQ-001', description: 'First design draft and responsive page preview.', submitted: dateText(-1), revisions: 0, status: 'Pending Review', url: 'https://example.com/staging-preview' },
        { id: 'DEL-001', project: 'Homepage wireframes', request: 'REQ-003', description: 'Approved structure and early page layout.', submitted: dateText(-10), revisions: 1, status: 'Completed', url: 'https://example.com/staging-preview' }
    ],
    conversations: [
        { id: 'support', name: 'Support Team', initials: 'ST', messages: [{ sender: 'Support Team', text: 'Hello Rahul! How can we help you today?', time: '09:20' }, { sender: 'You', text: 'I would like an update on my current requests.', time: '09:34' }] },
        { id: 'project', name: 'Project Team', initials: 'PT', messages: [{ sender: 'Project Team', text: 'The first development milestone is on track. We will share a preview soon.', time: 'Yesterday' }] },
        { id: 'account', name: 'Account Manager', initials: 'AM', messages: [{ sender: 'Account Manager', text: 'Your quotation is ready for review. Let us know if you have questions.', time: 'Mon' }] }
    ],
    profile: { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', business: 'Northstar Consulting', gstin: '', emailUpdates: true, projectUpdates: true, memberSince: 'January 2024' }
};
function loadData() { try {
    const saved = JSON.parse(localStorage.getItem('e2ePortalData'));
    return saved ? { ...structuredClone(seed), ...saved } : structuredClone(seed);
}
catch {
    return structuredClone(seed);
} }
let data = loadData(), currentPage = 'dashboard', activeConversation = 'support', deliverableTab = 'Pending Review', requestSearch = '', requestFilter = 'All statuses', tableSearch = { quotations: '', payments: '', invoices: '' };
function persist() { localStorage.setItem('e2ePortalData', JSON.stringify(data)); }
function statusClass(status) { if (['Success', 'Accepted', 'Completed', 'Paid', 'In Development'].includes(status))
    return 'success'; if (['Pending', 'Quoted', 'Pending Review', 'Ready for Review', 'Outstanding', 'Under Review'].includes(status))
    return 'warning'; if (status === 'Overdue')
    return 'danger'; return 'neutral'; }
function badge(status) { return `<span class="badge ${statusClass(status)}">${escapeHTML(status)}</span>`; }
function escapeHTML(value = '') { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function pageHeading(title, description, action = '') { return `<div class="page-heading"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`; }
function summary(label, value, sub, icon, tone = '') { return `<article class="card summary-card"><div class="summary-top"><span class="summary-label">${label}</span><span class="summary-icon ${tone}">${icon}</span></div><div class="summary-number">${value}</div><div class="summary-foot">${sub}</div></article>`; }
function table(headers, rows, empty = 'No records found.') { return `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows || `<tr><td colspan="${headers.length}"><div class="empty-state"><div class="empty-icon">⌕</div><strong>${empty}</strong><p>Try adjusting your search or filters.</p></div></td></tr>`}</tbody></table></div>`; }
function projectCards() { return `<div class="project-list">${data.requests.filter(r => r.progress > 0).slice(0, 3).map(r => `<div class="project-item"><div class="project-top"><div><strong>${escapeHTML(r.project)}</strong><small>${r.id} · ${escapeHTML(r.service)}</small></div><span class="progress-value">${r.progress}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${r.progress}%"></div></div><div class="project-meta"><span>${badge(r.status)}</span><span>Due ${r.due}</span></div></div>`).join('')}</div>`; }
function activityList() { return `<div class="activity-list"><div class="activity"><span class="activity-icon">▧</span><div><strong>Quotation received</strong><p>QUO-002 is ready for your review.</p><time>${dateText(-1)}</time></div></div><div class="activity"><span class="activity-icon">✓</span><div><strong>Payment confirmation</strong><p>Your recent payment has been recorded.</p><time>${dateText(-4)}</time></div></div><div class="activity"><span class="activity-icon">✉</span><div><strong>Project team message</strong><p>A new update is available in Messages.</p><time>Yesterday</time></div></div><div class="activity"><span class="activity-icon">↗</span><div><strong>Project status updated</strong><p>Client management app is in development.</p><time>${dateText(-2)}</time></div></div></div>`; }
function dashboard() { let rows = data.requests.slice(0, 3).map(r => `<tr><td><a href="#" class="id-link" data-view-request="${r.id}">${r.id}</a></td><td><strong>${escapeHTML(r.service)}</strong></td><td>${badge(r.status)}</td><td>${r.created}</td><td><button class="btn btn-small" data-view-request="${r.id}">View</button></td></tr>`).join(''); return `<section class="hero-panel"><div class="hero-copy"><p class="eyebrow">TUESDAY, ${dateText().toUpperCase()}</p><h1>Good morning, ${escapeHTML(data.profile.name.split(' ')[0])}!</h1><p>Here's what's happening with your projects today.</p></div><button class="new-request" data-action="new-request">＋ New Request</button></section><div class="summary-grid">${summary('Active Requests', data.requests.filter(r => !['Completed'].includes(r.status)).length, 'Across all workflow stages', '▤')}${summary('Quotations Pending', data.quotations.filter(q => q.status === 'Pending').length, 'Awaiting your review', '▧', 'coral')}${summary('Payment Pending', data.payments.filter(p => p.status === 'Pending').length, 'Payment action required', '₹', 'amber')}${summary('Projects in Progress', data.requests.filter(r => r.status === 'In Development').length, 'Currently being built', '↗', 'green')}</div><div class="dashboard-grid"><div class="stack"><section class="card section-card"><div class="section-head"><div><h2>My recent requests</h2><p>Keep track of your latest service requests.</p></div><button class="btn-plain" data-page="requests">View all →</button></div>${table(['Request ID', 'Service', 'Status', 'Created on', 'Action'], rows)}</section><section class="card section-card"><div class="section-head"><div><h2>Project progress</h2><p>A quick look at active work.</p></div><button class="btn-plain" data-page="requests">All projects →</button></div>${projectCards()}</section><section class="card section-card"><div class="section-head"><h2>Company statistics</h2><span class="badge neutral">Demo data</span></div><div class="stats-strip" style="padding:0"><div class="mini-stat"><strong>240+</strong><span>Projects delivered</span><small>Illustrative company metric</small></div><div class="mini-stat"><strong>180+</strong><span>Clients served</span><small>Illustrative company metric</small></div><div class="mini-stat"><strong>98%</strong><span>Client satisfaction</span><small>Illustrative company metric</small></div></div></section></div><div class="stack"><section class="card section-card"><div class="section-head"><div><h2>Action needed</h2><p>Two items need your attention.</p></div><span class="badge warning">2 pending</span></div><div class="action-list"><div class="action-item"><span class="action-symbol">▧</span><div class="action-copy"><strong>Quotation waiting for review</strong><p>QUO-002 · E-commerce Store</p><button class="btn btn-small" data-page="quotations">Review quotation →</button></div></div><div class="action-item"><span class="action-symbol coral">◇</span><div class="action-copy"><strong>Deliverable ready for approval</strong><p>Landing page design · DEL-002</p><button class="btn btn-small" data-page="deliverables">Review deliverable →</button></div></div></div></section><section class="card section-card"><div class="section-head"><h2>Recent activity</h2><button class="btn-plain" data-page="messages">Messages →</button></div>${activityList()}</section><div class="notice">This portal uses sample data for demonstration. No real payments or messages are processed.</div></div></div>`; }
function requestsPage() { const rows = data.requests.filter(r => (requestFilter === 'All statuses' || r.status === requestFilter) && (r.id + ' ' + r.service + ' ' + r.project).toLowerCase().includes(requestSearch.toLowerCase())).map(r => `<tr><td><a href="#" class="id-link" data-view-request="${r.id}">${r.id}</a>${r.overdue ? '<br><span class="badge danger">Overdue</span>' : ''}</td><td><strong>${escapeHTML(r.project)}</strong><br><span>${escapeHTML(r.service)}</span></td><td>${badge(r.status)}</td><td>${r.created}</td><td>${r.due}</td><td><button class="btn btn-small" data-view-request="${r.id}">View</button></td></tr>`).join(''); return `${pageHeading('My requests', 'Manage your service requests and track each project.', '<button class="new-request" data-action="new-request">＋ New Request</button>')}<section class="card section-card"><div class="toolbar"><input class="search-field" id="requestSearch" type="search" placeholder="Search by request, service or project..." value="${escapeHTML(requestSearch)}"><select id="requestFilter" aria-label="Filter requests by status">${['All statuses', 'Submitted', 'Under Review', 'Quoted', 'Paid', 'In Development', 'Ready for Review', 'Completed'].map(s => `<option ${requestFilter === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>${table(['Request ID', 'Project / service', 'Status', 'Created on', 'Due date', 'Action'], rows, 'No requests match your filters.')}</section><div class="notice">Workflow: Submitted → Under Review → Quoted → Paid → In Development → Ready for Review → Completed. Overdue is a separate flag.</div>`; }
function quotationsPage() { let rows = data.quotations.filter(q => (q.id + ' ' + q.request + ' ' + q.service).toLowerCase().includes(tableSearch.quotations.toLowerCase())).map(q => { let gst = q.subtotal * .18; return `<tr><td><a href="#" class="id-link" data-view-quote="${q.id}">${q.id}</a></td><td>${q.request}</td><td><strong>${escapeHTML(q.service)}</strong></td><td>${money(q.subtotal)}</td><td>${money(gst)}</td><td><strong>${money(q.subtotal + gst)}</strong></td><td>${q.valid}</td><td>${badge(q.status)}</td><td><button class="btn btn-small" data-view-quote="${q.id}">View</button></td></tr>`; }).join(''); return `${pageHeading('Quotations', 'Review pricing, scope and terms for your projects.')}<div class="toolbar"><input class="search-field" id="quoteSearch" placeholder="Search quotations..." value="${escapeHTML(tableSearch.quotations)}"></div><section class="card section-card">${table(['Quotation ID', 'Request ID', 'Service', 'Subtotal', 'GST (18%)', 'Total', 'Valid until', 'Status', 'Action'], rows, 'No quotations found.')}</section><div class="notice">Quotation values are sample data. Acceptance is stored in this browser only; production acceptance must be validated and saved by a backend.</div>`; }
function paymentsPage() { const paid = data.payments.filter(p => p.status === 'Success').reduce((s, p) => s + p.amount, 0), pending = data.payments.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0); let rows = data.payments.filter(p => (p.id + ' ' + p.request + ' ' + p.method).toLowerCase().includes(tableSearch.payments.toLowerCase()) && (paymentFilter === 'All statuses' || p.status === paymentFilter)).map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.request}</td><td><strong>${money(p.amount)}</strong></td><td>${p.method}</td><td>${badge(p.status)}</td><td>${p.date}</td><td><button class="btn btn-small" data-payment="${p.id}">View</button></td></tr>`).join(''); return `${pageHeading('Payments', 'View recorded payments and outstanding balances.')}<div class="summary-grid">${summary('Total paid', money(paid), 'Confirmed demo payments', '✓', 'green')}${summary('Pending payment', money(pending), 'Awaiting confirmation', '₹', 'amber')}${summary('Total recorded', money(paid + pending), 'All payment records', '▣')}</div><section class="card section-card"><div class="toolbar"><input class="search-field" id="paymentSearch" placeholder="Search payments..." value="${escapeHTML(tableSearch.payments)}"><select id="paymentFilter"><option>All statuses</option><option ${paymentFilter === 'Success' ? 'selected' : ''}>Success</option><option ${paymentFilter === 'Pending' ? 'selected' : ''}>Pending</option></select></div>${table(['Payment ID', 'Request ID', 'Amount', 'Payment method', 'Status', 'Payment date', 'Action'], rows, 'No payments found.')}</section><div class="notice">Demo only: this portal does not process payments. A real payment must be confirmed server-side using a verified payment-provider response.</div>`; }
let paymentFilter = 'All statuses';
function invoicesPage() { const paid = data.invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0), out = data.invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0); let rows = data.invoices.filter(i => (i.id + ' ' + i.request).toLowerCase().includes(tableSearch.invoices.toLowerCase()) && (invoiceFilter === 'All statuses' || i.status === invoiceFilter)).map(i => `<tr><td><strong>${i.id}</strong></td><td>${i.request}</td><td><strong>${money(i.amount)}</strong></td><td>${badge(i.status)}</td><td>${i.date}</td><td><button class="btn btn-small" data-download-invoice="${i.id}">↓ Download</button></td></tr>`).join(''); return `${pageHeading('Invoices', 'Access your billing records and download demo receipts.')}<div class="summary-grid">${summary('Paid invoices', money(paid), 'Recorded as paid', '✓', 'green')}${summary('Outstanding amount', money(out), 'Requires attention', '₹', 'amber')}${summary('Tax information', '18% GST', 'Illustrative GST calculation', '▣')}</div><section class="card section-card"><div class="toolbar"><input class="search-field" id="invoiceSearch" placeholder="Search invoices..." value="${escapeHTML(tableSearch.invoices)}"><select id="invoiceFilter"><option>All statuses</option><option ${invoiceFilter === 'Paid' ? 'selected' : ''}>Paid</option><option ${invoiceFilter === 'Outstanding' ? 'selected' : ''}>Outstanding</option></select></div>${table(['Invoice ID', 'Request ID', 'Amount', 'Status', 'Issue date', 'Download'], rows, 'No invoices found.')}</section><div class="notice">Downloads are clearly labelled demo receipts and are not legally valid tax invoices. Replace the receipt generator with a backend-generated PDF for production.</div>`; }
let invoiceFilter = 'All statuses';
function deliverablesPage() { const list = data.deliverables.filter(d => d.status === deliverableTab); return `${pageHeading('Deliverables', 'Review submitted work and share feedback with your project team.')}<section class="card section-card"><div class="tabs"><button class="tab ${deliverableTab === 'Pending Review' ? 'active' : ''}" data-deliverable-tab="Pending Review">Pending review <span class="badge warning">${data.deliverables.filter(d => d.status === 'Pending Review').length}</span></button><button class="tab ${deliverableTab === 'Completed' ? 'active' : ''}" data-deliverable-tab="Completed">Completed</button></div>${list.length ? `<div class="project-list">${list.map(d => `<article class="project-item"><div class="project-top"><div><strong>${escapeHTML(d.project)}</strong><small>${d.id} · ${d.request} · Submitted ${d.submitted}</small></div>${badge(d.status)}</div><p style="font-size:11px;color:var(--muted);line-height:1.6">${escapeHTML(d.description)}</p><div class="project-meta"><span>Revision rounds used: ${d.revisions}/2</span><a class="id-link" href="${d.url}" target="_blank" rel="noopener">Open example staging preview ↗</a></div><div style="margin-top:12px">${d.status === 'Pending Review' ? `<button class="btn btn-primary btn-small" data-review-deliverable="${d.id}">Review deliverable</button>` : '<span class="badge success">Client approved</span>'}</div></article>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">◇</div><strong>Nothing to review here</strong><p>${deliverableTab === 'Pending Review' ? 'New deliverables will appear here when the team submits them.' : 'Approved deliverables will appear here.'}</p></div>`}</section><div class="notice">Staging preview URLs are examples only. Free revisions are limited to two in this demonstration. A project is not marked complete until its deliverable is approved.</div>`; }
function messagesPage() { const c = data.conversations.find(c => c.id === activeConversation); return `${pageHeading('Messages', 'Stay connected with the people working on your projects.')}<section class="card conversation-layout"><aside class="conversation-list">${data.conversations.map(x => `<button class="conversation-choice ${x.id === activeConversation ? 'active' : ''}" data-conversation="${x.id}"><span class="avatar">${x.initials}</span><span><strong>${x.name}</strong><small>${escapeHTML(x.messages.at(-1)?.text || 'Start a conversation')}</small></span></button>`).join('')}</aside><div class="chat-pane"><div class="chat-head">${c ? c.name : 'Select a conversation'}</div>${c ? `<div class="chat-messages" id="chatMessages">${c.messages.map(m => `<div class="message ${m.sender === 'You' ? 'mine' : ''}"><p>${escapeHTML(m.text)}</p><time>${escapeHTML(m.sender)} · ${escapeHTML(m.time)}</time></div>`).join('')}</div><form class="chat-compose" id="messageForm"><input id="messageInput" placeholder="Write a message..." aria-label="Write a message" maxlength="1000"><button class="btn btn-primary" type="submit">Send ↑</button></form>` : `<div class="empty-state">Choose a conversation to view messages.</div>`}</div></section><div class="notice">Demo messaging only. Messages are saved in this browser and are not sent to real E2E employees without a connected backend.</div>`; }
function profilePage() { const p = data.profile; return `${pageHeading('Profile', 'Manage your contact details and portal preferences.')}<div class="card profile-header"><span class="avatar">${initials(p.name)}</span><div><h2>${escapeHTML(p.name)}</h2><p>${escapeHTML(p.business || 'Client account')} · Client since ${escapeHTML(p.memberSince)}</p></div><span class="badge success" style="margin-left:auto">Active account</span></div><div class="profile-layout"><section class="card section-card"><div class="section-head"><h2>Personal information</h2></div><form id="profileForm" novalidate><div class="form-grid"><div class="field" data-field="name"><label for="profileName">Full name <span class="required">*</span></label><input id="profileName" name="name" value="${escapeHTML(p.name)}" required><small class="field-error"></small></div><div class="field" data-field="email"><label for="profileEmail">Email address <span class="required">*</span></label><input id="profileEmail" name="email" type="email" value="${escapeHTML(p.email)}" required><small class="field-error"></small></div><div class="field" data-field="phone"><label for="profilePhone">Phone number <span class="required">*</span></label><input id="profilePhone" name="phone" value="${escapeHTML(p.phone)}" required><small class="field-error"></small></div><div class="field" data-field="business"><label for="profileBusiness">Business name</label><input id="profileBusiness" name="business" value="${escapeHTML(p.business)}"><small class="field-error"></small></div><div class="field full" data-field="gstin"><label for="profileGstin">GSTIN <span style="color:var(--muted);font-weight:500">(optional)</span></label><input id="profileGstin" name="gstin" value="${escapeHTML(p.gstin)}" placeholder="Enter GSTIN if applicable"><small class="field-error"></small></div><div class="field full"><label>Notification preferences</label><label class="check-row"><input type="checkbox" name="emailUpdates" ${p.emailUpdates ? 'checked' : ''}> Email me about quotations, invoices and account updates.</label><label class="check-row"><input type="checkbox" name="projectUpdates" ${p.projectUpdates ? 'checked' : ''}> Notify me about project progress and deliverables.</label></div></div><div class="modal-actions"><button class="btn btn-primary" type="submit">Save changes</button></div></form></section><div class="stack"><section class="card section-card"><div class="section-head"><h2>Account details</h2></div><div class="detail-row"><span>Account status</span>${badge('Active')}</div><div class="detail-row"><span>Account type</span><strong>Client Account</strong></div><div class="detail-row"><span>Member since</span><strong>${escapeHTML(p.memberSince)}</strong></div></section><section class="card section-card"><div class="section-head"><h2>Security</h2></div><div class="security-row"><div><strong>Change password</strong><small>Requires a secure backend.</small></div><button class="btn btn-small" data-action="security">Manage</button></div><div class="security-row"><div><strong>Two-step verification</strong><small>Not configured in this demo.</small></div><button class="btn btn-small" data-action="security">Set up</button></div></section></div></div>`; }
function initials(name) { return name.split(/\s+/).map(x => x[0] || '').slice(0, 2).join('').toUpperCase(); }
const renderers = { dashboard, requests: requestsPage, quotations: quotationsPage, payments: paymentsPage, invoices: invoicesPage, deliverables: deliverablesPage, messages: messagesPage, profile: profilePage };
const pageTitles = { dashboard: 'Dashboard', requests: 'My Requests', quotations: 'Quotations', payments: 'Payments', invoices: 'Invoices', deliverables: 'Deliverables', messages: 'Messages', profile: 'Profile' };
function render() { $('#pageContent').innerHTML = renderers[currentPage](); $('#topTitle').textContent = pageTitles[currentPage]; $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === currentPage)); $('#topUserName').textContent = data.profile.name; $$('[data-page]').forEach(b => { if (b.matches('button'))
    b.setAttribute('aria-current', b.dataset.page === currentPage ? 'page' : 'false'); }); if (currentPage === 'messages') {
    const el = $('#chatMessages');
    if (el)
        el.scrollTop = el.scrollHeight;
} }
function navigate(page) { if (!renderers[page])
    return; currentPage = page; $('#notificationPanel').classList.add('hidden'); $('#sidebar').classList.remove('open'); $('#scrim').classList.add('hidden'); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function toast(message) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; $('#toastRegion').append(el); setTimeout(() => el.remove(), 3600); }
function openModal(title, body, wide = false) { $('#modalTitle').textContent = title; $('#modalBody').innerHTML = body; $('#modal').style.width = wide ? 'min(720px, 100%)' : 'min(620px, 100%)'; $('#modalBackdrop').classList.remove('hidden'); $('#modalClose').focus(); }
function closeModal() { $('#modalBackdrop').classList.add('hidden'); $('#modalBody').innerHTML = ''; }
function newRequestModal() { openModal('Create a new request', `<form id="newRequestForm" novalidate><div class="form-grid"><div class="field" data-field="service"><label for="requestService">Service type <span class="required">*</span></label><select id="requestService" name="service" required><option value="">Select a service</option>${services.map(s => `<option value="${s.name}">${s.name} — ${money(s.price)}</option>`).join('')}</select><small class="field-error"></small></div><div class="field" data-field="project"><label for="requestProject">Project name <span class="required">*</span></label><input id="requestProject" name="project" placeholder="e.g. Company website" required maxlength="100"><small class="field-error"></small></div><div class="field full" data-field="description"><label for="requestDescription">Project description <span class="required">*</span></label><textarea id="requestDescription" name="description" placeholder="Describe what you want to build..." required maxlength="2000"></textarea><small class="field-error"></small></div><div class="field full"><label for="requestFeatures">Required features</label><textarea id="requestFeatures" name="features" placeholder="List important features or functionality..." maxlength="2000"></textarea></div><div class="field" data-field="timeline"><label for="requestTimeline">Expected timeline <span class="required">*</span></label><select id="requestTimeline" name="timeline" required><option value="">Choose a timeline</option><option>1–2 weeks</option><option>3–4 weeks</option><option>4–5 weeks</option><option>6–8 weeks</option><option>8–10 weeks</option><option>Flexible</option></select><small class="field-error"></small></div><div class="field"><label for="requestAdditional">Additional requirements</label><input id="requestAdditional" name="additional" placeholder="Any other details?"></div></div><div class="notice" id="servicePrice">Choose a service to see its indicative base price. Final pricing is confirmed in a quotation.</div><div class="modal-actions"><button type="button" class="btn" data-close-modal>Cancel</button><button type="submit" class="btn btn-coral">Submit request →</button></div></form>`, true); }
function validateField(form, name, message) { const field = form.querySelector(`[data-field="${name}"]`), input = form.elements[name]; if (!field || !input)
    return true; field.classList.toggle('invalid', !input.value.trim()); field.querySelector('.field-error').textContent = input.value.trim() ? '' : message; return !!input.value.trim(); }
function viewRequest(id) { const r = data.requests.find(x => x.id === id); if (!r)
    return; openModal(`Request ${r.id}`, `<div class="detail-row"><span>Project name</span><strong>${escapeHTML(r.project)}</strong></div><div class="detail-row"><span>Service</span><strong>${escapeHTML(r.service)}</strong></div><div class="detail-row"><span>Status</span>${badge(r.status)}</div><div class="detail-row"><span>Created on</span><strong>${r.created}</strong></div><div class="detail-row"><span>Expected due date</span><strong>${r.due}</strong></div><div class="detail-row"><span>Expected timeline</span><strong>${escapeHTML(r.timeline || 'To be confirmed')}</strong></div><div class="detail-row"><span>Description</span><strong>${escapeHTML(r.description)}</strong></div><div class="detail-row"><span>Required features</span><strong>${escapeHTML(r.features || 'Not specified')}</strong></div><div class="modal-actions"><button class="btn" data-close-modal>Close</button><button class="btn btn-primary" data-page="messages" data-close-modal>Message team</button></div>`); }
function viewQuote(id) { const q = data.quotations.find(x => x.id === id); if (!q)
    return; const gst = q.subtotal * .18, total = q.subtotal + gst; openModal(`Quotation ${q.id}`, `<div class="detail-row"><span>Associated request</span><strong>${q.request}</strong></div><div class="detail-row"><span>Service</span><strong>${escapeHTML(q.service)}</strong></div><p style="color:var(--muted);font-size:11px;line-height:1.7">${escapeHTML(q.description)}</p><h3 style="font-size:12px">Included features</h3><ul class="feature-list"><li>Responsive desktop, tablet and mobile layouts</li><li>Core pages and agreed service scope</li><li>Basic on-page SEO and performance setup</li><li>Project handover and walkthrough</li><li>Two free revision rounds</li></ul><div class="detail-row"><span>Subtotal</span><strong>${money(q.subtotal)}</strong></div><div class="detail-row"><span>GST (18%)</span><strong>${money(gst)}</strong></div><div class="amount-total"><span>Total payable</span><strong>${money(total)}</strong></div><div class="detail-row"><span>Valid until</span><strong>${q.valid}</strong></div><div class="notice">Terms: Scope changes may require a revised quotation. Work begins after required approvals and payment confirmation. This is demonstration data, not a binding commercial offer.</div><div class="modal-actions"><button class="btn" data-close-modal>Close</button><button class="btn" data-page="messages" data-close-modal>Ask a question</button>${q.status === 'Pending' ? `<button class="btn btn-primary" data-accept-quote="${q.id}">Accept quotation</button>` : badge(q.status)}</div>`, true); }
function confirmAccept(id) { const q = data.quotations.find(x => x.id === id); if (!q)
    return; openModal('Accept this quotation?', `<p style="font-size:12px;line-height:1.7;color:var(--muted)">You are accepting ${q.id} for ${escapeHTML(q.service)} at ${money(q.subtotal * 1.18)} including 18% GST. In this demo, acceptance only updates local browser data.</p><div class="modal-actions"><button class="btn" data-close-modal>Cancel</button><button class="btn btn-primary" data-confirm-accept="${id}">Confirm acceptance</button></div>`); }
function reviewDeliverable(id) { const d = data.deliverables.find(x => x.id === id); if (!d)
    return; openModal('Review deliverable', `<p style="font-size:12px"><strong>${escapeHTML(d.project)}</strong> · ${d.id}</p><p style="color:var(--muted);font-size:11px">${escapeHTML(d.description)}</p><form id="reviewForm" data-deliverable="${id}" novalidate><div class="field" data-field="decision"><label for="reviewDecision">Your decision <span class="required">*</span></label><select id="reviewDecision" name="decision"><option value="Approve Deliverable">Approve deliverable</option><option value="Request Revision">Request revision</option></select><small class="field-error"></small></div><div class="field" data-field="comment" style="margin-top:14px"><label for="reviewComment">Comment <span id="commentRequired" class="required" style="display:none">*</span></label><textarea id="reviewComment" name="comment" placeholder="Share feedback or approval notes..." maxlength="1500"></textarea><small class="field-error"></small></div><p class="hint">Free revisions remaining: ${Math.max(0, 2 - d.revisions)} of 2.</p><div class="modal-actions"><button type="button" class="btn" data-close-modal>Cancel</button><button type="submit" class="btn btn-primary">Submit review</button></div></form>`); }
function downloadReceipt(id) { const inv = data.invoices.find(x => x.id === id); if (!inv)
    return; const content = `E2E CLIENT PORTAL — DEMO RECEIPT\\nNOT A LEGALLY VALID TAX INVOICE\\n\\nReceipt ID: ${inv.id}\\nRequest ID: ${inv.request}\\nAmount: ${money(inv.amount)}\\nStatus: ${inv.status}\\nIssue date: ${inv.date}\\n\\nThis is a sample document for demonstration only.\\nNo tax invoice or payment claim is created by this file.\\n`; const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = `${inv.id}-DEMO-RECEIPT.txt`; document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url); toast('Demo receipt downloaded.'); }
let authMode = 'login';
const authUsersKey = 'e2ePortalUsers';
function setAuthMode(mode) { authMode = mode === 'signup' ? 'signup' : 'login'; const signup = authMode === 'signup'; $('#authTitle').textContent = signup ? 'Create your account' : 'Log in to your account'; $('#authSubtitle').textContent = signup ? 'Create an account to start managing your projects.' : 'Enter your details to continue to your client portal.'; $('#authSubmit').innerHTML = signup ? 'Create account <span>→</span>' : 'Log in <span>→</span>'; $('#authNameField').hidden = !signup; $('#authName').required = signup; $('#authPassword').autocomplete = signup ? 'new-password' : 'current-password'; $('#authSwitchText').innerHTML = signup ? 'Already have an account? <button type="button" data-auth-mode="login">Log in</button>' : 'New to E2E? <button type="button" data-auth-mode="signup">Create an account</button>'; $$('[data-auth-mode]').forEach(b => b.classList.toggle('active', b.dataset.authMode === authMode)); $('#authError').textContent = ''; }
function enterPortal(user) { data.profile = { ...data.profile, name: user.name || data.profile.name, email: user.email || data.profile.email }; try {
    localStorage.setItem('e2ePortalSession', JSON.stringify({ name: data.profile.name, email: data.profile.email }));
}
catch { } persist(); $('#authScreen').classList.add('auth-hidden'); $('#appShell').classList.remove('auth-hidden'); render(); }
function logout() { try {
    localStorage.removeItem('e2ePortalSession');
}
catch { } $('#appShell').classList.add('auth-hidden'); $('#authScreen').classList.remove('auth-hidden'); $('#authForm').reset(); setAuthMode('login'); }
function handleClick(e) { const target = e.target.closest('button,a'); if (!target)
    return; if (target.dataset.authMode) {
    setAuthMode(target.dataset.authMode);
    return;
} if (target.dataset.page) {
    e.preventDefault();
    const page = target.dataset.page;
    if (target.hasAttribute('data-close-modal'))
        closeModal();
    navigate(page);
    return;
} if (target.dataset.action) {
    const action = target.dataset.action;
    if (action === 'new-request')
        newRequestModal();
    if (action === 'support') {
        navigate('messages');
        activeConversation = 'support';
        render();
        toast('Open a message to contact the demo support team.');
    }
    if (action === 'security')
        toast('Security features require backend implementation.');
    return;
} if (target.hasAttribute('data-close-modal')) {
    closeModal();
    return;
} if (target.dataset.viewRequest) {
    e.preventDefault();
    viewRequest(target.dataset.viewRequest);
    return;
} if (target.dataset.viewQuote) {
    e.preventDefault();
    viewQuote(target.dataset.viewQuote);
    return;
} if (target.dataset.acceptQuote) {
    confirmAccept(target.dataset.acceptQuote);
    return;
} if (target.dataset.confirmAccept) {
    const q = data.quotations.find(x => x.id === target.dataset.confirmAccept);
    if (q) {
        q.status = 'Accepted';
        persist();
        closeModal();
        render();
        toast('Quotation accepted in demo data.');
    }
    return;
} if (target.dataset.reviewDeliverable) {
    reviewDeliverable(target.dataset.reviewDeliverable);
    return;
} if (target.dataset.deliverableTab) {
    deliverableTab = target.dataset.deliverableTab;
    render();
    return;
} if (target.dataset.conversation) {
    activeConversation = target.dataset.conversation;
    render();
    return;
} if (target.dataset.downloadInvoice) {
    downloadReceipt(target.dataset.downloadInvoice);
    return;
} if (target.dataset.payment) {
    const p = data.payments.find(x => x.id === target.dataset.payment);
    if (p)
        openModal(`Payment ${p.id}`, `<div class="detail-row"><span>Request ID</span><strong>${p.request}</strong></div><div class="detail-row"><span>Amount</span><strong>${money(p.amount)}</strong></div><div class="detail-row"><span>Payment method</span><strong>${p.method}</strong></div><div class="detail-row"><span>Status</span>${badge(p.status)}</div><div class="detail-row"><span>Payment date</span><strong>${p.date}</strong></div><div class="notice">Payment status cannot be changed from this demo. Production payment status must come from verified backend confirmation.</div><div class="modal-actions"><button class="btn" data-close-modal>Close</button></div>`);
    return;
} }
document.addEventListener('click', handleClick);
$('#modalClose').addEventListener('click', closeModal);
$('#modalBackdrop').addEventListener('click', e => { if (e.target === $('#modalBackdrop'))
    closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape')
    closeModal(); if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    $('#globalSearch').focus();
} });
$('#menuToggle').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#scrim').classList.remove('hidden'); });
$('#closeSidebar').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#scrim').classList.add('hidden'); });
$('#scrim').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#scrim').classList.add('hidden'); });
$('#notificationButton').addEventListener('click', () => $('#notificationPanel').classList.toggle('hidden'));
document.addEventListener('click', e => { if (!e.target.closest('.notification-wrap'))
    $('#notificationPanel').classList.add('hidden'); });
$('#globalSearch').addEventListener('input', e => { requestSearch = e.target.value; if (currentPage !== 'requests')
    navigate('requests');
else
    render(); const input = $('#requestSearch'); if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
} });
document.addEventListener('input', e => { if (e.target.id === 'requestSearch') {
    requestSearch = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const next = $('#requestSearch');
    next.focus();
    next.setSelectionRange(pos, pos);
} if (e.target.id === 'quoteSearch') {
    tableSearch.quotations = e.target.value;
    const pos = e.target.selectionStart;
    render();
    $('#quoteSearch').focus();
    $('#quoteSearch').setSelectionRange(pos, pos);
} if (e.target.id === 'paymentSearch') {
    tableSearch.payments = e.target.value;
    const pos = e.target.selectionStart;
    render();
    $('#paymentSearch').focus();
    $('#paymentSearch').setSelectionRange(pos, pos);
} if (e.target.id === 'invoiceSearch') {
    tableSearch.invoices = e.target.value;
    const pos = e.target.selectionStart;
    render();
    $('#invoiceSearch').focus();
    $('#invoiceSearch').setSelectionRange(pos, pos);
} });
document.addEventListener('change', e => { if (e.target.id === 'requestFilter') {
    requestFilter = e.target.value;
    render();
} if (e.target.id === 'paymentFilter') {
    paymentFilter = e.target.value;
    render();
} if (e.target.id === 'invoiceFilter') {
    invoiceFilter = e.target.value;
    render();
} if (e.target.id === 'requestService') {
    const s = services.find(x => x.name === e.target.value);
    $('#servicePrice').textContent = s ? `Indicative base price: ${money(s.price)}. Final pricing and 18% GST will be confirmed in a quotation.` : 'Choose a service to see its indicative base price. Final pricing is confirmed in a quotation.';
} if (e.target.id === 'reviewDecision') {
    $('#commentRequired').style.display = e.target.value === 'Request Revision' ? 'inline' : '';
    if (e.target.value === 'Request Revision')
        $('#reviewComment').required = true;
    else
        $('#reviewComment').required = false;
} });
document.addEventListener('submit', e => {
    if (e.target.id === 'authForm') {
        e.preventDefault();
        const f = e.target, name = f.elements.name.value.trim(), email = f.elements.email.value.trim().toLowerCase(), password = f.elements.password.value;
        $('#authError').textContent = '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#authError').textContent = 'Enter a valid email address.';
            return;
        }
        if (password.length < 6) {
            $('#authError').textContent = 'Password must contain at least 6 characters.';
            return;
        }
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem(authUsersKey) || '[]');
        }
        catch { }
        if (authMode === 'signup') {
            if (!name) {
                $('#authError').textContent = 'Enter your full name.';
                return;
            }
            if (users.some(u => u.email === email)) {
                $('#authError').textContent = 'An account with this email already exists. Please log in.';
                return;
            }
            users.push({ name, email, password });
            try {
                localStorage.setItem(authUsersKey, JSON.stringify(users));
            }
            catch { }
            toast('Demo account created.');
            enterPortal({ name, email });
        }
        else {
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                $('#authError').textContent = users.length ? 'Email or password is incorrect.' : 'No demo account found. Choose Sign up to create one.';
                return;
            }
            enterPortal(user);
            toast('Welcome back!');
        }
        return;
    }
    if (e.target.id === 'newRequestForm') {
        e.preventDefault();
        const f = e.target, valid = validateField(f, 'service', 'Choose a service type.') && validateField(f, 'project', 'Enter a project name.') && validateField(f, 'description', 'Describe your project.') && validateField(f, 'timeline', 'Choose an expected timeline.');
        if (!valid)
            return;
        const fd = new FormData(f), id = `REQ-${String(Math.max(0, ...data.requests.map(r => Number(r.id.slice(4)) || 0)) + 1).padStart(3, '0')}`, service = services.find(s => s.name === fd.get('service'));
        data.requests.unshift({ id, service: service.name, project: fd.get('project').trim(), status: 'Submitted', created: dateText(), due: 'To be confirmed', progress: 0, description: fd.get('description').trim(), features: fd.get('features').trim(), timeline: fd.get('timeline'), additional: fd.get('additional').trim(), overdue: false });
        persist();
        closeModal();
        requestSearch = '';
        requestFilter = 'All statuses';
        navigate('requests');
        toast(`Request ${id} submitted successfully.`);
    }
    if (e.target.id === 'profileForm') {
        e.preventDefault();
        const f = e.target;
        let valid = true;
        valid = validateField(f, 'name', 'Enter your full name.') && valid;
        valid = validateField(f, 'email', 'Enter a valid email address.') && valid;
        const email = f.elements.email.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const field = f.querySelector('[data-field="email"]');
            field.classList.add('invalid');
            field.querySelector('.field-error').textContent = 'Enter a valid email address.';
            valid = false;
        }
        valid = validateField(f, 'phone', 'Enter your phone number.') && valid;
        if (!valid)
            return;
        data.profile = { ...data.profile, name: f.elements.name.value.trim(), email, phone: f.elements.phone.value.trim(), business: f.elements.business.value.trim(), gstin: f.elements.gstin.value.trim(), emailUpdates: f.elements.emailUpdates.checked, projectUpdates: f.elements.projectUpdates.checked };
        persist();
        render();
        toast('Profile changes saved in this browser.');
    }
    if (e.target.id === 'reviewForm') {
        e.preventDefault();
        const f = e.target, id = f.dataset.deliverable, d = data.deliverables.find(x => x.id === id), decision = f.elements.decision.value, comment = f.elements.comment.value.trim();
        if (decision === 'Request Revision' && !comment) {
            const field = f.querySelector('[data-field="comment"]');
            field.classList.add('invalid');
            field.querySelector('.field-error').textContent = 'Add a comment explaining the revision needed.';
            return;
        }
        if (decision === 'Request Revision' && d.revisions >= 2) {
            toast('The two free revision rounds have been used.');
            return;
        }
        if (decision === 'Request Revision') {
            d.revisions++;
            d.status = 'In Progress';
            d.lastComment = comment;
            const r = data.requests.find(x => x.id === d.request);
            if (r)
                r.status = 'In Development';
        }
        else {
            d.status = 'Completed';
            d.approvalComment = comment;
            const r = data.requests.find(x => x.id === d.request);
            if (r) {
                r.status = 'Completed';
                r.progress = 100;
            }
        }
        persist();
        closeModal();
        render();
        toast(decision === 'Request Revision' ? 'Revision request submitted.' : 'Deliverable approved successfully.');
    }
    if (e.target.id === 'messageForm') {
        e.preventDefault();
        const input = $('#messageInput'), text = input.value.trim();
        if (!text) {
            input.focus();
            return;
        }
        const c = data.conversations.find(x => x.id === activeConversation);
        if (!c)
            return;
        c.messages.push({ sender: 'You', text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) });
        persist();
        render();
        toast('Message added to demo conversation.');
    }
});
$('#pageContent').addEventListener('submit', () => { });
$('#logoutButton').addEventListener('click', logout);
try {
    const session = JSON.parse(localStorage.getItem('e2ePortalSession') || 'null');
    if (session) {
        $('#authScreen').classList.add('auth-hidden');
        $('#appShell').classList.remove('auth-hidden');
        if (session.name)
            data.profile.name = session.name;
        if (session.email)
            data.profile.email = session.email;
    }
}
catch { }
if (!localStorage.getItem('e2ePortalSession')) {
    $('#appShell').classList.add('auth-hidden');
    setAuthMode('login');
}
else {
    $('#authScreen').classList.add('auth-hidden');
}
render();
