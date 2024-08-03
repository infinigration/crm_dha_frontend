import React, { useEffect, useState } from "react";
import "./remarks.scss";
import Remark from "../../../componets/remark/Remark";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { createRemarks } from "../../../redux/actions/remark";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllLeads } from "../../../redux/actions/leads";
const Remarks = () => {
  const { loading, error, message } = useSelector((state) => state.remarks);
  const { leads } = useSelector((state) => state.leads);
  const [title, setTitle] = useState("");
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRemarks(params.id, title, remark));
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

  const filteredLead =
    leads.leads && leads.leads.length > 0
      ? leads.leads.find((f) => f._id === params.id)
      : "";

  console.log(filteredLead.remarks);

  useEffect(() => {
    dispatch(getAllLeads());
  }, [message]);

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="remarks">
      <form action="" onSubmit={submitHandler}>
        <h2 className="heading">Add Remarks</h2>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Enter Remarks"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        ></textarea>
        <button className="primary-btn">Submit</button>
      </form>

      <div className="review-container">
        {filteredLead.remarks && filteredLead.remarks.length > 0
          ? filteredLead.remarks.map((r, index) => (
              <Remark
                name={r.author.bioData.name}
                time={r.createdAt.split("T")[0]}
                image={r.author.avatar.url}
                remark={r.remark}
                title={r.title}
              />
            ))
          : ""}
      </div>
    </section>
  );
};

export default Remarks;
