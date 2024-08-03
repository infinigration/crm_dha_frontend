import axios from "axios";
import { server } from "../store";

export const createVendor = (name) => async (dispatch) => {
  dispatch({ type: "createVendorRequest" });

  try {
    const { data } = await axios.post(
      `${server}/create-vendor`,
      { name },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "createVendorSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createVendorFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllVendors = () => async (dispatch) => {
  dispatch({ type: "getAllVendorsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/vendors`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllVendorsSuccess", payload: data.vendors });
  } catch (error) {
    dispatch({
      type: "getAllVendorsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllVendorsPayment = () => async (dispatch) => {
  dispatch({ type: "getAllVendorPaymentsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/vendor-payments`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllVendorPaymentsSuccess", payload: data.vendorPayments });
  } catch (error) {
    dispatch({
      type: "getAllVendorPaymentsFail",
      payload: error.response.data.message,
    });
  }
};
