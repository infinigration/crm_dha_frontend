import React, { useEffect, useState } from "react";
import "./admin_remarks.scss";
import { useDispatch, useSelector } from "react-redux";
import { createRemarks, getAllRemarks } from "../../../redux/actions/remark";
import Remark from "../../../componets/remark/Remark";
import Loader from "../../loader/Loader";
import { createLead, getMyLeads } from "../../../redux/actions/leads";
import toast from "react-hot-toast";
import moment from 'moment-timezone';

const AdminRemarks = ({ lead }) => {
  const { leads } = useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [remark, setRemark] = useState("");

  console.log(lead)

  const { auth, isAuthenticated } = useSelector(state => state.user)
  let filteredLead = {};

  if (isAuthenticated && auth.user.job.department === "sales") {
    filteredLead = leads && leads.assigned && leads.assigned.length > 0 ? leads.assigned.find((f) => f._id === lead) : {}
  }
  else if (isAuthenticated && auth.user.job.department === "operations") {
    filteredLead = leads && leads.leads && leads.leads.length > 0 ? leads.leads.find((f) => f._id === lead) : {}
  }

  else {
    filteredLead = leads && leads.leads && leads.leads.length > 0 ? leads.leads.find((f) => f._id === lead) : {}
  }

  console.log(filteredLead)

  let remarks = filteredLead.remarks;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRemarks(filteredLead._id, title, remark));
  };

  const { loading, error, message } = useSelector((state) => state.remarks);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });

    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message]);

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="admin-remarks">
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
        {remarks && remarks.length > 0 ? (
          remarks.map((r) => (
            <Remark
              name={r.author.bioData.name}
              time={r.createdAt}
              image={r.author.avatar.url}
              remark={r.remark}
              title={r.title}
            />
          ))
        ) : (
          <p className="no_remarks">No Remarks Yet</p>
        )}
      </div>
    </section>
  );
};

export default AdminRemarks;
