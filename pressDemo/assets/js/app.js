(function () {
  const navItems = [
    ["dashboard", "Dashboard", "bi-grid", "index.html"],
    ["leads", "Leads", "bi-person-plus", "leads.html"],
    ["orders", "Orders", "bi-cart3", "orders.html"],
    ["calendar", "Calendar", "bi-calendar3", "calendar.html"],
    ["files", "Files", "bi-folder2-open", "files.html"],
    ["production", "Production", "bi-building-gear", "production.html"],
    ["qc", "QC", "bi-card-checklist", "qc.html"],
    ["dispatch", "Dispatch", "bi-truck", "dispatch.html"],
    ["payments", "Payments", "bi-cash-stack", "payments.html"],
    ["reports", "Reports", "bi-bar-chart-line", "reports.html"],
    ["settings", "Settings", "bi-gear", "settings.html"]
  ];

  const activeMap = {
    "lead-detail": "leads",
    "new-lead": "leads",
    "order-detail": "orders",
    "new-order": "orders",
    proof: "files",
    "job-sheet": "orders",
    "record-payment": "payments"
  };

  const pageMeta = {
    dashboard: ["Dashboard", "Overview of photo album production"],
    leads: ["Leads Management", "Track and manage potential clients and inquiries."],
    "lead-detail": ["Lead Detail", "Qualify inquiry, prepare quote, and move into production."],
    "new-lead": ["Add Lead", "Capture a new inquiry from WhatsApp, walk-in, phone, or website."],
    orders: ["Orders", "Manage and track all album production workflows."],
    "order-detail": ["Order Detail", "Ravi and Sneha Wedding - ordered on Oct 24, 2026"],
    "new-order": ["New Order", "Create a static demo order with album specs, files, and payment terms."],
    calendar: ["Production Calendar", "View deadlines and delivery schedules."],
    files: ["Files", "Track source photos, selected images, designs, proofs, and print-ready output."],
    proof: ["Proof Review", "Share, revise, approve, and lock the album design before print."],
    production: ["Production Board", "Manage active jobs across the production floor."],
    qc: ["Quality Check", "Verify print, finish, binding, cover, packaging, and dispatch readiness."],
    dispatch: ["Dispatch Hub", "Manage outbound shipments and tracking."],
    payments: ["Payments", "Track quoted value, advances, balances, and overdue accounts."],
    "record-payment": ["Record Payment", "Static payment entry screen for demo navigation."],
    reports: ["Production Reports", "Key metrics and performance for the last 30 days."],
    settings: ["Settings", "Configure catalog, team, workflow stages, and document templates."],
    "job-sheet": ["Job Sheet", "Printable production reference for one album order."]
  };

  const orders = [
    ["#ORD-9021", "Sarah Jenkins", "Wedding", "12x12 (40 sheets)", "May 12, 2026", "Proof Shared", "Paid"],
    ["#ORD-9020", "Michael Chen", "Anniversary", "10x10 (30 sheets)", "May 14, 2026", "Printing", "Pending"],
    ["#ORD-9019", "Emma Davis", "Newborn", "8x8 (20 sheets)", "May 15, 2026", "QC", "Paid"],
    ["#ORD-9018", "David Wilson", "Wedding", "14x14 (50 sheets)", "May 10, 2026", "Dispatched", "Paid"],
    ["#ORD-9017", "Lisa Anderson", "Engagement", "10x10 (25 sheets)", "May 18, 2026", "Proof Shared", "Overdue"]
  ];

  const leads = [
    ["#LD-1042", "Sarah Jenkins", "+1 (555) 019-2834", "WhatsApp", "Wedding", "May 04, 2026", "New"],
    ["#LD-1041", "Michael Chen", "+1 (555) 837-9921", "Walk-in", "Corporate", "May 03, 2026", "Quote Sent"],
    ["#LD-1040", "Elena Rodriguez", "+1 (555) 443-1102", "Website", "Quinceanera", "May 02, 2026", "Converted"],
    ["#LD-1039", "David Smith", "+1 (555) 776-3390", "Instagram", "Family Portrait", "May 01, 2026", "Quote Sent"]
  ];

  const chipClass = {
    New: "chip-teal",
    "Quote Sent": "chip-gray",
    Converted: "chip-amber",
    "Proof Shared": "chip-gray",
    Printing: "chip-blue",
    QC: "chip-amber",
    Dispatched: "chip-teal",
    Delivered: "chip-gray",
    Paid: "chip-teal",
    Pending: "chip-gray",
    Overdue: "chip-red",
    Packed: "chip-blue",
    "Ready to Pack": "chip-gray",
    "Ready to Ship": "chip-teal",
    "QC Hold": "chip-red",
    Approved: "chip-teal",
    Active: "chip-teal",
    Offline: "chip-gray"
  };

  function chip(text) {
    return `<span class="chip ${chipClass[text] || "chip-gray"}">${text}</span>`;
  }

  function money(value, tone) {
    return `<span class="data-tabular ${tone ? `text-${tone}` : ""}">${value}</span>`;
  }

  function pageHeader(key, actions) {
    const [title, subtitle] = pageMeta[key] || pageMeta.dashboard;
    return `
      <div class="page-heading">
        <div>
          <h1 class="page-title">${title}</h1>
          <p class="page-subtitle">${subtitle}</p>
        </div>
        ${actions ? `<div class="actions d-flex flex-wrap gap-2 justify-content-end">${actions}</div>` : ""}
      </div>
    `;
  }

  function statCards(items) {
    return `
      <div class="row g-3 mb-4">
        ${items.map((item) => {
          const widthClass = item.w === "fluid" ? "col-xl" : `col-xl-${item.w || 3}`;
          return `
          <div class="col-12 col-sm-6 ${widthClass}">
            <div class="ap-card metric-card h-100">
              <div class="d-flex justify-content-between align-items-start position-relative z-1">
                <div>
                  <div class="metric-label">${item.label}</div>
                  <div class="metric-value mt-4">${item.value}</div>
                </div>
                <span class="chip ${item.chip || "chip-teal"}"><i class="bi ${item.icon || "bi-archive"}"></i></span>
              </div>
            </div>
          </div>
        `;
        }).join("")}
      </div>
    `;
  }

  function progressRail(labels) {
    return `
      <div class="table-responsive">
        <div class="progress-rail">
          ${labels.map((label, idx) => `
            <div class="stage ${idx < 3 ? "done" : idx === 3 ? "current" : ""}">
              <span class="stage-dot"><i class="bi ${idx < 3 ? "bi-check-lg" : idx === 3 ? "bi-circle-fill" : "bi-circle"}"></i></span>
              <span>${label}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function orderTable(rows = orders) {
    return `
      <div class="ap-card overflow-hidden">
        <div class="table-responsive">
          <table class="table table-ap">
            <thead>
              <tr>
                <th>Job No</th><th>Customer</th><th>Event</th><th>Album Size</th><th>Due Date</th><th>Stage</th><th>Payment</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr>
                  <td class="fw-bold text-primary">${row[0]}</td>
                  <td>${row[1]}</td>
                  <td>${row[2]}</td>
                  <td>${row[3]}</td>
                  <td>${row[4]}</td>
                  <td>${chip(row[5])}</td>
                  <td>${chip(row[6])}</td>
                  <td><a class="link-ap" href="order-detail.html">Open</a></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center gap-3 px-3 py-3 border-top">
          <span class="text-muted">Showing 1 to ${rows.length} of 142 orders</span>
          <div class="btn-group">
            <button class="btn btn-sm btn-ap-ghost" disabled>Previous</button>
            <a class="btn btn-sm btn-ap-ghost" href="orders.html">Next</a>
          </div>
        </div>
      </div>
    `;
  }

  function leadTable() {
    return `
      <div class="ap-card overflow-hidden">
        <div class="table-responsive">
          <table class="table table-ap">
            <thead><tr><th>Lead ID</th><th>Customer</th><th>Phone</th><th>Source</th><th>Event</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${leads.map((row) => `
                <tr>
                  <td class="text-muted fw-bold">${row[0]}</td>
                  <td class="fw-semibold">${row[1]}</td>
                  <td>${row[2]}</td>
                  <td><i class="bi bi-chat-left-text me-1"></i>${row[3]}</td>
                  <td>${row[4]}</td>
                  <td>${row[5]}</td>
                  <td>${chip(row[6])}</td>
                  <td><a class="link-ap" href="lead-detail.html">View Details</a></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center gap-3 px-3 py-3 border-top">
          <span class="text-muted">Showing 1 to 4 of 42 entries</span>
          <div class="btn-group">
            <button class="btn btn-sm btn-ap-ghost" disabled>Prev</button>
            <a class="btn btn-sm btn-ap-ghost" href="leads.html">Next</a>
          </div>
        </div>
      </div>
    `;
  }

  const pages = {
    dashboard() {
      return `
        ${pageHeader("dashboard", `<a class="btn btn-ap-primary" href="new-order.html"><i class="bi bi-plus-lg me-2"></i>New Order</a>`)}
        ${statCards([
          { label: "Active Orders", value: "42", icon: "bi-archive" },
          { label: "Pending Approval", value: "8", icon: "bi-hourglass-split", chip: "chip-red" },
          { label: "In Production", value: "17", icon: "bi-building-gear", chip: "chip-blue" },
          { label: "Ready for Dispatch", value: "5", icon: "bi-truck" }
        ])}
        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="ap-card mb-4">
              <div class="ap-card-body">
                <h2 class="h4 fw-bold mb-3">Production Pipeline</h2>
                ${progressRail(["Prep", "Print", "Bind", "QC", "Ship"])}
              </div>
            </div>
            <div class="ap-card overflow-hidden">
              <div class="ap-card-header d-flex justify-content-between align-items-center">
                <h2 class="h4 fw-bold m-0">Today's Priority Orders</h2>
                <a class="link-ap" href="orders.html">View All</a>
              </div>
              <div class="table-responsive">
                <table class="table table-ap">
                  <thead><tr><th>Job No</th><th>Customer</th><th>Stage</th><th class="text-end">Action</th></tr></thead>
                  <tbody>
                    <tr><td class="fw-bold text-primary">#ORD-9021</td><td>Smith Wedding</td><td>${chip("Printing")}</td><td class="text-end"><a href="order-detail.html" class="icon-button ms-auto"><i class="bi bi-three-dots-vertical"></i></a></td></tr>
                    <tr><td class="fw-bold text-primary">#ORD-9022</td><td>Johnson Studio</td><td>${chip("QC Hold")}</td><td class="text-end"><a href="order-detail.html" class="icon-button ms-auto"><i class="bi bi-three-dots-vertical"></i></a></td></tr>
                    <tr><td class="fw-bold text-primary">#ORD-9018</td><td>Miller Seniors</td><td>${chip("Ready to Ship")}</td><td class="text-end"><a href="order-detail.html" class="icon-button ms-auto"><i class="bi bi-three-dots-vertical"></i></a></td></tr>
                    <tr><td class="fw-bold text-primary">#ORD-9025</td><td>Davis Portraits</td><td>${chip("Pending")}</td><td class="text-end"><a href="order-detail.html" class="icon-button ms-auto"><i class="bi bi-three-dots-vertical"></i></a></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="ap-card mb-4">
              <div class="ap-card-body">
                <h2 class="h4 fw-bold mb-3"><i class="bi bi-exclamation-triangle text-danger me-2"></i>Attention Required</h2>
                <div class="alert alert-danger py-3 mb-3"><strong>Delay: Bindery Machine 2</strong><br>Affects 3 orders. Est. downtime 2 hrs.</div>
                <div class="alert alert-warning py-3 mb-0"><strong>Pending Payment: #ORD-8990</strong><br>Customer needs follow-up before dispatch.</div>
              </div>
            </div>
            <div class="ap-card">
              <div class="ap-card-body">
                <h2 class="h4 fw-bold mb-3">Recent Activity</h2>
                <div class="timeline">
                  <div class="timeline-item"><strong>Order #9015 Dispatched</strong><div class="text-muted">10 mins ago by Sarah M.</div></div>
                  <div class="timeline-item"><strong>QC Passed: #9018</strong><div class="text-muted">45 mins ago by John D.</div></div>
                  <div class="timeline-item"><strong>New Lead Assigned</strong><div class="text-muted">2 hours ago</div></div>
                </div>
                <a class="link-ap" href="reports.html">View All Activity</a>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    leads() {
      return `
        ${pageHeader("leads", `<a class="btn btn-ap-primary" href="new-lead.html"><i class="bi bi-plus-lg me-2"></i>Add Lead</a>`)}
        <div class="row g-4 mb-4">
          <div class="col-12 col-xl-9">
            <div class="ap-card">
              <div class="ap-card-body">
                <h2 class="h4 fw-bold mb-3"><i class="bi bi-filter me-2 text-muted"></i>Filters</h2>
                <div class="row g-3">
                  <div class="col-12 col-md-4"><label class="form-label">Source</label><select class="form-select"><option>All Sources</option><option>WhatsApp</option><option>Walk-in</option></select></div>
                  <div class="col-12 col-md-4"><label class="form-label">Status</label><select class="form-select"><option>All Statuses</option><option>New</option><option>Quote Sent</option></select></div>
                  <div class="col-12 col-md-4"><label class="form-label">Date Range</label><input class="form-control" type="date"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-3">
            <div class="ap-card metric-card h-100" style="background:#1f3a5f;color:#fff">
              <div class="label-caps text-white-50">New Leads This Week</div>
              <div class="display-5 fw-bold mt-2">24 <span class="fs-6 text-info">+12%</span></div>
            </div>
          </div>
        </div>
        ${leadTable()}
      `;
    },

    "lead-detail"() {
      return `
        ${pageHeader("lead-detail", `<a class="btn btn-ap-ghost" href="leads.html">Back to Leads</a><a class="btn btn-ap-primary" href="new-order.html">Convert to Order</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="ap-card mb-4">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0">Sarah Jenkins Wedding Inquiry</h2></div>
              <div class="ap-card-body">
                <div class="row g-4">
                  <div class="col-md-6"><div class="label-caps">Event Type</div><div class="fw-semibold">Wedding Album</div></div>
                  <div class="col-md-6"><div class="label-caps">Lead Source</div><div class="fw-semibold">WhatsApp Referral</div></div>
                  <div class="col-md-6"><div class="label-caps">Requested Size</div><div class="fw-semibold">12x12 Lay-flat, 40 sheets</div></div>
                  <div class="col-md-6"><div class="label-caps">Target Delivery</div><div class="fw-semibold">May 28, 2026</div></div>
                </div>
              </div>
            </div>
            <div class="ap-card">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0">Lead Timeline</h2></div>
              <div class="ap-card-body timeline">
                <div class="timeline-item"><strong>Quote sent</strong><div class="text-muted">Rs 18,500 package shared on WhatsApp.</div></div>
                <div class="timeline-item"><strong>Files expected</strong><div class="text-muted">Customer will share selected images by Google Drive.</div></div>
                <div class="timeline-item"><strong>Follow-up scheduled</strong><div class="text-muted">Call after sample cover confirmation.</div></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="ap-card mb-4">
              <div class="ap-card-body">
                <div class="d-flex align-items-center gap-3 mb-3"><span class="avatar">SJ</span><div><h2 class="h5 fw-bold mb-0">Sarah Jenkins</h2><div class="text-muted">Retail Customer</div></div></div>
                <div class="border-top pt-3 d-grid gap-2">
                  <div><i class="bi bi-telephone me-2 text-muted"></i>+1 (555) 019-2834</div>
                  <div><i class="bi bi-envelope me-2 text-muted"></i>sarah@example.com</div>
                  <div><i class="bi bi-geo-alt me-2 text-muted"></i>New York, NY</div>
                </div>
              </div>
            </div>
            <div class="ap-card"><div class="ap-card-body"><div class="label-caps">Recommended Package</div><h3 class="h4 fw-bold mt-2">Premium Lay-flat</h3><p class="text-muted">Design, print, matte coating, acrylic cover, and presentation box.</p><a class="btn btn-ap-primary w-100" href="new-order.html">Create Order</a></div></div>
          </div>
        </div>
      `;
    },

    "new-lead"() {
      return formPage("new-lead", "leads.html", [
        ["Customer Name", "Sarah Jenkins", "text"],
        ["Phone", "+1 (555) 019-2834", "text"],
        ["Email", "sarah@example.com", "email"],
        ["Event Type", "Wedding", "text"],
        ["Source", "WhatsApp", "text"],
        ["Delivery Required By", "", "date"]
      ], "Save Lead");
    },

    orders() {
      return `
        ${pageHeader("orders", `<a class="btn btn-ap-primary" href="new-order.html"><i class="bi bi-plus-lg me-2"></i>New Order</a>`)}
        ${statCards([
          { label: "All Orders", value: "142", icon: "bi-cart3", w: "fluid" },
          { label: "Pending Approval", value: "18", icon: "bi-hourglass", w: "fluid" },
          { label: "In Production", value: "45", icon: "bi-building-gear", chip: "chip-blue", w: "fluid" },
          { label: "Ready for Dispatch", value: "12", icon: "bi-truck", w: "fluid" },
          { label: "Payment Pending", value: "5", icon: "bi-cash", chip: "chip-red", w: "fluid" }
        ])}
        ${orderTable()}
      `;
    },

    "order-detail"() {
      return `
        ${pageHeader("order-detail", `<a class="btn btn-ap-ghost" href="job-sheet.html"><i class="bi bi-printer me-2"></i>Job Sheet</a><a class="btn btn-ap-primary" href="production.html">Mark Next Stage <i class="bi bi-arrow-right ms-2"></i></a>`)}
        <div class="d-flex align-items-center gap-3 mb-4 flex-wrap">
          <h2 class="h3 fw-bold m-0">ALB-1042</h2>${chip("Printing")}
        </div>
        <div class="ap-card mb-4">${progressRail(["Placed", "Design", "Approved", "Printing", "Binding"])}</div>
        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="ap-card mb-4">
              <div class="ap-card-header d-flex justify-content-between"><h2 class="h4 fw-bold m-0"><i class="bi bi-book me-2 text-muted"></i>Album Specification</h2><a class="link-ap" href="new-order.html">Edit Specs</a></div>
              <div class="ap-card-body">
                <div class="row g-4">
                  ${spec("Size", "12x36 Landscape")}
                  ${spec("Sheets (Spreads)", "45 Sheets (90 Pages)")}
                  ${spec("Paper Type", "Lustre Premium")}
                  ${spec("Finish / Coating", "UV Matte Coating")}
                  ${spec("Binding Style", "Layflat Flush Mount")}
                  ${spec("Cover Design", "Acrylic Front + Leatherette Back")}
                </div>
              </div>
            </div>
            <div class="ap-card mb-4">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0"><i class="bi bi-folder2-open me-2 text-muted"></i>Project Files</h2></div>
              ${fileTile("Raw Images Link", "Google Drive - received May 02", "bi-image", "files.html")}
              ${fileTile("Client Selected Output", "Approved", "bi-images", "proof.html", chip("Approved"))}
              ${fileTile("Design Drafts (v2)", "Dropbox - uploaded May 05", "bi-tools", "proof.html")}
              ${fileTile("Print-Ready PDF", "Active Production File", "bi-printer", "job-sheet.html", `<span class="chip chip-blue">Download</span>`)}
            </div>
            <div class="ap-card">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0">Revision History (1)</h2></div>
              <div class="ap-card-body timeline">
                <div class="timeline-item"><strong>Revision request: V1 to V2</strong><div class="text-muted mb-2">Requested on May 05 - handled by Design Team</div><div class="p-3 bg-light rounded-3">Please swap the photo on page 12 with IMG_8992. Also, the title text on the cover needs to be slightly larger and centered vertically.</div></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="ap-card mb-4">
              <div class="ap-card-header border-top border-4 border-primary"><h2 class="h4 fw-bold m-0"><i class="bi bi-person me-2 text-muted"></i>Customer Details</h2></div>
              <div class="ap-card-body">
                <div class="d-flex gap-3 align-items-center mb-3"><span class="avatar bg-secondary">PK</span><div><strong>Pranav Kumar</strong><div class="text-muted">Studio LensCraft</div></div></div>
                <div class="border-top pt-3 d-grid gap-2"><span><i class="bi bi-envelope me-2 text-muted"></i>pranav.lenscraft@example.com</span><span><i class="bi bi-telephone me-2 text-muted"></i>+91 98765 43210</span><span><i class="bi bi-geo-alt me-2 text-muted"></i>Indiranagar, Bangalore</span></div>
              </div>
            </div>
            <div class="ap-card mb-4">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0"><i class="bi bi-cash-stack me-2 text-muted"></i>Payment Summary</h2></div>
              <div class="ap-card-body">
                <div class="d-flex justify-content-between mb-2"><span>Quoted Amount</span>${money("Rs 14,500")}</div>
                <div class="d-flex justify-content-between mb-3"><span>Advance Paid</span>${money("- Rs 5,000", "success")}</div>
                <div class="d-flex justify-content-between border-top pt-3 h4 fw-bold"><span>Balance Due</span>${money("Rs 9,500", "danger")}</div>
                <a class="btn btn-ap-ghost w-100 mt-3" href="record-payment.html"><i class="bi bi-receipt me-2"></i>Record Payment</a>
              </div>
            </div>
            <div class="alert alert-warning border-warning"><strong>Production Note</strong><br>Handle with care. Use premium reinforced mailers and ensure acrylic cover has protective film intact.</div>
          </div>
        </div>
      `;
    },

    "new-order"() {
      return `
        ${pageHeader("new-order", `<a class="btn btn-ap-ghost" href="orders.html">Cancel</a><a class="btn btn-ap-primary" href="order-detail.html">Create Demo Order</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="ap-card mb-4"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Customer and Event</h2></div><div class="ap-card-body"><div class="row g-3">${input("Customer", "Ravi and Sneha", "col-md-6")}${input("Phone", "+91 98765 43210", "col-md-6")}${input("Event Type", "Wedding", "col-md-6")}${input("Delivery Date", "", "col-md-6", "date")}</div></div></div>
            <div class="ap-card"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Album Specification</h2></div><div class="ap-card-body"><div class="row g-3">${input("Album Size", "12x36 Landscape", "col-md-4")}${input("Sheets", "45", "col-md-4")}${input("Paper Type", "Lustre Premium", "col-md-4")}${input("Finish", "UV Matte", "col-md-4")}${input("Binding", "Layflat Flush Mount", "col-md-4")}${input("Cover", "Acrylic + Leatherette", "col-md-4")}</div></div></div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="ap-card"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Commercials</h2></div><div class="ap-card-body"><div class="row g-3">${input("Quote Amount", "Rs 14,500", "col-12")}${input("Advance", "Rs 5,000", "col-12")}${input("File Link", "Google Drive folder URL", "col-12")}</div><a class="btn btn-ap-primary w-100 mt-4" href="order-detail.html">Save Static Order</a></div></div>
          </div>
        </div>
      `;
    },

    calendar() {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const cells = Array.from({ length: 14 }, (_, i) => i + 1);
      return `
        ${pageHeader("calendar", `<a class="btn btn-ap-ghost" href="calendar.html"><i class="bi bi-filter me-2"></i>Filter</a><a class="btn btn-ap-primary" href="new-order.html"><i class="bi bi-plus-lg me-2"></i>New Deadline</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-9">
            <div class="ap-card overflow-hidden">
              <div class="ap-card-header d-flex justify-content-between align-items-center"><div class="d-flex align-items-center gap-4"><i class="bi bi-chevron-left"></i><h2 class="h4 fw-bold m-0">May 2026</h2><i class="bi bi-chevron-right"></i></div><div class="btn-group"><button class="btn btn-sm btn-light">Month</button><button class="btn btn-sm btn-light">Week</button></div></div>
              <div class="calendar-grid">
                ${days.map((d) => `<div class="calendar-head">${d}</div>`).join("")}
                ${cells.map((n) => `<div class="calendar-day ${n === 10 ? "active" : ""}"><span class="text-muted">${n}</span>${n === 4 ? `<a class="cal-pill" href="order-detail.html">2 Pending</a>` : ""}${n === 6 ? `<a class="cal-pill" href="order-detail.html" style="color:#8a5a00;background:#dfc39a">1 Delivered</a>` : ""}${n === 10 ? `<a class="cal-pill" href="order-detail.html">4 Pending</a><a class="cal-pill" href="dispatch.html" style="color:#8a5a00;background:#dfc39a">2 Delivered</a>` : ""}</div>`).join("")}
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-3">
            <div class="ap-card"><div class="ap-card-body"><h2 class="h4 fw-bold mb-1">May 10, 2026</h2><p class="text-muted">6 Jobs Total</p><hr><div class="label-caps mb-2">Pending (4)</div>${sideEvent("ORD-2026-881", "Smith Wedding Album", "Due: 3:00 PM")}${sideEvent("ORD-2026-885", "Johnson Engagement", "Due: EOD")}<div class="label-caps mt-4 mb-2">Delivered (2)</div>${sideEvent("ORD-2026-870", "Miller Maternity Folio", "Dispatched")}</div></div>
          </div>
        </div>
      `;
    },

    files() {
      return `
        ${pageHeader("files", `<a class="btn btn-ap-primary" href="proof.html"><i class="bi bi-cloud-upload me-2"></i>Share Proof</a>`)}
        ${statCards([
          { label: "Raw Photo Folders", value: "18", icon: "bi-images" },
          { label: "Proofs Awaiting Approval", value: "7", icon: "bi-eye" },
          { label: "Print-Ready Files", value: "12", icon: "bi-printer" },
          { label: "Storage Used", value: "62%", icon: "bi-hdd" }
        ])}
        <div class="ap-card">
          <div class="ap-card-header"><h2 class="h4 fw-bold m-0">Project File Register</h2></div>
          ${fileTile("ALB-1042 Raw Photos", "Google Drive - customer upload complete", "bi-images", "order-detail.html", chip("Approved"))}
          ${fileTile("ALB-1042 Proof V2", "Shared with customer for approval", "bi-eye", "proof.html", chip("Proof Shared"))}
          ${fileTile("Cover and Box Artwork", "Name/date layout ready", "bi-box", "proof.html", chip("Pending"))}
          ${fileTile("Print-Ready PDF", "Locked after written approval", "bi-file-earmark-pdf", "job-sheet.html", chip("Ready to Ship"))}
        </div>
      `;
    },

    proof() {
      return `
        ${pageHeader("proof", `<a class="btn btn-ap-ghost" href="files.html">Back to Files</a><a class="btn btn-ap-primary" href="production.html">Approve for Print</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-8">
            <div class="ap-card">
              <div class="ap-card-header d-flex justify-content-between"><h2 class="h4 fw-bold m-0">ALB-1042 Proof V2</h2>${chip("Proof Shared")}</div>
              <div class="ap-card-body">
                <div class="row g-3">
                  ${proofThumb("Cover", "Acrylic title cover")}
                  ${proofThumb("Spread 01", "Getting ready")}
                  ${proofThumb("Spread 02", "Ceremony")}
                  ${proofThumb("Spread 03", "Family portraits")}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-4">
            <div class="ap-card mb-4"><div class="ap-card-body"><div class="label-caps">Approval Message</div><p class="mt-2">Please review photo sequence, cover names, event date, sheet count, and spelling. Reply APPROVED FOR PRINT when final.</p><a class="btn btn-ap-primary w-100" href="production.html">Lock Approved Version</a></div></div>
            <div class="ap-card"><div class="ap-card-header"><h2 class="h5 fw-bold m-0">Revision Log</h2></div><div class="ap-card-body timeline"><div class="timeline-item"><strong>V1 shared</strong><div class="text-muted">May 05, 10:40 AM</div></div><div class="timeline-item"><strong>V2 uploaded</strong><div class="text-muted">Photo swap and cover adjustment complete.</div></div></div></div>
          </div>
        </div>
      `;
    },

    production() {
      const cols = [
        ["Pre-press", "3", [["#ORD-4921", "Smith Wedding Album", "12x12 Acrylic"], ["#ORD-4925", "Ravi and Sneha", "12x36 Landscape"]]],
        ["Printing", "2", [["#ORD-4918", "Johnson Family Portrait", "10x10 Leather"]]],
        ["Binding", "1", [["#ORD-4905", "Davis Corporate Event", "8x12 Linen"]]],
        ["Waiting QC", "4", [["#ORD-4899", "Miller Golden Jubilee", "12x12 Premium"]]]
      ];
      return `
        ${pageHeader("production", `<a class="btn btn-ap-ghost" href="production.html"><i class="bi bi-filter me-2"></i>Filter</a><a class="btn btn-ap-primary" href="new-order.html">New Job</a>`)}
        <div class="kanban">
          ${cols.map((col) => `<section class="kanban-column"><div class="kanban-header"><h2 class="h5 m-0 text-primary">${col[0]}</h2><span class="chip chip-gray">${col[1]}</span></div>${col[2].map((card, idx) => `<a class="job-card d-block text-decoration-none text-reset ${idx === 0 && col[0] === "Waiting QC" ? "highlight" : ""}" href="order-detail.html"><div class="d-flex justify-content-between"><strong class="text-primary">${card[0]}</strong><span class="small text-danger">●</span></div><div class="mt-2">${card[1]}</div><div class="mt-3 d-flex justify-content-between align-items-center"><span class="chip chip-gray">${card[2]}</span><i class="bi bi-arrow-right"></i></div></a>`).join("")}</section>`).join("")}
        </div>
      `;
    },

    qc() {
      return `
        ${pageHeader("qc", `<a class="btn btn-ap-primary" href="dispatch.html">Pass and Pack</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-7">
            <div class="ap-card">
              <div class="ap-card-header"><h2 class="h4 fw-bold m-0">Final QC Checklist - ALB-1042</h2></div>
              <div class="ap-card-body">
                ${["Correct customer name", "Correct event date on cover/title", "Correct sheet/page count", "No low-resolution print surprises", "No lamination bubbles or glue marks", "Binding opens properly", "Correct box and bag packed", "Balance payment status checked"].map((label, idx) => `<div class="form-check py-2 border-bottom"><input class="form-check-input" type="checkbox" ${idx < 5 ? "checked" : ""}><label class="form-check-label fw-semibold">${label}</label></div>`).join("")}
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-5">
            <div class="ap-card mb-4"><div class="ap-card-body"><div class="label-caps">QC Queue</div><h2 class="display-6 fw-bold mt-2">9</h2><p class="text-muted">4 waiting inspection, 3 rework holds, 2 cleared for packing.</p></div></div>
            ${orderTable(orders.slice(1, 4))}
          </div>
        </div>
      `;
    },

    dispatch() {
      return `
        ${pageHeader("dispatch", `<a class="btn btn-ap-ghost" href="dispatch.html">Export CSV</a>`)}
        <div class="ap-card overflow-hidden mb-5">
          <div class="table-responsive">
            <table class="table table-ap">
              <thead><tr><th>Order #</th><th>Customer</th><th>Destination</th><th>Status</th><th>AWB Tracking</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>ORD-8902</td><td>Sarah Jenkins Photo</td><td>New York, NY</td><td>${chip("Ready to Pack")}</td><td class="text-muted fst-italic">Pending</td><td><a class="link-ap" href="order-detail.html">Open</a></td></tr>
                <tr><td>ORD-8895</td><td>Vision Studios</td><td>Austin, TX</td><td>${chip("Packed")}</td><td class="text-muted fst-italic">Pending</td><td><a class="link-ap" href="order-detail.html">Open</a></td></tr>
                <tr><td>ORD-8870</td><td>Elevate Weddings</td><td>Chicago, IL</td><td>${chip("Dispatched")}</td><td>FDX-993821004</td><td><a class="link-ap" href="order-detail.html">Open</a></td></tr>
                <tr><td>ORD-8851</td><td>Momentum Media</td><td>Seattle, WA</td><td>${chip("Delivered")}</td><td>UPS-1Z9992300</td><td><a class="link-ap" href="order-detail.html">Open</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr class="my-5">
        <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4"><div><h2 class="page-title">Financial Overview</h2><p class="page-subtitle">Track job payments and outstanding balances.</p></div><a class="btn btn-ap-primary" href="record-payment.html"><i class="bi bi-plus-lg me-2"></i>Record Payment</a></div>
        ${paymentOverview()}
      `;
    },

    payments() {
      return `
        ${pageHeader("payments", `<a class="btn btn-ap-primary" href="record-payment.html"><i class="bi bi-plus-lg me-2"></i>Record Payment</a>`)}
        ${paymentOverview()}
      `;
    },

    "record-payment"() {
      return formPage("record-payment", "payments.html", [
        ["Order Number", "ALB-1042", "text"],
        ["Customer", "Pranav Kumar", "text"],
        ["Amount Received", "Rs 9,500", "text"],
        ["Payment Mode", "UPI", "text"],
        ["Reference", "UPI-2026-77821", "text"],
        ["Received Date", "", "date"]
      ], "Record Payment");
    },

    reports() {
      return `
        ${pageHeader("reports", `<a class="btn btn-ap-ghost" href="reports.html"><i class="bi bi-calendar3 me-2"></i>Last 30 Days</a><a class="btn btn-ap-primary" href="reports.html"><i class="bi bi-download me-2"></i>Export</a>`)}
        ${statCards([
          { label: "Avg Turnaround", value: "4.2 days", icon: "bi-stopwatch" },
          { label: "Monthly Revenue", value: "Rs 124K", icon: "bi-cash-stack" },
          { label: "Top Format", value: "12x12", icon: "bi-book" }
        ])}
        <div class="row g-4">
          <div class="col-12 col-xl-6"><div class="ap-card"><div class="ap-card-body"><h2 class="h4 fw-bold mb-4">Orders by Stage</h2>${bar("Pre-Press", 142, 100, "var(--ap-primary-soft)")}${bar("Printing", 85, 60, "#aec8f4")}${bar("Binding", 45, 32, "var(--ap-secondary)")}${bar("QC and Packing", 28, 20, "#ecbf7f")}</div></div></div>
          <div class="col-12 col-xl-6"><div class="ap-card"><div class="ap-card-header d-flex justify-content-between"><h2 class="h4 fw-bold m-0">Team Activity</h2><a href="settings.html" class="link-ap">Manage Team</a></div><div class="ap-card-body">${teamRow("JD", "Jane Doe", "Lead Binder", "Active")}${teamRow("AS", "Alex Smith", "QC Specialist", "Offline")}${teamRow("SM", "Sarah M.", "Dispatch Coordinator", "Active")}</div></div></div>
        </div>
      `;
    },

    settings() {
      return `
        ${pageHeader("settings", `<a class="btn btn-ap-primary" href="settings.html" data-toast="Settings saved for demo">Save Settings</a>`)}
        <div class="row g-4">
          <div class="col-12 col-xl-6">
            <div class="ap-card mb-4"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Company Profile</h2></div><div class="ap-card-body"><div class="row g-3">${input("Business Name", "AlbumPress OS Demo Lab", "col-md-6")}${input("GSTIN", "29ABCDE1234F1Z5", "col-md-6")}${input("Phone", "+91 98765 43210", "col-md-6")}${input("City", "Bangalore", "col-md-6")}</div></div></div>
            <div class="ap-card"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Workflow Stages</h2></div><div class="ap-card-body">${["Lead received", "Files received", "Proof shared", "Approved for print", "Printing", "Binding", "QC", "Packed", "Dispatched", "Delivered"].map((s) => `<span class="chip chip-gray me-2 mb-2">${s}</span>`).join("")}</div></div>
          </div>
          <div class="col-12 col-xl-6">
            <div class="ap-card mb-4"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Catalog Defaults</h2></div><div class="ap-card-body"><div class="row g-3">${input("Default Album Size", "12x12 Lay-flat", "col-md-6")}${input("Default Paper", "Lustre Premium", "col-md-6")}${input("Default Coating", "UV Matte", "col-md-6")}${input("Default Margin", "35%", "col-md-6")}</div></div></div>
            <div class="ap-card"><div class="ap-card-header"><h2 class="h4 fw-bold m-0">Team</h2></div><div class="ap-card-body">${teamRow("PK", "Pranav Kumar", "Owner", "Active")}${teamRow("JD", "Jane Doe", "Lead Binder", "Active")}${teamRow("AS", "Alex Smith", "QC Specialist", "Offline")}</div></div>
          </div>
        </div>
      `;
    },

    "job-sheet"() {
      return `
        ${pageHeader("job-sheet", `<a class="btn btn-ap-ghost" href="order-detail.html">Back to Order</a><button class="btn btn-ap-primary" onclick="window.print()"><i class="bi bi-printer me-2"></i>Print</button>`)}
        <div class="print-sheet">
          <div class="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
            <div><h2 class="h3 fw-bold text-primary">AlbumPress OS</h2><div class="text-muted">Internal Production Job Sheet</div></div>
            <div class="text-end"><div class="label-caps">Order No</div><div class="h4 fw-bold">ALB-1042</div></div>
          </div>
          <div class="row g-4 mb-4">
            ${spec("Customer", "Pranav Kumar / Studio LensCraft")}
            ${spec("Event", "Ravi and Sneha Wedding")}
            ${spec("Delivery Deadline", "May 28, 2026")}
            ${spec("Payment Status", "Advance received - balance due")}
          </div>
          <h3 class="h5 fw-bold border-bottom pb-2">Album Specification</h3>
          <div class="row g-4 mb-4">${spec("Size", "12x36 Landscape")}${spec("Sheets", "45 sheets / 90 pages")}${spec("Paper", "Lustre Premium")}${spec("Finish", "UV Matte Coating")}${spec("Binding", "Layflat Flush Mount")}${spec("Cover", "Acrylic front + leatherette back")}</div>
          <h3 class="h5 fw-bold border-bottom pb-2">Production Checklist</h3>
          <div class="row g-2">${["Files backed up", "Selection locked", "Proof approved", "Print-ready PDF exported", "Pre-press cleared", "Printing", "Lamination", "Binding", "Cover ready", "Final QC", "Packed", "Dispatched"].map((s) => `<div class="col-12 col-md-4"><div class="border rounded-2 p-2">[ ] ${s}</div></div>`).join("")}</div>
        </div>
      `;
    }
  };

  function paymentOverview() {
    return `
      ${statCards([
        { label: "Total Quoted", value: "Rs 124,500", icon: "bi-receipt" },
        { label: "Advance Received", value: "Rs 68,200", icon: "bi-cash", chip: "chip-teal" },
        { label: "Outstanding Balance", value: "Rs 14,300", icon: "bi-exclamation-circle", chip: "chip-red" },
        { label: "Fully Paid (MTD)", value: "Rs 42,000", icon: "bi-check2-circle" }
      ])}
      <div class="ap-card overflow-hidden">
        <div class="table-responsive">
          <table class="table table-ap">
            <thead><tr><th>Job No</th><th>Customer</th><th>Amount</th><th>Balance</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>JB-24-102</td><td>Sarah Jenkins Photo</td><td>Rs 1,200.00</td><td>Rs 600.00</td><td>${chip("Pending")}</td><td><a class="link-ap" href="record-payment.html">Record</a></td></tr>
              <tr><td>JB-24-098</td><td>Elevate Weddings</td><td>Rs 3,450.00</td><td>Rs 0.00</td><td>${chip("Paid")}</td><td><a class="link-ap" href="order-detail.html">Open</a></td></tr>
              <tr><td>JB-24-085</td><td>Momentum Media</td><td>Rs 850.00</td><td class="text-danger">Rs 850.00</td><td>${chip("Overdue")}</td><td><a class="link-ap" href="record-payment.html">Record</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function formPage(key, backHref, fields, submitText) {
    return `
      ${pageHeader(key, `<a class="btn btn-ap-ghost" href="${backHref}">Cancel</a><a class="btn btn-ap-primary" href="${backHref}">${submitText}</a>`)}
      <div class="ap-card">
        <div class="ap-card-body">
          <div class="row g-3">
            ${fields.map((field) => input(field[0], field[1], "col-12 col-md-6", field[2])).join("")}
            <div class="col-12"><label class="form-label">Notes</label><textarea class="form-control" rows="5">Customer prefers a clean premium album with matte pages, acrylic cover, and matching box.</textarea></div>
          </div>
        </div>
      </div>
    `;
  }

  function input(label, value, cls = "col-md-6", type = "text") {
    return `<div class="${cls}"><label class="form-label">${label}</label><input class="form-control" type="${type}" value="${value}"></div>`;
  }

  function spec(label, value) {
    return `<div class="col-12 col-md-6 col-xl-4"><div class="label-caps">${label}</div><div class="fw-semibold mt-1">${value}</div></div>`;
  }

  function fileTile(title, subtitle, icon, href, trailing = `<i class="bi bi-box-arrow-up-right"></i>`) {
    return `<div class="file-tile"><div class="d-flex gap-3 align-items-center"><span class="file-icon"><i class="bi ${icon}"></i></span><div><a class="fw-semibold text-decoration-none text-reset" href="${href}">${title}</a><div class="text-muted small">${subtitle}</div></div></div><a class="link-ap" href="${href}">${trailing}</a></div>`;
  }

  function sideEvent(id, title, meta) {
    return `<a class="d-block text-decoration-none text-reset p-3 border rounded-3 mb-2 bg-light" href="order-detail.html"><div class="fw-bold text-primary">${id}</div><div>${title}</div><div class="small text-muted mt-1">${meta}</div></a>`;
  }

  function proofThumb(title, subtitle) {
    return `<div class="col-12 col-md-6"><a class="d-block text-decoration-none text-reset border rounded-3 overflow-hidden" href="proof.html"><div class="ratio ratio-4x3" style="background:linear-gradient(135deg,#f4f3f7,#e3e2e5)"><div class="d-flex align-items-center justify-content-center text-primary"><i class="bi bi-images fs-1"></i></div></div><div class="p-3"><strong>${title}</strong><div class="text-muted small">${subtitle}</div></div></a></div>`;
  }

  function bar(label, value, width, color) {
    return `<div class="mb-4"><div class="d-flex justify-content-between mb-2"><span>${label}</span><span>${value}</span></div><div class="progress" style="height:12px;background:#e4e3e7"><div class="progress-bar" style="width:${width}%;background:${color}"></div></div></div>`;
  }

  function teamRow(initials, name, role, status) {
    return `<div class="d-flex align-items-center justify-content-between gap-3 p-3 border rounded-3 mb-3"><div class="d-flex align-items-center gap-3"><span class="avatar">${initials}</span><div><div class="fw-bold">${name}</div><div class="label-caps">${role}</div></div></div>${chip(status)}</div>`;
  }

  function navHtml(activeKey, extraClass = "") {
    return navItems.map(([key, label, icon, href]) => `
      <a class="nav-link-ap ${extraClass} ${activeKey === key ? "active" : ""}" href="${href}">
        <i class="bi ${icon}"></i><span>${label}</span>
      </a>
    `).join("");
  }

  function mobileNav(activeKey) {
    const items = navItems.filter(([key]) => ["dashboard", "orders", "production", "qc", "payments"].includes(key));
    return `<nav class="mobile-bottom d-lg-none">${items.map(([key, label, icon, href]) => `<a class="${activeKey === key ? "active" : ""}" href="${href}"><i class="bi ${icon}"></i><span>${label}</span></a>`).join("")}</nav>`;
  }

  function shell(pageKey, content) {
    const activeKey = activeMap[pageKey] || pageKey;
    const [title] = pageMeta[pageKey] || pageMeta.dashboard;
    document.title = `${title} - AlbumPress OS`;
    return `
      <div class="app-shell">
        <aside class="app-sidebar d-none d-lg-flex">
          <a class="d-flex align-items-center gap-3 text-decoration-none mb-2" href="index.html">
            <span class="brand-mark">A</span>
            <span><span class="brand-title d-block">AlbumPress OS</span><span class="brand-subtitle d-block">Production Manager</span></span>
          </a>
          <div class="nav-list flex-grow-1">${navHtml(activeKey)}</div>
        </aside>
        <div class="app-workspace">
          <header class="app-topbar">
            <button class="icon-button d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="Open menu"><i class="bi bi-list fs-3"></i></button>
            <div class="search-box"><i class="bi bi-search fs-5"></i><span class="text-truncate">Search orders, leads...</span></div>
            <div class="ms-auto d-flex align-items-center gap-1">
              <a class="icon-button" href="reports.html" aria-label="Notifications"><i class="bi bi-bell fs-5"></i></a>
              <a class="icon-button" href="settings.html" aria-label="Help"><i class="bi bi-question-circle fs-5"></i></a>
              <a class="avatar text-decoration-none" href="settings.html">AP</a>
            </div>
          </header>
          <main class="app-main">${content}</main>
        </div>
        ${mobileNav(activeKey)}
        <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu">
          <div class="offcanvas-header">
            <div class="d-flex align-items-center gap-3"><span class="brand-mark">A</span><div><div class="brand-title">AlbumPress OS</div><div class="brand-subtitle">Production Manager</div></div></div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body"><div class="nav-list mt-0">${navHtml(activeKey)}</div></div>
        </div>
        <div class="toast-container position-fixed top-0 end-0 p-3"><div id="demoToast" class="toast" role="status"><div class="toast-body">Demo action complete.</div></div></div>
      </div>
    `;
  }

  function attachDemoActions() {
    const toastEl = document.getElementById("demoToast");
    if (!toastEl || !window.bootstrap) return;
    const toast = new bootstrap.Toast(toastEl, { delay: 1800 });
    document.querySelectorAll("[data-toast]").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        toastEl.querySelector(".toast-body").textContent = el.getAttribute("data-toast") || "Demo action complete.";
        toast.show();
      });
    });
  }

  function render() {
    const pageKey = document.body.dataset.page || "dashboard";
    const content = (pages[pageKey] || pages.dashboard)();
    document.getElementById("app").innerHTML = shell(pageKey, content);
    attachDemoActions();
  }

  render();
})();
