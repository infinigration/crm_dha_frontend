import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { returnLead } from "../../../redux/actions/leads";
import Loader from "../../loader/Loader";
import toast from "react-hot-toast";

const ReturnLead = () => {
  const { loading, error, message } = useSelector((state) => state.leads);

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(returnLead(params.id, reason.value, description));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message]);

  const reasons = [
    { value: "Not Interested", label: "Not Interested" },
    { value: "Phone Busy", label: "Phone Busy" },
    { value: "No Response", label: "No Response" },
    { value: "Done Based", label: "Done Based" },
    { value: "Not Used", label: "Not Used" },
  ];
  return loading ? (
    <Loader />
  ) : (
    <section className="return-lead">
      <form action="" onSubmit={submitHandler}>
        <Select
          placeholder="Choose Reason"
          options={reasons}
          value={reason}
          onChange={setReason}
        ></Select>
        <textarea
          name=""
          id=""
          placeholder="Remark"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="primary-btn">Submit</button>
      </form>
    </section>
  );
};

export default ReturnLead;
