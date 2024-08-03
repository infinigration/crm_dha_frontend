import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.auth = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.auth = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
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
