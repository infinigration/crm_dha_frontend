import { createReducer } from "@reduxjs/toolkit";

export const bankReducer = createReducer(
  {},
  {
    createBankRequest: (state) => {
      state.loading = true;
    },

    createBankSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createBankFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllBanksRequest: (state) => {
      state.loading = true;
    },

    getAllBanksSuccess: (state, action) => {
      state.loading = false;
      state.banks = action.payload;
    },

    getAllBanksFail: (state, action) => {
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
