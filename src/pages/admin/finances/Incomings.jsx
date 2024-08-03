import React from "react";
import CustomSelect from "../../../componets/CustomSelect/CustomSelect";
import { Link } from "react-router-dom";

const Incomings = () => {
  return (
    <section className="section" id="incomings">
      <div className="actions-row">
        <CustomSelect placeholder="Choose Bank Account"></CustomSelect>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Contract</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </section>
  );
};

export default Incomings;
