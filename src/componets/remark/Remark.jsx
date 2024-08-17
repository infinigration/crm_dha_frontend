import React from "react";
import "./remark.scss";
import placeholder from "../../assets/placeholder.jpg";
const Remark = ({ name, time, image, title, remark }) => {

  console.log(time)
  return (
    <div id="remark">
      <div className="profile">
        <img src={image != "temp_url" ? image : placeholder} alt="" />
        <div className="text">
          <p className="name">{name}</p>
          <p className="createdAt">{time.split("T")[0]}</p>
          <p className="createdAt">{time.split("T")[1].split(".")[0]}</p>
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
