import { createReducer } from "@reduxjs/toolkit";

export const contractReducer = createReducer(
  {},
  {
    createContractRequest: (state) => {
      state.loading = true;
    },

    createContractSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createContractFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllContractRequest: (state) => {
      state.loading = true;
    },

    getAllContractSuccess: (state, action) => {
      state.loading = false;
      state.contracts = action.payload;
    },
    getAllContractFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateContractStatusRequest: (state) => {
      state.loading = true;
    },

    updateContractStatusSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateContractStatusFail: (state, action) => {
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
