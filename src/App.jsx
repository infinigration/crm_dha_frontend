import React, { useEffect } from "react";
import AdminRoutes from "./utils/Routes/AdminRoutes";
import MarketingRoutes from "./utils/Routes/MarketingRoutes";
import "./style.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./pages/loader/Loader";
import { toast, Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";
import { loadUser } from "./redux/actions/auth";
import { LuLayoutDashboard } from "react-icons/lu";
import Sidebar from "./componets/sidebar/Sidebar";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import Settings from "./pages/admin/settings/Settings";
import LeadSettings from "./pages/admin/settings/LeadSettings";
import EmployeeSettings from "./pages/admin/settings/EmployeeSettings";
import AdminLeads from "./pages/admin/leads/AdminLeads";
import AbroadQuestions from "./pages/admin/settings/AbroadQuestions";
import AddQuestions from "./pages/admin/settings/AddQuestions";
import LeadActivities from "./pages/admin/leads/LeadActivities";
import Contracts from "./pages/admin/contracts/Contracts";
import AdminInvoices from "./pages/admin/invoices/AdminInvoices";
import Programs from "./pages/admin/programs/Programs";
import AdminFinances from "./pages/admin/finances/AdminFinances";
import Reports from "./pages/admin/reports/Reports";
import AddLeads from "./pages/admin/leads/AddLeads";
import CreateContract from "./pages/admin/contracts/CreateContract";
import AddNewProgram from "./pages/admin/programs/AddNewProgram";
import AddNewEmployee from "./pages/admin/settings/employees/AddNewEmployee";
import ChangePassword from "./pages/admin/settings/employees/ChangePassword";
import EmployeeProfile from "./pages/admin/settings/employees/EmployeeProfile";
import ProgramDetails from "./pages/admin/programs/ProgramDetails";
import PaymentsReceived from "./pages/admin/finances/PaymentsReceived";
import CreditNotes from "./pages/admin/finances/CreditNotes";
import PaymentsMade from "./pages/admin/finances/PaymentsMade";
import Bills from "./pages/admin/finances/Bills";
import Expense from "./pages/admin/finances/Expense";
import ViewContract from "./pages/admin/contracts/ViewContract";
import Profile from "./pages/employees/Profile/Profile";

import LocomotiveScroll from "locomotive-scroll";
import CreateInvoice from "./pages/admin/invoices/CreateInvoice";
import ViewInvoice from "./pages/admin/invoices/ViewInvoice";
import Leads from "./pages/employees/Leads/Leads";
import {
  routes,
  marketingRoutes,
  salesRoutes,
  operationRoutes,
} from "./utils/routes";
import { createLead } from "./redux/actions/leads";
import Remarks from "./pages/employees/Remarks/Remarks";
import AdminClients from "./pages/admin/clients/AdminClients";
import AddClients from "./pages/admin/clients/AddClients";
import UpdateProgram from "./pages/admin/programs/UpdateProgram";
import Vendor from "./pages/admin/settings/vendors/Vendor";
import VendorPayments from "./pages/admin/finances/VendorPayments";
import Banks from "./pages/admin/finances/Banks";
import AddNewBank from "./pages/admin/finances/AddNewBank";
import EmployeePayroll from "./pages/admin/finances/EmployeePayroll";
import Incomings from "./pages/admin/finances/Incomings";
import AddNewVendor from "./pages/admin/settings/vendors/AddNewVendor";
import EditLead from "./pages/employees/Leads/EditLead";
import Dashboard from "./pages/employees/dashboard/Dashboard";
import MarketingLeads from "./pages/employees/marketing/MarketingLeads";
import ReturnedLeads from "./pages/employees/marketing/ReturnedLeads";
import SalesLeads from "./pages/employees/sales/SalesLeads";
import ReturnLead from "./pages/employees/sales/ReturnLead";
import OpearationLeads from "./pages/employees/operations/OperationLeads";
import UpdateLeadStatus from "./pages/employees/sales/UpdateLeadStatus";
import ShuffledLeads from "./pages/employees/marketing/ShuffledLeads";
import SalesShuffledLeads from "./pages/employees/sales/SalesShuffledLeads";
import OperationContracts from "./pages/employees/operations/OperationContracts";
import CreateContractOperation from "./pages/employees/operations/CreateContractOperation";
import UpdateOperationStatus from "./pages/employees/operations/UpdateOperationStatus";
import UpdateOperationStage from "./pages/employees/operations/UpdateOperationStage";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const user = useSelector((state) => state.user.auth?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect={
                  user && user.role === "admin"
                    ? "/admin/dashboard"
                    : user && user.job.department === "marketing"
                      ? "/marketing"
                      : user && user.job.department === "sales"
                        ? "/sales"
                        : user && user.job.department === "operations"
                          ? "/operations"
                          : ""
                }
              >
                <Login />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect={
                  user && user.role === "admin"
                    ? "/admin/dashboard"
                    : "/profile"
                }
              >
                <Login />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/marketing"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar component={Dashboard} navLists={marketingRoutes} />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/marketing/leads"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={MarketingLeads}
                  navLists={marketingRoutes}
                  pageTitle="Leads"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/marketing/returned-leads"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={ReturnedLeads}
                  navLists={marketingRoutes}
                  pageTitle="Returned Leads"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/marketing/shuffled-leads"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={ShuffledLeads}
                  navLists={marketingRoutes}
                  pageTitle="Shuffled Leads"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sales/shuffled-leads"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={SalesShuffledLeads}
                  navLists={salesRoutes}
                  pageTitle="Shuffled Leads"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar component={Dashboard} navLists={operationRoutes} />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/contracts"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={OperationContracts}
                  navLists={operationRoutes}
                  pageTitle="Contracts"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operation/contract/:id/activities"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={LeadActivities}
                  navLists={operationRoutes}
                  pageTitle="Contract Details"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operation/contract/:id/view"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={ViewContract}
                  navLists={operationRoutes}
                  pageTitle="Contract Details"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operation/contract/:id/updatestatus"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={UpdateOperationStatus}
                  navLists={operationRoutes}
                  pageTitle="Update Operation Status"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/programs"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={Programs}
                  navLists={operationRoutes}
                  pageTitle="Update Operation Status"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/programs/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={AddNewProgram}
                  navLists={operationRoutes}
                  pageTitle="Add New Program"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/program/:id/view"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={ProgramDetails}
                  navLists={operationRoutes}
                  pageTitle="Program Details"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/program/:id/update"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={UpdateProgram}
                  navLists={operationRoutes}
                  pageTitle="Update Program"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operation/contract/:id/updatestage"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={UpdateOperationStage}
                  navLists={operationRoutes}
                  pageTitle="Update Stage"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/contracts/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={CreateContractOperation}
                  navLists={operationRoutes}
                  pageTitle="Create Contract"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/operations/clients"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={AdminClients}
                  navLists={operationRoutes}
                  pageTitle="Clients"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AdminDashboard}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sales"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar component={Dashboard} navLists={salesRoutes} />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sales/leads"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={SalesLeads}
                  navLists={salesRoutes}
                  pageTitle="Leads"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sales/leads/:id/activities"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={LeadActivities}
                  navLists={salesRoutes}
                  pageTitle="Lead Details"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sales/leads/:id/updatestatus"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={UpdateLeadStatus}
                  navLists={salesRoutes}
                  pageTitle="Update Lead Status"
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sales/leads/:id/return"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect={"/"}>
                <Sidebar
                  component={ReturnLead}
                  navLists={salesRoutes}
                  pageTitle="Return Lead"
                />
              </ProtectedRoute>
            }
          ></Route>

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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={EmployeeSettings}
                  pageTitle="Employee Settings"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings/employees/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AddNewEmployee}
                  pageTitle="Add New Employee"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings/employees/:id/changepassword"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={ChangePassword}
                  pageTitle="Change Password"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings/employees/:id/profile"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={EmployeeProfile}
                  pageTitle="Profile Settings"
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
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
                navLists={
                  isAuthenticated && user.role === "admin" ? routes : ""
                }
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AdminInvoices}
                  pageTitle="Invoices"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/invoices/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={CreateInvoice}
                  pageTitle="Create Invoice"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/invoices/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={ViewInvoice}
                  pageTitle="View Invoice"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/invoices/add/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={CreateInvoice}
                  pageTitle="Create Invoice"
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={Programs}
                  pageTitle="Programs"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/program/:id/update"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={UpdateProgram}
                  pageTitle="Update Program"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AdminClients}
                  pageTitle="Clients"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={operationRoutes}
                  component={AdminClients}
                  pageTitle="Clients"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clients/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AddClients}
                  pageTitle="Add Clients"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/program/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={ProgramDetails}
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
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={Banks}
                  pageTitle="Banks"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bank/new"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AddNewBank}
                  pageTitle="Create New Bank"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bank/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={AdminFinances}
                  pageTitle="Bank Dashboard"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/payments-received"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={PaymentsReceived}
                  pageTitle="Payments Received"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/credit-notes"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={CreditNotes}
                  pageTitle="Credit Notes"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/expense"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={Expense}
                  pageTitle="Expenses"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/bills"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirect="/"
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.role === "admin" ? routes : ""
                  }
                  component={Bills}
                  pageTitle="Bills"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/payments-made"
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
                  component={PaymentsMade}
                  pageTitle="Payments Made"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/vendor-credits"
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
                  component={CreditNotes}
                  pageTitle="Vendor Credits"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/payrolls"
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
                  component={EmployeePayroll}
                  pageTitle="Employee Payrolls"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/incomings"
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
                  component={Incomings}
                  pageTitle="Incomings"
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
                  component={Reports}
                  pageTitle="Reports"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/leads/add"
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
                  component={AddLeads}
                  pageTitle="Create New Lead"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/contracts/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "operations"
                      ? operationRoutes
                      : routes
                  }
                  component={CreateContract}
                  pageTitle="Create New Contract"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/contracts/add/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={routes}
                  component={CreateContract}
                  pageTitle="Create New Contract"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/contracts/add/:id"
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
                  component={CreateContract}
                  pageTitle="Create New Contract"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/contract/:id"
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
                  component={ViewContract}
                  pageTitle="View Contract"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/programs/add"
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
                  component={AddNewProgram}
                  pageTitle="Create New Program"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/vendors"
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
                  component={Vendor}
                  pageTitle="Vendors"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/vendors/add"
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
                  component={AddNewVendor}
                  pageTitle="Add New Vendor"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/finances/vendor-payments"
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
                  component={VendorPayments}
                  pageTitle="Vendor Payments"
                />
              </ProtectedRoute>
            }
          />

          {/* Employee Routes */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={Profile}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={Leads}
                  pageTitle="Leads"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editlead/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={EditLead}
                  pageTitle="Edit Lead"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contracts"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={Contracts}
                  pageTitle="Contracts"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads/add"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={AddLeads}
                  pageTitle="Create Lead"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads/view/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={LeadActivities}
                  pageTitle="Create Lead"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads/remarks/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={Remarks}
                  pageTitle="Remarks"
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leads/:id/activities"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="/"
              >
                <Sidebar
                  navLists={
                    isAuthenticated && user.job.department === "marketing"
                      ? marketingRoutes
                      : isAuthenticated && user.job.department === "sales"
                        ? salesRoutes
                        : isAuthenticated && user.job.department === "operations"
                          ? operationRoutes
                          : routes
                  }
                  component={LeadActivities}
                  pageTitle="Remarks"
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <Toaster />
    </>
  );
};

export default App;
