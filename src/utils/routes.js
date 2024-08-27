export const routes = [
  {
    value: "/admin/dashboard",
    label: "Dashboard",
  },
  { value: "/admin/leads", label: "Leads" },
  { value: "/admin/clients", label: "Clients" },
  {
    value: "/admin/contracts",
    label: "Contracts",
  },

  {
    value: "/admin/programs",
    label: "Programs",
  },
  {
    value: "/admin/finances",
    label: "Finance",
    subLinks: [
      {
        value: "/admin/invoices",
        label: "Invoices",
      },

      {
        value: "/admin/finances/incomings",
        label: "Incomings",
      },
      {
        value: "/admin/finances/payments-received",
        label: "Payments Received",
      },

      {
        value: "/admin/finances/expense",
        label: "Expenses",
      },

      {
        value: "/admin/finances/credit-notes",
        label: "Credit Notes",
      },

      {
        value: "/admin/finances/bills",
        label: "Bills",
      },

      {
        value: "/admin/finances/payments-made",
        label: "Payments Made",
      },

      {
        value: "/admin/finances/vendor-credits",
        label: "Vendor Credits",
      },

      {
        value: "/admin/finances/vendor-payments",
        label: "Vendor Payments",
      },

      {
        value: "/admin/finances/payrolls",
        label: "Employee Payrolls",
      },
    ],
  },
  { value: "/admin/reports", label: "Reports" },
  {
    value: "/admin/settings",
    label: "Settings",
  },
];

export const salesRoutes = [
  {
    value: "/sales",
    label: "Dashboard",
  },

  {
    value: "/sales/leads",
    label: "Leads",
  },
  {
    value: "/profile",
    label: "Profile",
  },
];

export const marketingRoutes = [
  {
    value: "/marketing",
    label: "Dashboard",
  },
  {
    value: "/marketing/leads",
    label: "Leads",
  },

  {
    value: "/marketing/returned-leads",
    label: "Returned Leads",
  },

  {
    value: "/profile",
    label: "Profile",
  },
];

export const operationRoutes = [

  {
    value: "/operations",
    label: "Dashboard"
  },
  {
    value: "/operations/leads",
    label: "Leads",
  },

  {
    value: "/operations/contracts",
    label: "Contracts",
  },

  {
    value: "/operations/clients",
    label: "Clients",
  },
  {
    value: "/profile",
    label: "Profile",
  },
];
