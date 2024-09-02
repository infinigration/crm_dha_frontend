import axios from "axios";
import { server } from "../store";

export const createContract =
  (lead, program, installements, discount) => async (dispatch) => {
    dispatch({ type: "createContractRequest" });

    try {
      const { data } = await axios.post(
        `${server}/create_contract`,
        {
          lead,
          program,
          installements,
          discount,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "createContractSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createContractFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllContracts = () => async (dispatch) => {
  dispatch({ type: "getAllContractRequest" });

  try {
    const { data } = await axios.get(
      `${server}/contracts`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllContractSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllContractFail",
      payload: error.response.data.message,
    });
  }
};

export const updateContractStatus = (id, status) => async (dispatch) => {
  dispatch({ type: "updateContractStatusRequest" });

  try {
    const { data } = await axios.put(
      `${server}/contract/updatestatus`,
      { id, status },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateContractStatusSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateContractStatusFail",
      payload: error.response.data.message,
    });
  }
};
