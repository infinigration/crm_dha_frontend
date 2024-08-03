import React, { lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPrograms } from "../../../redux/actions/program";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
const Programs = () => {
  const { loading, error, message, programs } = useSelector(
    (state) => state.program
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrograms());
  }, [error, message]);

  const navigate = useNavigate();
  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="programs">
      <div className="actions-row">
        <Link className="primary-btn" to={"/admin/programs/add"}>
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
                  <td>{p.generalInformation[0].country}</td>
                  <td>{p.generalInformation[0].totalCost}</td>
                  <td>{p.status}</td>
                  <td>{p.generalInformation[0].processDuration} Months</td>
                  <td className="actions">
                    <button onClick={() => navigate(`/admin/program/${p._id}`)}>
                      View
                    </button>
                    <button>Disable</button>
                    <Link to={`/admin/program/${p._id}/update`}>Update</Link>
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
