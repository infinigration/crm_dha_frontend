import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer(
  {},
  {
    createUserRequest: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getEmployeesRequest: (state) => {
      state.loading = true;
    },
    getEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload.employees;
    },
    getEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    changePasswordRequest: (state) => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getEmployeeRequest: (state) => {
      state.loading = true;
    },
    getEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
    },
    getEmployeeFail: (state, action) => {
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
