import React from "react";
import { FaWallet } from "react-icons/fa6";
import "./f.scss";

const FStats = ({ icon: Icon, title, number }) => {
  return (
    <div className="f-stats">
      <div className="icon">
        <Icon />
      </div>
      <p className="title">{title}</p>
      <p className="number">PKR {number}</p>
    </div>
  );
};

export default FStats;
