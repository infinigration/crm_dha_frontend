import React from "react";
import { Link } from "react-router-dom";

const CreditNotes = () => {
  return (
    <section className="section">
      <div className="actions-row">
        <div>
          <Link className="primary-btn">Add New</Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Credit Note#</th>
            <th>Reference Number</th>
            <th>Customer Name</th>
            <th>Invoice#</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default CreditNotes;
