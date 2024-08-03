import React from "react";
import { Link } from "react-router-dom";

const Expense = () => {
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
            <th>Expense Account</th>
            <th>Reference#</th>
            <th>Vendor Name</th>
            <th>Paid Through</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default Expense;
