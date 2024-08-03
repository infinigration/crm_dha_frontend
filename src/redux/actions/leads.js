import axios from "axios";
import { server } from "../store";

export const createLead = (leads) => async (dispatch) => {
  dispatch({ type: "createLeadRequest" });

  try {
    const { data } = await axios.post(
      `${server}/createlead`,
      { leads },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "createLeadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "createLeadFail", payload: error.response.data.message });
  }
};

export const getAllLeads = () => async (dispatch) => {
  dispatch({ type: "allLeadsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/leads`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "allLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "allLeadsFail", payload: error.response.data.message });
  }
};

export const getLeadDetails = (id) => async (dispatch) => {
  dispatch({ type: "getLeadDetailsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/lead/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getLeadDetailsSuccess", payload: data.lead });
  } catch (error) {
    dispatch({
      type: "getLeadDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const updateLeadStatus = (id, status) => async (dispatch) => {
  dispatch({ type: "updateLeadStatusRequest" });

  try {
    const { data } = await axios.put(
      `${server}/updateleadstatus`,
      { id, status: status },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateLeadStatusSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateLeadStatusFail",
      payload: error.response.data.message,
    });
  }
};

export const getTaskSummary = (id, status) => async (dispatch) => {
  dispatch({ type: "getTasksSummaryRequest" });

  try {
    const { id } = await axios.get(
      `${server}/lead/${id}/tasks`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getTasksSummarySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getTasksSummaryFail",
      payload: error.response.data.message,
    });
  }
};

export const addFollowUpDate = (leadId, date, taskId) => async (dispatch) => {
  dispatch({ type: "addFollowUpDateRequest" });

  try {
    const { data } = await axios.put(
      `${server}/lead/addfollowupdate`,
      { leadId: leadId, date: date, taskId: taskId },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "addFollowUpDateSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addFollowUpDateFail",
      payload: error.response.data.message,
    });
  }
};

export const assignLead = (leadId, userId) => async (dispatch) => {
  dispatch({ type: "assignLeadRequest" });

  try {
    const { data } = await axios.post(
      `${server}/assignlead`,
      { leadId: leadId, userId: userId },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "assignLeadSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "assignLeadFail",
      payload: error.response.data.message,
    });
  }
};

export const uploadClientProfile = (formdata, id) => async (dispatch) => {
  dispatch({ type: "uploadClientProfileRequest" });

  try {
    const { data } = await axios.post(
      `${server}/uploadclientavatar/${id}`,
      formdata,

      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    dispatch({ type: "uploadClientProfileSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "uploadClientProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const updateClientProfile =
  (cnic, dob, passport, program, email, id) => async (dispatch) => {
    dispatch({ type: "uploadClientProfileRequest" });

    try {
      const { data } = await axios.put(
        `${server}/updateclientprofile/${id}`,
        {
          cnic: cnic,
          dob: dob,
          passport: passport,
          program: program,
          email: email,
        },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "uploadClientProfileSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "uploadClientProfileFail",
        payload: error.response.data.message,
      });
    }
  };

export const uploadClientDocuments =
  (formdata, lId, dId) => async (dispatch) => {
    dispatch({ type: "uploadClientProfileRequest" });

    try {
      const { data } = await axios.put(
        `${server}/uploadclientdocument/${lId}/${dId}`,
        formdata,

        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      dispatch({ type: "uploadClientProfileSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "uploadClientProfileFail",
        payload: error.response.data.message,
      });
    }
  };

export const forwardLead = (leadId, userId) => async (dispatch) => {
  dispatch({ type: "forwardLeadRequest" });

  try {
    const { data } = await axios.post(
      `${server}/forwardlead`,
      { leadId: leadId, userId: userId },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "forwardLeadSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "forwardLeadFail",
      payload: error.response.data.message,
    });
  }
};
