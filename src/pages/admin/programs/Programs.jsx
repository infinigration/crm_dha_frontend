import React, { lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  changeProgramStatus,
  deleteProgram,
  getAllPrograms,
} from "../../../redux/actions/program";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const Programs = () => {
  const { loading, error, message, programs } = useSelector(
    (state) => state.program
  );

  const { isAuthenticated, auth } = useSelector(state => state.user)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrograms());
  }, [error, message]);

  const changeStatusHandler = (e) => {
    e.preventDefault();
    dispatch(changeProgramStatus(e.target.id));
  };

  const deleteProgramHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProgram(e.target.id));
  };

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
    }

    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })

    }
  }, [error, message])

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="programs">
      <div className="actions-row">
        <Link className="primary-btn" to={isAuthenticated && auth.user.job.department === "operations" ? "/operations/programs/add" : "/admin/programs/add"}>
          Add New
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Country</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Estimated Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {programs && programs.length > 0
            ? programs.map((p, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{p.generalInformation[0].title}</td>
                <td>{p.generalInformation[0].totalCost} {p.generalInformation[0].currency}</td>
                <td>{p.status}</td>
                <td>{p.generalInformation[0].processDuration}</td>
                <td className="actions">

                  <Link to={isAuthenticated && auth.user.job.department === "operations" ? `/operations/program/${p._id}/view` : `/admin/program/${p._id}`} >View</Link>
                  <button onClick={changeStatusHandler} id={p._id}>
                    Disable
                  </button>
                  <button onClick={deleteProgramHandler} id={p._id}>
                    Delete
                  </button>
                  <Link to={isAuthenticated && auth.user.job.department === "operations" ? `/operations/program/${p._id}/update` : `/admin/program/${p._id}/update`} >Update</Link>
                </td>
              </tr>
            ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default Programs;
