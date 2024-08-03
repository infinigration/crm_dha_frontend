import React, { useEffect, useState } from "react";
import ClientProfile from "../../../componets/client profile/ClientProfile";
import Select from "react-select";
import "./lead-activities.scss";
import TaskSummary from "../../../componets/task summary/TaskSummary";
import Profiling from "../../../componets/profiling/Profiling";
import Documents from "../../../componets/documents/Documents";
import { getLeadDetails, getTaskSummary } from "../../../redux/actions/leads";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import AdminRemarks from "../remarks/AdminRemarks";
const LeadActivities = () => {
  const dispatch = useDispatch();

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

  const filteredLead =
    leads && leads.leads.length > 0
      ? leads.leads.find((l) => l._id === id)
      : [];

  return loading || !leads ? (
    <Loader />
  ) : (
    <section className="section" id="lead-activities">
      <ClientProfile
        client={filteredLead.client}
        assignedTo={filteredLead.assignedTo}
        leadId={params.id}
      />

      <div className="selector">
        <Select
          placeholder={"Task Summary"}
          options={options}
          onChange={setActivity}
          defaultValue={"summary"}
          value={activity}
        />
      </div>

      {activity.value === "summary" || activity === "summary" ? (
        <TaskSummary data={filteredLead.taskSummary} />
      ) : (
        ""
      )}
      {activity.value === "profile" ? (
        <Profiling client={filteredLead.client} />
      ) : (
        ""
      )}
      {activity.value === "documents" ? (
        <Documents documents={filteredLead.documents} />
      ) : activity.value === "remarks" ? (
        <AdminRemarks lead={filteredLead._id} />
      ) : (
        ""
      )}
    </section>
  );
};

export default LeadActivities;
