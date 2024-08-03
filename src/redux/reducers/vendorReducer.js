import { createReducer } from "@reduxjs/toolkit";

export const vendorReducer = createReducer(
  {},
  {
    getAllVendorsRequest: (state) => {
      state.loading = true;
    },

    getAllVendorsSuccess: (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
    },

    getAllVendorsFail: (state, action) => {
      state.loading = false;
    },

    createVendorRequest: (state) => {
      state.loading = true;
    },

    createVendorSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllVendorPaymentsRequest: (state) => {
      state.loading = true;
    },

    getAllVendorPaymentsSuccess: (state, action) => {
      state.loading = false;
      state.vendorPayments = action.payload;
    },

    getAllVendorPaymentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);
