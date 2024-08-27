import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getMyLeads, updateLeadStatus, updateSalesLeadStatus } from "../../../redux/actions/leads";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";

const UpdateLeadStatus = () => {
  const { loading, error, message } = useSelector((state) => state.leads);
  const [status, setStatus] = useState("");
  const params = useParams();

  const options = [
    { value: "Followups", label: "Followups" },
    { value: "Meeting Scheduled", label: "Meeting Scheduled" },
    { value: "Delayed Clients", label: "Delayed Clients" },
    { value: "Close Client", label: "Close Client" },
  ];

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSalesLeadStatus(params.id, status.value))
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
      dispatch(getMyLeads());
    }

    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
  }, [error, message]);
  return loading ? (
    <Loader />
  ) : (
    <section className="update-lead-status">
      <form action="" onSubmit={submitHandler}>
        <Select
          placeholder="Choose Status"
          options={options}
          value={status}
          onChange={setStatus}
        ></Select>
        <button className="primary-btn">Submit</button>
      </form>
    </section>
  );
};

export default UpdateLeadStatus;
