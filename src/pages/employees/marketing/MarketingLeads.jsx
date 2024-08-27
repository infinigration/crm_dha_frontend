import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignLead, deleteLead, getAllLeads } from '../../../redux/actions/leads';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import toast from 'react-hot-toast';
import "./leads.scss";
import { getEmployees } from '../../../redux/actions/admin';
import Loader from '../../loader/Loader';

const MarketingLeads = () => {
    const { leads, message, error, loading } = useSelector(state => state.leads);
    const { employees } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const [selectedLeads, setSelectedLeads] = useState([]); // State to track selected leads
    const [bulkAssign, setBulkAssign] = useState(null); // State for selected employee for bulk assign
    const [filterTag, setFilterTag] = useState("all"); // State for filtering leads by tag
    const [filterEmployee, setFilterEmployee] = useState(null);
    // State for filtering leads by employee
    const [filterDate, setFilterDate] = useState(""); // State for filtering leads by date
    const [selectCount, setSelectCount] = useState(""); // State for the number of unassigned leads to select

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
        setSelectedLeads(prevSelectedLeads =>
            prevSelectedLeads.includes(leadId)
                ? prevSelectedLeads.filter(id => id !== leadId)
                : [...prevSelectedLeads, leadId]
        );
    };

    const selectUnassignedLeads = () => {
        const unassignedLeads = leads.leads.filter(lead => !lead.assignedTo);
        const leadsToSelect = unassignedLeads.slice(0, Number(selectCount)).map(lead => lead._id);
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
            selectedLeads.forEach(leadId => {
                dispatch(assignLead(leadId, bulkAssign.value));
            });
            setSelectedLeads([]); // Clear selected leads after assigning
            setBulkAssign(null); // Clear bulk assign selection
        } else {
            toast.error("Please select leads and an employee for bulk assignment");
        }
    };

    const assignOptions = employees
        ? employees.filter((e) => e.job.department === "sales").map((e) => ({
            value: e._id,
            label: `${e.bioData.name}, (${e.job.department})`,
        }))
        : [];

    let freshLeads = leads && leads.leads.length > 0 ? leads.leads.filter((l) => l.type === "fresh") : []

 

    const filteredLeads = freshLeads && freshLeads ? freshLeads.filter(lead => {
        let tagCondition = filterTag === "all" ||
            (filterTag === "assigned" && lead.assignedTo) ||
            (filterTag === "unassigned" && !lead.assignedTo);

        let employeeCondition = !filterEmployee || (lead.assignedTo && lead.assignedTo._id === filterEmployee.value);

        let dateCondition = !filterDate || lead.createdAt.split("T")[0] === filterDate;

        return tagCondition && employeeCondition && dateCondition;
    }) : [];

    const clearFilter = () => {
        setFilterTag("all");
        setFilterEmployee(null);
        setFilterDate("");
        setSelectedLeads([]);
        setSelectCount("");
    };

    return (
        loading ? <Loader /> : <section className='marketing-leads'>
            <div className="actions-row">
                <form className="bulk-assign-lead" onSubmit={bulkAssignHandler}>
                    <Select
                        className="select"
                        placeholder="Bulk Assign Leads"
                        options={assignOptions}
                        value={bulkAssign}
                        onChange={setBulkAssign}
                    />
                    <button type="submit" className='primary-btn'>Bulk Assign</button>
                </form>

                <Link className='primary-btn' to={"/leads/add"}>Add New</Link>
            </div>

            <div className="filter-container">
                <label>
                    <span>Tags</span>
                    <Select
                        placeholder="Choose Tags"
                        value={{ value: filterTag, label: filterTag }}
                        options={[
                            { value: "all", label: "All Leads" },
                            { value: "assigned", label: "Assigned Leads" },
                            { value: "unassigned", label: "Unassigned Leads" },
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
                    <span>Select Unassigned Leads</span>
                    <input
                        type="number"
                        value={selectCount}
                        onChange={(e) => setSelectCount(e.target.value)}
                        placeholder="Enter number of leads"
                    />
                </label>

                <button className='filter-btn' onClick={clearFilter}>Clear Filter</button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredLeads && filteredLeads.length > 0 ? filteredLeads.filter((l) => l.type === "fresh").map((l) => (
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
                                <td>{(l.client.program && l.client.program.country) || "Not Selected Yet"}</td>
                                <td>{(l.assignedTo && l.assignedTo.bioData.name) || "Not Assigned"}</td>

                                <td className='actions'>
                                    <Link to={`/editlead/${l._id}`}>Edit Lead</Link>
                                    <Link to={`/editlead/${l._id}`}>View Remarks</Link>
                                    <button id={l._id} onClick={deleteLeadHandler}>Delete</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="7">No Leads Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MarketingLeads;
