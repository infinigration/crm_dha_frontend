import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees } from "../../redux/actions/admin";
import Select from "react-select";
import { getAllLeads } from "../../redux/actions/leads";

const FilteredLeads = ({ date, delay, employee }) => {
  const { leads } = useSelector((state) => state.leads);
  const { auth } = useSelector((state) => state.user);
  const [isOpen, setOpen] = useState(false);
  const [isFOpen, setFOpen] = useState(false);

  const [forward, setForward] = useState("");

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    getEmployees();
  }, []);

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

  const { employees } = useSelector((state) => state.admin);

  const forwardLeadOptions =
    employees &&
    employees
      .filter((e) => e._id !== auth.user._id)
      .map((e) => ({
        value: e._id,
        label: `${e.bioData && e.bioData.name} (${e.job && e.job.department})`,
      }));

  console.log(forwardLeadOptions);

  const updateStatusHandler = (e) => {
    e.preventDefault();
    const id = e.target.id;
    dispatch(updateLeadStatus(id, status.value));
  };

  console.log(leads);
  return (
    <section className="section" id="filtered_leads">
      <table>
        <thead>
          <tr>
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
          {leads && leads.leads.length > 0
            ? leads.leads
                .filter(
                  (f) =>
                    f.createdAt.split("T")[0] === date ||
                    (f.assignedTo &&
                      f.assignedTo._id.toString() === employee.value)
                )
                .map((l, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{l.client.name}</td>
                    <td>
                      {l.client.program &&
                        l.client.program.generalInformation[0].country}
                    </td>
                    <td>{l.createdAt.split("T")[0]}</td>
                    <td>Nill</td>
                    <td>{l.status}</td>
                    <td>{l.source}</td>
                    <td className="act-row">
                      <div className="a-row">
                        <Link to={`/admin/leads/${l._id}/activities`}>
                          Activities
                        </Link>
                        <button onClick={() => setOpen(!isOpen)}>
                          Update Status
                        </button>
                        <Link to={"/admin/contracts/add"}>
                          Convert to Contract
                        </Link>
                        <button onClick={() => setFOpen(!isFOpen)}>
                          Forward Lead
                        </button>
                      </div>

                      <form
                        action=""
                        style={{ display: isOpen ? "" : "none" }}
                        onSubmit={updateStatusHandler}
                        id={l._id}
                      >
                        <Select
                          placeholder="Change Status"
                          value={status}
                          onChange={setStatus}
                          options={statusOptions}
                          defaultValue={status}
                        />
                        <button>Apply</button>
                      </form>

                      <form
                        action=""
                        style={{ display: isFOpen ? "" : "none" }}
                      >
                        <Select
                          placeholder="Forward Leads"
                          options={forwardLeadOptions}
                          defaultValue={forward}
                          onChange={setForward}
                        />
                        <button>Apply</button>
                      </form>
                    </td>
                  </tr>
                ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default FilteredLeads;
