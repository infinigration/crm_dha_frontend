import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../../pages/admin/dashboard/AdminDashboard";
import Sidebar from "../../componets/sidebar/Sidebar";
import { LuLayoutDashboard } from "react-icons/lu";
import Settings from "../../pages/admin/settings/Settings";
import LeadSettings from "../../pages/admin/settings/LeadSettings";
import EmployeeSettings from "../../pages/admin/settings/EmployeeSettings";
import AdminLeads from "../../pages/admin/leads/AdminLeads";
import LeadActivities from "../../pages/admin/leads/LeadActivities";
import AbroadQuestions from "../../pages/admin/settings/AbroadQuestions";
import AddQuestions from "../../pages/admin/settings/AddQuestions";
import Contracts from "../../pages/admin/contracts/Contracts";
import AdminInvoices from "../../pages/admin/invoices/AdminInvoices";
import { ProtectedRoute } from "protected-route-react";
const AdminRoutes = ({ isAuthenticated, user }) => {
  const routes = [
    {
      value: "/admin/dashboard",
      label: "Dashboard",
      icon: { LuLayoutDashboard },
    },
    { value: "/admin/leads", label: "Leads", icon: { LuLayoutDashboard } },
    {
      value: "/admin/contracts",
      label: "Contracts",
      icon: { LuLayoutDashboard },
    },
    {
      value: "/admin/invoices",
      label: "Invoices",
      icon: { LuLayoutDashboard },
    },
    {
      value: "/admin/programs",
      label: "Programs",
      icon: { LuLayoutDashboard },
    },
    { value: "/admin/finances", label: "Finance", icon: { LuLayoutDashboard } },
    { value: "/admin/reports", label: "Reports", icon: { LuLayoutDashboard } },
    {
      value: "/admin/settings",
      label: "Settings",
      icon: { LuLayoutDashboard },
    },
  ];
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
              <Sidebar navLists={routes} component={AdminDashboard} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={Settings}
                pageTitle="Settings"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings/leads"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={LeadSettings}
                pageTitle="Leads Settings"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings/employees"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={EmployeeSettings}
                pageTitle="Employee Settings"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AdminLeads}
                pageTitle="Leads"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings/abroad-questions"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AbroadQuestions}
                pageTitle="Abroad Questions"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings/abroad-questions/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AddQuestions}
                pageTitle="Add Questions"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leads/:id/activities"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={LeadActivities}
                pageTitle="Lead Activities"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contracts"
          element={
            <Sidebar
              navLists={routes}
              component={Contracts}
              pageTitle="Contracts"
            />
          }
        />

        <Route
          path="/admin/invoices"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={Contracts}
                pageTitle="Contracts"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/programs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AddQuestions}
                pageTitle="Programs"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/finances"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AddQuestions}
                pageTitle="Finances"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirect="/"
              redirectAdmin="/"
            >
              <Sidebar
                navLists={routes}
                component={AddQuestions}
                pageTitle="Programs"
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
