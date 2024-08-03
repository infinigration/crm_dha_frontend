import React from "react";
import { Link } from "react-router-dom";

const Bills = () => {
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
            <th>Bill#</th>
            <th>Reference Number</th>
            <th>Vendor Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default Bills;
