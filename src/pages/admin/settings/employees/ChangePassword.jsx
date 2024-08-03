import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/Loader";
import "./emplyee.scss";
import { changePassword } from "../../../../redux/actions/admin";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { loading, error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/settings/employee");
    }
  }, [error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(changePassword(params.id, oldPassword, newPassword));
  };
  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="change-password">
      <div className="content">
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="primary-btn">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
