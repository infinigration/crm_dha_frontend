import { server } from "../store";
import axios from "axios";

export const createProgram =
  (
    country,
    title,
    duration,
    totalCost,
    advance,
    workPermit,
    passportRequest,
    visaCost,
    deduction,
    province,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    vendor,
    vendorFees,
    currency
  ) =>
  async (dispatch) => {
    dispatch({ type: "createProgramRequest" });

    try {
      const { data } = await axios.post(
        `${server}/create-program`,
        {
          country,
          title,
          duration,
          totalCost,
          advance,
          workPermit,
          passportRequest,
          visaCost,
          deduction,
          province,
          processDuration,
          jobs,
          documents,
          requirements,
          benefits,
          vendor,
          vendorFees,
          currency,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "createProgramSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createProgramFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllPrograms = () => async (dispatch) => {
  dispatch({ type: "getAllProgramsRequest" });

  try {
    const { data } = await axios.get(
      `${server}/programs`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "getAllProgramsSuccess", payload: data.programs });
  } catch (error) {
    dispatch({
      type: "getAllProgramsFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProgram =
  (
    id,
    country,
    duration,
    totalCost,
    advance,
    workPermit,
    passportRequest,
    visaCost,
    deduction,
    province,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits
  ) =>
  async (dispatch) => {
    dispatch({ type: "updateProgramRequest" });

    try {
      const { data } = await axios.put(
        `${server}/updateprogram/${id}`,
        {
          country,
          duration,
          totalCost,
          advance,
          workPermit,
          passportRequest,
          visaCost,
          deduction,
          province,
          processDuration,
          jobs,
          documents,
          requirements,
          benefits,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch({ type: "updateProgramSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateProgramFail",
        payload: error.response.data.message,
      });
    }
  };

export const changeProgramStatus = (id) => async (dispatch) => {
  dispatch({ type: "changeProgramStatusRequest" });

  try {
    const { data } = await axios.put(
      `${server}/program/${id}`,
      {},

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "changeProgramStatusSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "changeProgramStatusFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProgram = (id) => async (dispatch) => {
  dispatch({ type: "deleteProgramRequest" });

  try {
    const { data } = await axios.delete(
      `${server}/program/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "deleteProgramSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProgramFail",
      payload: error.response.data.message,
    });
  }
};
