import React from "react";
import { Link } from "react-router-dom";
import Report from "../../../componets/report/Report";
import "./reports.scss";
const Reports = () => {
  return (
    <section className="section" id="reports">
      <div className="reports-cotent">
        <Report title={"Leads Reports"} />
        <Report title={"Contract Reports"} />
        <Report title={"Invoice Reports"} />
        <Report title={"Employee Reports"} />
      </div>
    </section>
  );
};

export default Reports;
