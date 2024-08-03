import axios from "axios";
import { server } from "../store";

export const createProcess = (process) => async (dispatch) => {
  dispatch({ type: "createProcessRequest" });

  try {
    const { data } = await axios.post(
      `${server}/create_process`,
      { process },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "createProcessSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createProcessFail",
      payload: error.response.data.message,
    });
  }
};

export const getProcess = () => async (dispatch) => {
  dispatch({ type: "getAllProcessRequest" });

  try {
    const { data } = await axios.get(
      `${server}/process`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllProcessSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllProcessFail",
      payload: error.response.data.message,
    });
  }
};
