import axios from "axios";
import { server } from "../store";

export const getAllClients = () => async (dispatch) => {
  dispatch({ type: "getAllClientsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/clients`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllClientsSuccess", payload: data.clients });
  } catch (error) {
    dispatch({
      type: "getAllClientsFail",
      payload: error.response.data.message,
    });
  }
};
