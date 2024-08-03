import React, { useEffect } from "react";
import "./contract.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllContracts } from "../../../redux/actions/contract";
const Contracts = () => {
  const dispatch = useDispatch();
  const { contracts } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(getAllContracts());
  }, []);

  console.log(contracts);

  return (
    <section className="section" id="contracts">
      <div className="actions-row">
        <input type="text" placeholder="Search" />
        <Link to={"/admin/contracts/add"} className="primary-btn">
          Add New
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Signing Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contracts && contracts.contracts.length > 0
            ? contracts.contracts.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{c.lead && c.lead.client.name}</td>
                  <td>{c.createdAt.split("T")[0]}</td>
                  <td>{c.lead && c.lead.status}</td>
                  <td>{c.signingDate || "Not Signed"}</td>
                  <td>
                    {c.program.generalInformation[0].totalCost} (PKR)
                  </td>
                  <td className="actions">
                    <Link to={`/admin/contract/${c._id}`}>View</Link>
                    <Link to={`/admin/invoices/add/${c._id}`}>Convert to Invoice</Link>
                    <button>Mark as Signed</button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default Contracts;
