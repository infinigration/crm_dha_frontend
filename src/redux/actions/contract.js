import axios from "axios";
import { server } from "../store";

export const createContract =
  (lead, program, bank, installements, discount) => async (dispatch) => {
    dispatch({ type: "createContractRequest" });

    // lead,
    // program,
    // bank,
    // installments,
    // discount,
    try {
      const { data } = await axios.post(
        `${server}/create_contract`,
        {
          lead,
          program,
          bank,
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
        type: "getAllContractFail",
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
