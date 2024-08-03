import React from "react";
import "./remark.scss";
import placeholder from "../../assets/placeholder.jpg";
const Remark = ({ name, image, time, title, remark }) => {
  return (
    <div id="remark">
      <div className="profile">
        <img src={image != "temp_url" ? image : placeholder} alt="" />
        <div className="text">
          <p className="name">{name}</p>
          <p className="createdAt">{time}</p>
        </div>
      </div>
      <div className="content">
        <p className="title">{title}</p>
        <p className="para">{remark}</p>
      </div>
    </div>
  );
};

export default Remark;
