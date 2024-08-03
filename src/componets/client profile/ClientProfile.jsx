import React, { useState } from "react";
import "./client-profile.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { uploadClientProfile } from "../../redux/actions/leads";
import Loader from "../../pages/loader/Loader";
import { useParams } from "react-router-dom";
const ClientProfile = ({ client, assignedTo, leadId }) => {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [avatar, setAvatar] = useState("");
  const params = useParams();
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(file);
    };
  };

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.leads);
  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", avatar);

    console.log(params.id)
    dispatch(uploadClientProfile(myForm, params.id));
  };
  return loading ? (
    <Loader />
  ) : (
    <div id="client-profile">
      <form className="img-box" onSubmit={submitHandler}>
        <img src={client.avatar.url} alt="" />
        <input type="file" onChange={changeImageHandler} />
        <button className="primary-btn">Update Picture</button>
      </form>
      <form action="">
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Assigne To</label>
          <input
            type="text"
            placeholder="Assigned To"
            readOnly
            value={assignedTo && assignedTo.bioData.name}
          />
        </div>

        {/* <button className="primary-btn">Update</button> */}
      </form>

      {/* <div className="cta">
      <Select placeholder="Status" />
    </div> */}
    </div>
  );
};

export default ClientProfile;
