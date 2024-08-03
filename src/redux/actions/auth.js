import axios from "axios";
import { server } from "../store.js";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "loginRequest" });

  try {
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch({ type: "loadUserRequest" });

  try {
    const { data } = await axios.get(`${server}/me`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "logoutRequest" });

  try {
    const { data } = await axios.get(`${server}/logout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "logoutSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};
