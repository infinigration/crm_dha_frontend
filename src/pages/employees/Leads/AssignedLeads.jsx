import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    assignLead,
    forwardLead,
    getAllLeads,
} from "../../../redux/actions/leads";
import Select from "react-select";
import { getEmployees } from "../../../redux/actions/admin";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";
import "./leads.scss";

const AssignedLeads = () => {
    const [isFOpen, setFOpen] = useState(null); // State to track which row's "Assign Lead" form is open
    const [forward, setForward] = useState("");
    const [forwardl, setForwardl] = useState("");
    const [selectedLeads, setSelectedLeads] = useState([]); // State for selected leads
    const [bulkAssign, setBulkAssign] = useState(""); // State for bulk assign

    const { employees } = useSelector((state) => state.admin);
    const { auth } = useSelector((state) => state.user);
    const { loading, error, message, leads } = useSelector(
        (state) => state.leads
    );
    const dispatch = useDispatch();

    const statusOptions = [
        {
            value: "requirements",
            label: "Requirements Gathering",
        },
        {
            value: "documents",
            label: "Documents Verification",
        },
    ];

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getAllLeads());
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

    const forwardLeadOptions = employees
        ? employees
            .filter((e) => e._id !== auth.user._id && e.job.department === "sales")
            .map((e) => ({
                value: e._id,
                label: `${e.bioData.name}, (${e.job.department})`,
            }))
        : [];

    const operationOptions = employees
        ? employees
            .filter(
                (e) => e._id !== auth.user._id && e.job.department === "operations"
            )
            .map((e) => ({
                value: e._id,
                label: `${e.bioData.name}, (${e.job.department})`,
            }))
        : [];

    const handleLeadSelect = (leadId) => {
        setSelectedLeads((prevSelectedLeads) =>
            prevSelectedLeads.includes(leadId)
                ? prevSelectedLeads.filter((id) => id !== leadId)
                : [...prevSelectedLeads, leadId]
        );
    };

    const assignSubmitHandler = (e, id) => {
        e.preventDefault();
        dispatch(assignLead(id, forward.value));
        setFOpen(null); // Close the "Assign Lead" form after submission
    };

    const forwardLeadHandler = (e, id) => {
        e.preventDefault();
        dispatch(forwardLead(id, forwardl.value));
        setFOpen(false);
    };

    const bulkAssignHandler = (e) => {
        e.preventDefault();
        if (selectedLeads.length > 0) {
            selectedLeads.forEach((leadId) => {
                dispatch(assignLead(leadId, bulkAssign.value));
            });
            setSelectedLeads([]); // Clear selected leads after assigning
            setBulkAssign(""); // Clear bulk assign selection
        } else {
            toast.error("No leads selected");
        }
    };

    return loading || !leads ? (
        <Loader />
    ) : (
        <section className="section" id="e_leads">
            {/* Bulk Assign Form */}
            {auth && auth.user.job.department === "marketing" && (
                <>
                    <div className="actions-row">
                        <Link className="primary-btn" to={"/leads/add"}>
                            Add New
                        </Link>
                    </div>
                    <form className="bulk-assign-lead" onSubmit={bulkAssignHandler}>
                        <Select
                            className="select"
                            placeholder="Bulk Assign Leads"
                            options={forwardLeadOptions}
                            value={bulkAssign}
                            onChange={setBulkAssign}
                        />
                        <button type="submit">Bulk Assign</button>
                    </form>
                </>
            )}

            <table>
                <thead>
                    <tr>
                        {auth && auth.user.job.department === "marketing" && (
                            <th>Select</th>
                        )}
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Program Selected</th>
                        <th>Created At</th>
                        <th>Delayed by</th>
                        <th>Status</th>
                        <th>Source</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {leads.leads.filter((l) => l.assignedTo === "").map((l, index) => (
                        <tr key={index}>
                            {auth && auth.user.job.department === "marketing" && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedLeads.includes(l._id)}
                                        onChange={() => handleLeadSelect(l._id)}
                                    />
                                </td>
                            )}
                            <td>{index + 1}</td>
                            <td>{l.client.name}</td>
                            <td>
                                {l.client.program
                                    ? l.client.program.generalInformation[0].country
                                    : "Not Selected Yet"}
                            </td>
                            <td>{l.createdAt.split("T")[0]}</td>
                            <td>Nill</td>
                            <td>{l.status}</td>
                            <td>{l.source}</td>
                            <td className="act-row">
                                {auth.user.job.department === "sales" && (
                                    <>
                                        <button onClick={() => setFOpen(!isFOpen)}>
                                            Forward Lead
                                        </button>
                                        <form
                                            action=""
                                            onSubmit={(e) => forwardLeadHandler(e, l._id)}
                                            style={{ display: isFOpen ? "flex" : "none" }}
                                        >
                                            <Select
                                                placeholder="Choose Person"
                                                options={operationOptions}
                                                value={forwardl}
                                                onChange={setForwardl}
                                            />
                                            <button>Apply</button>
                                        </form>
                                    </>
                                )}

                                {auth.user.job.department === "marketing" && (
                                    <>
                                        <button onClick={() => setFOpen(index)}>
                                            Assign Lead
                                        </button>
                                        {isFOpen === index && (
                                            <form onSubmit={(e) => assignSubmitHandler(e, l._id)}>
                                                <Select
                                                    placeholder="Assign Leads"
                                                    options={forwardLeadOptions}
                                                    value={forward}
                                                    onChange={setForward}
                                                />
                                                <button type="submit">Apply</button>
                                            </form>
                                        )}
                                    </>
                                )}

                                {auth.user.job.department === "operations" && (
                                    <Link to={`${l._id}/activities`}>Activities</Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AssignedLeads;
