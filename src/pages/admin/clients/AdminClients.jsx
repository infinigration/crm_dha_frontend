import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../../redux/actions/clients";
import "./admin.scss"; // Make sure to import the CSS file
import { Link } from "react-router-dom";
import Select from "react-select";
const AdminClients = () => {
  const dispatch = useDispatch();

  const [statusVisible, setStatusVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const { loading, clients } = useSelector((state) => state.clients);

  return (
    <section className="section" id="admin_clients">
      <div className={"actions-row"}>
        {/* <div>
              <input type="text" placeholder="Search by Name" />
            </div> */}

     
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Subagent</th>
            <th>Signing Date</th>
            <th>Name</th>
            <th>TTL Amount</th>
            <th>Email</th>
            <th>Remarks</th>
            <th>Contact No</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients && clients.length > 0
            ? clients.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{c.subagent || "Nill"}</td>
                  <td>{c.signingDate || "Not Signed"}</td>
                  <td>{c.lead.client.name}</td>
                  <td></td>

                  <td>{c.lead.client.email}</td>
                  <td>{c.lead.client.remarks || "No Remarks"}</td>
                  <td>{c.lead.client.phone}</td>
                  <td>{c.lead.status}</td>
                  <td className="actions c-actions">
                    <div>
                      <Link to={`/admin/leads/${c.lead._id}/activities`}>
                        Activites
                      </Link>
                      <Link to={`/admin/contract/${c.contract._id}`}>
                        View Contract
                      </Link>
                      {/* <Link to={`/admin/invoices/6686599a4a480b72af664d8f`}>View Invoice</Link> */}
                      <button onClick={() => setStatusVisible(!statusVisible)}>
                        Update Status
                      </button>
                    </div>
                    <form
                      action=""
                      style={{ display: statusVisible ? "block" : "none" }}
                    >
                      <Select placeholder="Choose Status" />
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

export default AdminClients;
