import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLead,
  deleteLead,
  getAllLeads,
  getMyLeads,
  returnLead,
} from "../../../redux/actions/leads";
import { Link } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { getEmployees } from "../../../redux/actions/admin";
import Loader from "../../loader/Loader";
import "./leads.scss";

const SalesLeads = () => {
  const { leads, message, error, loading } = useSelector(
    (state) => state.leads
  );
  const { employees } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedLeads, setSelectedLeads] = useState([]); // State to track selected leads
  const [bulkAssign, setBulkAssign] = useState(null); // State for selected employee for bulk assign
  const [filterTag, setFilterTag] = useState("all"); // State for filtering leads by tag
  const [filterEmployee, setFilterEmployee] = useState(null); // State for filtering leads by employee
  const [filterDate, setFilterDate] = useState(""); // State for filtering leads by date
  const [filterPhone, setFilterPhone] = useState(""); // State for filtering leads by phone number
  const [filterName, setFilterName] = useState(""); // State for filtering leads by name
  const [selectCount, setSelectCount] = useState(""); // State for the number of unassigned leads to select
  const [returnReason, setReturnReason] = useState(""); // State for return reason
  const [returnDescription, setReturnDescription] = useState(""); // State for return description

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

  const bulkReturnHandler = (e) => {
    e.preventDefault();
    if (selectedLeads.length > 0 && returnReason && returnDescription) {
      selectedLeads.forEach((leadId) => {
        dispatch(returnLead(leadId, returnReason.value                         , returnDescription));
      });
      setSelectedLeads([]); // Clear selected leads after returning
      setReturnReason(""); // Clear return reason
      setReturnDescription(""); // Clear return description
    } else {
      toast.error("Please select leads and provide a reason and description for bulk return");
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
      ? leads.assigned.filter((l) => l.type === "fresh")
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

        let phoneCondition =
          !filterPhone || lead.client.phone.includes(filterPhone);

        let nameCondition =
          !filterName || lead.client.name.toLowerCase().includes(filterName.toLowerCase());

        return tagCondition && employeeCondition && dateCondition && phoneCondition && nameCondition;
      })
      : [];

  const clearFilter = () => {
    setFilterTag("all");
    setFilterEmployee(null);
    setFilterDate("");
    setFilterPhone("");
    setFilterName("");
    setSelectedLeads([]);
    setSelectCount("");
  };

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

          <label>
            <span>Phone Number</span>
            <input
              type="text"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
              placeholder="Filter by phone number"
            />
          </label>

          <label>
            <span>Name</span>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter by name"
            />
          </label>

          <button className="filter-btn" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>

        <div className="bulk-return">
          <h3 className="heading">Bulk Return</h3>
          <label>
            <span classNam>Return Reason</span>
            <Select
              placeholder="Choose Reason"
              options={reasons}
              value={returnReason}
              onChange={setReturnReason}
            ></Select>
          </label>
          <label>
            <span>Return Description</span>
            <textarea
              value={returnDescription}
              onChange={(e) => setReturnDescription(e.target.value)}
              placeholder="Description for returning"
            />
          </label>
          <button className="primary-btn" onClick={bulkReturnHandler}>Bulk Return</button>
        </div>

        <div className="leads-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedLeads(
                        isChecked
                          ? filteredLeads.map((lead) => lead._id)
                          : []
                      );
                    }}
                    checked={selectedLeads.length === filteredLeads.length}
                  />
                </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(l._id)}
                        onChange={() => handleLeadSelect(l._id)}
                      />
                    </td>
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

                      <Link target="_blank" to={`https://wa.me/${l.client.phone}`}>
                        Whatsapp
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

export default SalesLeads;
