import React from "react";
import "./remark.scss";
import placeholder from "../../assets/placeholder.jpg";
import moment from "moment-timezone"
import { convertTimeToPKT } from "../../utils/utils";
const Remark = ({ name, time, image, title, remark }) => {


  return (
    <div id="remark">
      <div className="profile">
        <img src={image != "temp_url" ? image : placeholder} alt="" />
        <div className="text">
          <p className="name">{name}</p>
          <p className="createdAt">{convertTimeToPKT(time).date}</p>
          <p className="createdAt">{convertTimeToPKT(time).time}</p>
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
