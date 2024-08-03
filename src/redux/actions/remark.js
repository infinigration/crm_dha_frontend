import axios from "axios";
import { server } from "../store";

export const createRemarks = (id, title, remark) => async (dispatch) => {
  dispatch({ type: "createRemarkRequest" });

  try {
    const { data } = await axios.post(
      `${server}/create_remark/${id}`,
      { title, remark },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "createRemarkSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createRemarkFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllRemarks = (id) => async (dispatch) => {
  dispatch({ type: "getAllRemarksRequest" });

  try {
    const { data } = await axios.get(
      `${server}/remarks/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllRemarksSuccess", payload: data.programs });
  } catch (error) {
    dispatch({
      type: "getAllRemarksFail",
      payload: error.response.data.message,
    });
  }
};
