import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import CustomSelect from "../../../componets/CustomSelect/CustomSelect";
const PaymentsReceived = () => {
  return (
    <section className="section" id="payments-received">
      <div className="actions-row">
        <CustomSelect placeholder="Choose Bank Account"></CustomSelect>
        <Link className="primary-btn" to={""}>
          Add New
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payment</th>
            <th>Type</th>
            <th>Client Name</th>
            <th>Invoice#</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>30 Apr 2022</td>
            <td>
              <Link>271</Link>
            </td>
            <td>Invoice Payment</td>
            <td>Shahzaib Khan</td>
            <td>
              <Link>INV-00157</Link>
            </td>
            <td>PKR 100000</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PaymentsReceived;
