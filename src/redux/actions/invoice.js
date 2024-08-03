import axios from "axios";
import { server } from "../store";

export const createInvoice = (id) => async (dispatch) => {
  dispatch({ type: "createInvoiceRequest" });

  try {
    const { data } = await axios.post(
      `${server}/create_invoice/${id}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "createInvoiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createInvoiceFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllInvoices = () => async (dispatch) => {
  dispatch({ type: "getAllInvoiceRequest" });

  try {
    const { data } = await axios.get(
      `${server}/invoices`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllInvoiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllInvoiceFail",
      payload: error.response.data.message,
    });
  }
};
