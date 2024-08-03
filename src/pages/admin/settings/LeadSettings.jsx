import React, { useEffect, useState } from "react";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";
import { createProcess, getProcess } from "../../../redux/actions/process";
const LeadSettings = () => {
  const [status, setStatus] = useState("");
  const [process, setProcess] = useState("");
  const dispatch = useDispatch();
  const {
    message,
    error,
    loading,
    process: p,
  } = useSelector((state) => state.process);

  const submitHandler = (e) => {
    e.preventDefault();
    const statusArray = process.split(",").map((status) => ({
      title: status.trim(),
      status: "active",
    }));
    dispatch(createProcess(statusArray));
    setProcess("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getProcess());
  }, [error, message]);

  let processes = p && p[0].lead_process;

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="leads-settings">
      <div className="actions-row">
        <input
          type="text"
          placeholder="Write Statuses with , Separator"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
        />
        <button className="primary-btn" onClick={submitHandler}>
          Add Lead Status
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Status Name</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>

        <tbody>
          {processes && processes.length > 0
            ? processes.map((p, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{p.title}</td>
                  {/* <td>
                    <button className="delete">Delete</button>
                  </td> */}
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default LeadSettings;
