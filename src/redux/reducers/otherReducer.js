import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer(
  {},
  {
    getDashboardStatsRequset: (state) => {
      state.loading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
    },
    getDashboardStatsFail: (state) => {
      state.loading = false;
    },
  }
);
