import { createReducer } from "@reduxjs/toolkit";


export const remarkReducer = createReducer(
  {},
  {
    createRemarkRequest: (state) => {
      state.loading = true;
    },

    createRemarkSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createRemarkFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllRemarksRequest: (state) => {
      state.loading = true;
    },

    getAllRemarksSuccess: (state, action) => {
      state.loading = false;
      state.remarks = action.payload.remarks;
    },
    getAllRemarksFail: (state, action) => {
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
