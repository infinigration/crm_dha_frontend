import axios from "axios";
import { server } from "../store";

export const createBank =
  (title, accNo, address, country) => async (dispatch) => {
    dispatch({ type: "createBankRequest" });

    try {
      const { data } = await axios.post(
        `${server}/create_bank`,
        { accTitle: title, accNo, address, country },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "createBankSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createBankFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllBanks = () => async (dispatch) => {
  dispatch({ type: "getAllBanksRequest" });

  try {
    const { data } = await axios.get(
      `${server}/banks`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllBanksSuccess", payload: data.banks });
  } catch (error) {
    dispatch({
      type: "getAllBanksFail",
      payload: error.response.data.message,
    });
  }
};
