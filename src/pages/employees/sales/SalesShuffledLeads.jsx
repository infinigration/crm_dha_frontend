import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLead,
  deleteLead,
  getAllLeads,
  getMyLeads,
} from "../../../redux/actions/leads";
import { Link } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { getEmployees } from "../../../redux/actions/admin";
import Loader from "../../loader/Loader";
import "./leads.scss";

const SalesShuffledLeads = () => {
  const { leads, message, error, loading } = useSelector(
    (state) => state.leads
  );
  const { employees } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedLeads, setSelectedLeads] = useState([]); // State to track selected leads
  const [bulkAssign, setBulkAssign] = useState(null); // State for selected employee for bulk assign
  const [filterTag, setFilterTag] = useState("all"); // State for filtering leads by tag
  const [filterEmployee, setFilterEmployee] = useState(null);
  // State for filtering leads by employee
  const [filterDate, setFilterDate] = useState(""); // State for filtering leads by date
  const [selectCount, setSelectCount] = useState(""); // State for the number of unassigned leads to select

  useEffect(() => {
    dispatch(getMyLeads());
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const handleLeadSelect = (leadId) => {
    setSelectedLeads((prevSelectedLeads) =>
      prevSelectedLeads.includes(leadId)
        ? prevSelectedLeads.filter((id) => id !== leadId)
        : [...prevSelectedLeads, leadId]
    );
  };

  const selectUnassignedLeads = () => {
    const unassignedLeads = leads.leads.filter((lead) => !lead.assignedTo);
    const leadsToSelect = unassignedLeads
      .slice(0, Number(selectCount))
      .map((lead) => lead._id);
    setSelectedLeads(leadsToSelect);
  };

  useEffect(() => {
    if (selectCount) {
      selectUnassignedLeads();
    }
  }, [selectCount, leads]);

  const assignLeadsHandler = (e) => {
    e.preventDefault();
    dispatch(assignLead(e.target.id, ""));
  };

  const deleteLeadHandler = (e) => {
    e.preventDefault();
    dispatch(deleteLead(e.target.id));
  };

  const bulkAssignHandler = (e) => {
    e.preventDefault();
    if (selectedLeads.length > 0 && bulkAssign) {
      selectedLeads.forEach((leadId) => {
        dispatch(assignLead(leadId, bulkAssign.value));
      });
      setSelectedLeads([]); // Clear selected leads after assigning
      setBulkAssign(null); // Clear bulk assign selection
    } else {
      toast.error("Please select leads and an employee for bulk assignment");
    }
  };

  const assignOptions = employees
    ? employees
        .filter((e) => e.job.department === "sales")
        .map((e) => ({
          value: e._id,
          label: `${e.bioData.name}, (${e.job.department})`,
        }))
    : [];

  let freshLeads =
    leads && leads.assigned && leads.assigned.length > 0
      ? leads.assigned.filter((l) => l.type === "shuffled")
      : [];

  const filteredLeads =
    freshLeads && freshLeads.length > 0
      ? freshLeads.filter((lead) => {
          let tagCondition = false;

          if (filterTag === "Followups") {
            tagCondition = lead.salesStatus === "Followups";
          } else if (filterTag === "Meeting Scheduled") {
            tagCondition = lead.salesStatus === "Meeting Scheduled";
          } else if (filterTag === "Delayed Clients") {
            tagCondition = lead.salesStatus === "Delayed Clients";
          } else if (filterTag === "Close Clients") {
            tagCondition = lead.salesStatus === "Close Clients";
          } else if (filterTag === "Visited") {
            tagCondition = lead.salesStatus === "Visited";
          } else if (filterTag === "all") {
            tagCondition = true;
          }

          let employeeCondition =
            !filterEmployee ||
            (lead.assignedTo && lead.assignedTo._id === filterEmployee.value);

          let dateCondition =
            !filterDate || lead.createdAt.split("T")[0] === filterDate;

          return tagCondition && employeeCondition && dateCondition;
        })
      : [];

  const clearFilter = () => {
    setFilterTag("all");
    setFilterEmployee(null);
    setFilterDate("");
    setSelectedLeads([]);
    setSelectCount("");
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <section className="marketing-leads" id="sales-leads">
        <div className="filter-container">
          <label>
            <span>Tags</span>
            <Select
              placeholder="Choose Tags"
              value={{ value: filterTag, label: filterTag }}
              options={[
                { value: "all", label: "all" },
                { value: "Followups", label: "Followups" },
                { value: "Meeting Scheduled", label: "Meeting Scheduled" },
                { value: "Delayed Clients", label: "Delayed Clients" },
                { value: "Visited", label: "Visited" },
                { value: "Close Client", label: "Close Client" },
              ]}
              onChange={(selectedOption) => setFilterTag(selectedOption.value)}
            />
          </label>

          <label>
            <span>Date</span>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </label>

          <button className="filter-btn" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>

        <div className="leads-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Program</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads && filteredLeads.length > 0 ? (
                filteredLeads.map((l) => (
                  <tr key={l._id}>
                    <td>{l.createdAt.split("T")[0]}</td>
                    <td>{l.client.name}</td>
                    <td>{l.client.phone}</td>
                    <td>
                      {(l.client.program && l.client.program.country) ||
                        "Not Selected Yet"}
                    </td>
                    <td>{l.salesStatus || "Raw Lead"}</td>

                    <td className="actions">
                      <Link to={`/sales/leads/${l._id}/activities`}>
                        Activities
                      </Link>
                      <Link to={`/sales/leads/${l._id}/updatestatus`}>
                        Update Status
                      </Link>
                      <Link to={`/sales/leads/${l._id}/return`}>
                        Return Lead
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Leads Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="sales-overlay"></div>
    </>
  );
};

export default SalesShuffledLeads;
