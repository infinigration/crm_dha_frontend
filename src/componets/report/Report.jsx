import React from "react";
import { Link } from "react-router-dom";
import "./report.scss";
const Report = ({ title }) => {
  return (
    <div className="report">
      <p className="title">{title}</p>
      <ul>
        <Link>Overall Report</Link>
        <Link>Updated Leads</Link>
      </ul>
    </div>
  );
};

export default Report;
