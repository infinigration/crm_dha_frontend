import axios from "axios";
import { server } from "../store";

export const createContract =
  (lead, bank, program, installements) => async (dispatch) => {
    dispatch({ type: "createContractRequest" });

    try {
      const { data } = await axios.post(
        `${server}/create_contract`,
        {
          lead,
          bank,
          program,
          installements,
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
