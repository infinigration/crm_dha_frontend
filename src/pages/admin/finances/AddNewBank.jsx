import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { createBank } from "../../../redux/actions/bank";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AddNewBank = () => {
  const [accTitle, setAccTitle] = useState("");
  const [accNo, setAccNo] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.bank);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      <Navigate to={"/admin/finances"} />;
    }
  }, [error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(accTitle, accNo, address, country);
    dispatch(createBank(accTitle, accNo, address, country));
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="add-new-bank">
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Your Account Title"
          value={accTitle}
          onChange={(e) => setAccTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Account No"
          value={accNo}
          onChange={(e) => setAccNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="primary-btn">Create</button>
      </form>
    </section>
  );
};

export default AddNewBank;
