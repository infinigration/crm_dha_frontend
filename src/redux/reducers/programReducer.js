import { createReducer } from "@reduxjs/toolkit";

export const programReducer = createReducer(
  {},
  {
    createProgramRequest: (state) => {
      state.loading = true;
    },

    createProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createProgramFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProgramRequest: (state) => {
      state.loading = true;
    },

    updateProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProgramFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllProgramsRequest: (state) => {
      state.loading = true;
    },

    getAllProgramsSuccess: (state, action) => {
      state.loading = false;
      state.programs = action.payload;
    },
    getAllProgramsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  }
);
