import { createReducer } from "@reduxjs/toolkit";

export const invoiceReducer = createReducer(
  {},
  {
    createInvoiceRequest: (state) => {
      state.loading = true;
    },
    createInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllInvoiceRequest: (state) => {
      state.loading = true;
    },
    getAllInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoices = action.payload.invoices;
    },
    getAllInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state, action) => {
      state.error = null;
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
  }
);
