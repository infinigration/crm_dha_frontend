import React from "react";
import { Link } from "react-router-dom";

const PaymentsMade = () => {
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
            <th>Payment#</th>
            <th>Reference#</th>
            <th>Vendor Name</th>
            <th>Bill#</th>
            <th>Mode</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default PaymentsMade;
