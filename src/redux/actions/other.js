import axios from "axios";
import { server } from "../store";

export const getDashboardStats = () => async (dispatch) => {
  dispatch({ type: "getDashboardStatsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/dashboard-stats`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getDashboardStatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDashboardStatsFail",
      payload: error.response.data.message,
    });
  }
};
