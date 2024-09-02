import React, { useEffect, useState } from "react";
import ClientProfile from "../../../componets/client profile/ClientProfile";
import Select from "react-select";
import "./lead-activities.scss";
import TaskSummary from "../../../componets/task summary/TaskSummary";
import Profiling from "../../../componets/profiling/Profiling";
import Documents from "../../../componets/documents/Documents";
import { getAllLeads, getLeadDetails, getMyLeads, getTaskSummary } from "../../../redux/actions/leads";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import AdminRemarks from "../remarks/AdminRemarks";
const LeadActivities = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, auth } = useSelector(state => state.user)

  useEffect(() => {
    if (isAuthenticated && auth && auth.user.job.department === "sales") {
      dispatch(getMyLeads())
    }

    else if (isAuthenticated && auth && auth.user.job.department === "operations") {
      dispatch(getAllLeads())
    }
    else {
      dispatch(getAllLeads())
    }
  }, [])


  const params = useParams();
  const id = params.id;
  const { loading, leads } = useSelector((state) => state.leads);
  const [activity, setActivity] = useState("summary");
  const options = [
    { value: "summary", label: "Task Summary" },
    { value: "profile", label: "Client Profile" },
    { value: "documents", label: "Documents" },
    { value: "remarks", label: "Remarks" },
  ];
  let filteredLead = {};

  if (isAuthenticated && auth.user.job.department === "sales") {
    filteredLead = leads && leads.assigned && leads.assigned.length > 0 ? leads.assigned.find((f) => f._id === id) : {}
  }
  else if (isAuthenticated && auth.user.job.department === "operations") {
    filteredLead = leads && leads.leads && leads.leads.length > 0 ? leads.leads.find((f) => f._id === id) : {}
  }

  else {
    filteredLead = leads && leads.leads && leads.leads.length > 0 ? leads.leads.find((f) => f._id === id) : {}
  }

  console.log(filteredLead)


  return loading || !leads ? (
    <Loader />
  ) : (
    <section className="section" id="lead-activities">
      <ClientProfile
        client={filteredLead.client}
        assignedTo={filteredLead?.assignedTo || {}}
        leadId={params.id}
      />



      <div id="filter-row-activities">
        <button className={activity === "summary" ? "active" : ""} onClick={(e) => setActivity("summary")}>Task Summary</button>
        <button className={activity === "profile" ? "active" : ""} onClick={(e) => setActivity("profile")}>Client Profile</button>
        <button className={activity === "documents" ? "active" : ""} onClick={(e) => setActivity("documents")}>Documents</button>
        <button className={activity === "remarks" ? "active" : ""} onClick={(e) => setActivity("remarks")}>Remarks</button>
      </div>

      {activity === "summary" || activity === "summary" ? (
        <TaskSummary data={filteredLead.taskSummary} />
      ) : (
        ""
      )}
      {activity === "profile" ? (
        <Profiling client={filteredLead.client} />
      ) : (
        ""
      )}
      {activity === "documents" ? (
        <Documents documents={filteredLead.documents} />
      ) : activity === "remarks" ? (
        <AdminRemarks lead={params.id} />
      ) : (
        ""
      )}
    </section>
  );
};

export default LeadActivities;
