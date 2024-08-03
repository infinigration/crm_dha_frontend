import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import { leadsReducer } from "./reducers/leadsReducer";
import { adminReducer } from "./reducers/adminReducer";
import { programReducer } from "./reducers/programReducer";
import { contractReducer } from "./reducers/contractReducer";
import { invoiceReducer } from "./reducers/invoiceReducer";
import { remarkReducer } from "./reducers/remarksReducer";
import { clientReducer } from "./reducers/clientReducer";
import { processReducer } from "./reducers/processReducer";
import { vendorReducer } from "./reducers/vendorReducer";
import { bankReducer } from "./reducers/bankReducer";
import { otherReducer } from "./reducers/otherReducer";

export const server = "https://infinigration-crm-backend.onrender.com/api/v1";
export const store = configureStore({
  reducer: {
    user: authReducer,
    leads: leadsReducer,
    admin: adminReducer,
    program: programReducer,
    contract: contractReducer,
    invoices: invoiceReducer,
    remarks: remarkReducer,
    clients: clientReducer,
    process: processReducer,
    vendor: vendorReducer,
    bank: bankReducer,
    other: otherReducer,
  },
});
