import { server } from "../store";
import axios from "axios";

export const createProgram =
  (
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
    dispatch({ type: "createProgramRequest" });

    try {
      const { data } = await axios.post(
        `${server}/create-program`,
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
