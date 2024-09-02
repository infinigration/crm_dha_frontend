import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLead,
  deleteLead,
  getAllLeads,
} from "../../../redux/actions/leads";
import { Link } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"; // Import xlsx library
import "./leads.scss";
import { getEmployees } from "../../../redux/actions/admin";
import Loader from "../../loader/Loader";
import { convertTimeToPKT } from "../../../utils/utils";

const ShuffledLeads = () => {
  const { leads, message, error, loading } = useSelector(
    (state) => state.leads
  );
  const { employees } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedLeads, setSelectedLeads] = useState([]);
  const [bulkAssign, setBulkAssign] = useState(null);
  const [filterTag, setFilterTag] = useState("all");
  const [filterEmployee, setFilterEmployee] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState(""); // Added state for month filtering
  const [selectCount, setSelectCount] = useState("");

  useEffect(() => {
    dispatch(getAllLeads());
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

  const selectLeads = () => {
    const leadsToSelect = filteredLeads
      .slice(0, Number(selectCount))
      .map((lead) => lead._id);
    setSelectedLeads(leadsToSelect);
  };

  useEffect(() => {
    if (selectCount) {
      selectLeads();
    }
  }, [selectCount, leads, filterTag, filterEmployee, filterDate, filterMonth]);

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
      setSelectedLeads([]);
      setBulkAssign(null);
    } else {
      toast.error("Please select leads and an employee for bulk assignment");
    }
  };

  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    if (selectedLeads.length > 0) {
      selectedLeads.forEach((leadId) => {
        dispatch(deleteLead(leadId));
      });
      setSelectedLeads([]); // Clear selected leads after deletion
      toast.success("Leads deleted successfully");
    } else {
      toast.error("Please select leads to delete");
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

  let shuffledLeads =
    leads && leads.leads.length > 0
      ? leads.leads.filter((l) => l.type === "shuffled")
      : [];

  const filteredLeads =
    shuffledLeads && shuffledLeads.length > 0
      ? shuffledLeads.filter((lead) => {
        let tagCondition =
          filterTag === "all" ||
          (filterTag === "Not Interested" &&
            lead.return?.reason === "Not Interested") ||
          (filterTag === "Phone Busy" &&
            lead.return?.reason === "Phone Busy") ||
          (filterTag === "No Response" &&
            lead.return?.reason === "No Response") ||
          (filterTag === "Done Based" &&
            lead.return?.reason === "Done Based");

        let employeeCondition =
          !filterEmployee ||
          (lead.assignedTo && lead.assignedTo._id === filterEmployee.value);

        let dateCondition =
          !filterDate || convertTimeToPKT(lead.createdAt).date === filterDate;

        let monthCondition =
          !filterMonth || convertTimeToPKT(lead.createdAt).date.split("-")[1] === filterMonth;

        return tagCondition && employeeCondition && dateCondition && monthCondition;
      })
      : [];

  const clearFilter = () => {
    setFilterTag("all");
    setFilterEmployee(null);
    setFilterDate("");
    setFilterMonth(""); // Clear month filter
    setSelectedLeads([]);
    setSelectCount("");
  };

  const downloadExcel = () => {
    const dataToExport = filteredLeads.map((lead) => ({
      Date: lead.createdAt.split("T")[0],
      Name: lead.client.name,
      Phone: lead.client.phone,
      Program:
        (lead.client.program && lead.client.program.country) ||
        "Not Selected Yet",
      AssignedTo:
        (lead.assignedTo && lead.assignedTo.bioData.name) || "Not Assigned",
      Remark: (lead.return && lead.return.remark) || "No Remark Yet",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "ShuffledLeads.xlsx"); // Updated filename
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="marketing-leads">
      <div className="actions-row">
        <form className="bulk-assign-lead" onSubmit={bulkAssignHandler}>
          <Select
            className="select"
            placeholder="Bulk Assign Leads"
            options={assignOptions}
            value={bulkAssign}
            onChange={setBulkAssign}
          />
          <button type="submit" className="primary-btn">
            Bulk Assign
          </button>
        </form>

        <div className="return-actions">
          <Link className="primary-btn" to={"/leads/add"}>
            Add New
          </Link>

          <button onClick={downloadExcel} className="primary-btn">
            Download Excel
          </button>

          <button onClick={bulkDeleteHandler} className="primary-btn">
            Bulk Delete
          </button>
        </div>
      </div>

      <div className="filter-container">
        <label>
          <span>Tags</span>
          <Select
            placeholder="Choose Tags"
            value={{ value: filterTag, label: filterTag }}
            options={[
              { value: "all", label: "All Leads" },
              { value: "Not Interested", label: "Not Interested" },
              { value: "Phone Busy", label: "Phone Busy" },
              { value: "No Response", label: "No Response" },
              { value: "Done Based", label: "Done Based" },
            ]}
            onChange={(selectedOption) => setFilterTag(selectedOption.value)}
          />
        </label>

        <label>
          <span>Employee</span>
          <Select
            placeholder="Choose Employee"
            options={assignOptions}
            value={filterEmployee}
            onChange={setFilterEmployee}
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
          <span>Month</span>
          <Select
            placeholder="Choose Month"
            value={{ value: filterMonth, label: filterMonth }}
            options={[
              { value: "", label: "All Months" },
              { value: "01", label: "January" },
              { value: "02", label: "February" },
              { value: "03", label: "March" },
              { value: "04", label: "April" },
              { value: "05", label: "May" },
              { value: "06", label: "June" },
              { value: "07", label: "July" },
              { value: "08", label: "August" },
              { value: "09", label: "September" },
              { value: "10", label: "October" },
              { value: "11", label: "November" },
              { value: "12", label: "December" },
            ]}
            onChange={(selectedOption) => setFilterMonth(selectedOption.value)}
          />
        </label>

        <label>
          <span>Select Leads</span>
          <input
            type="number"
            value={selectCount}
            onChange={(e) => setSelectCount(e.target.value)}
            placeholder="Enter number of leads"
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
              <th>Select</th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Program</th>
              <th>Assigned To</th>
              <th>Remark</th>
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
                  <td>{convertTimeToPKT(l.createdAt).date}</td>
                  <td>{l.client.name}</td>
                  <td>{l.client.phone}</td>
                  <td>
                    {(l.client.program && l.client.program.country) ||
                      "Not Selected Yet"}
                  </td>
                  <td>
                    {(l.assignedTo && l.assignedTo.bioData.name) ||
                      "Not Assigned"}
                  </td>
                  <td>{(l.return && l.return.remark) || "No Remark Yet"}</td>
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
  );
};

export default ShuffledLeads;
