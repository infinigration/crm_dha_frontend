import React from "react";
import { Link } from "react-router-dom";

const VendorCredits = () => {
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
            <th>Reference No</th>
            <th>Vendor Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default VendorCredits;
