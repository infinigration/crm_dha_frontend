import React from "react";
import "./admin-data.scss";
import { Link } from "react-router-dom";
const AdminData = ({ category, number, description, link }) => {
  return (
    <div id="admin-data" className={category}>
      <p className="number">{number}</p>
      <p className="description">{description}</p>
      <Link to={link}>View</Link>
    </div>
  );
};

export default AdminData;
