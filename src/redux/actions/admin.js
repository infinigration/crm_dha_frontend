import axios from "axios";
import { server } from "../store.js";

export const createUser =
  (
    name,
    fatherName,
    cnic,
    mobile,
    email,
    gender,
    dob,
    maritalStatus,
    religion,
    nationality,
    title,
    department,
    salary,
    role,
    password
  ) =>
  async (dispatch) => {
    dispatch({ type: "createUserRequest" });

    try {
      const { data } = await axios.post(
        `${server}/createuser`,
        {
          name,
          fatherName,
          cnic,
          mobile,
          email,
          gender,
          dob,
          maritalStatus,
          religion,
          nationality,
          title,
          department,
          salary,
          role,
          password
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "createUserSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createUserFail",
        payload: error.response.data.message,
      });
    }
  };

export const changePassword =
  (id, oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: "changePasswordRequest" });

    try {
      const { data } = await axios.post(
        `${server}/changepassword/${id}`,
        { oldPassword, newPassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "changePasswordSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "changePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (id, name, email, role) => async (dispatch) => {
  dispatch({ type: "updateProfileRequest" });

  try {
    const { data } = await axios.put(
      `${server}/updateprofile/${id}`,
      { name, email, role },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateProfileSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const getEmployee = (id) => async (dispatch) => {
  dispatch({ type: "getEmployeeRequest" });

  try {
    const { data } = await axios.get(
      `${server}/profile/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getEmployeeSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getEmployeeFail",
      payload: error.response.data.message,
    });
  }
};

export const getEmployees = () => async (dispatch) => {
  dispatch({ type: "getEmployeesRequest" });

  try {
    const { data } = await axios.get(
      `${server}/employees`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getEmployeesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getEmployeesFail",
      payload: error.response.data.message,
    });
  }
};
