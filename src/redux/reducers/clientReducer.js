import { createReducer } from "@reduxjs/toolkit";

export const clientReducer = createReducer(
  {},
  {
    getAllClientsRequest: (state) => {
      state.loading = true;
    },

    getAllClientsSuccess: (state, action) => {
      state.loading = true;
      state.clients = action.payload;
    },

    getAllClientsFail: (state, action) => {
      state.loading = true;
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
