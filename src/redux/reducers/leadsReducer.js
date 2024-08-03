import { createReducer } from "@reduxjs/toolkit";

export const leadsReducer = createReducer(
  {},
  {
    createLeadRequest: (state) => {
      state.loading = true;
    },
    createLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getLeadDetailsRequest: (state) => {
      state.loading = true;
    },
    getLeadDetailsSuccess: (state, action) => {
      state.loading = false;
      state.details = action.payload;
    },
    getLeadDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    allLeadsRequest: (state) => {
      state.loading = true;
    },
    allLeadsSuccess: (state, action) => {
      state.leads = action.payload;
      state.loading = false;
    },
    allLeadsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateLeadStatusRequest: (state) => {
      state.loading = true;
    },
    updateLeadStatusSuccess: (state, action) => {
      state.loading = false;
      state.leads = action.payload;
      state.message = action.payload.message;
    },
    updateLeadStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getTasksSummaryRequest: (state) => {
      state.loading = true;
    },
    getTasksSummarySuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getTasksSummaryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addFollowUpDateRequest: (state) => {
      state.loading = true;
    },
    addFollowUpDateSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    addFollowUpDateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    assignLeadRequest: (state) => {
      state.loading = true;
    },
    assignLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    assignLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forwardLeadRequest: (state) => {
      state.loading = true;
    },

    forwardLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    forwardLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    uploadClientProfileRequest: (state) => {
      state.loading = true;
    },
    uploadClientProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    uploadClientProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateClientProfileRequest: (state) => {
      state.loading = true;
    },
    updateClientProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateClientProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateClientDocumentRequest: (state) => {
      state.loading = true;
    },
    updateClientDocumentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateClientDocumentFail: (state, action) => {
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
