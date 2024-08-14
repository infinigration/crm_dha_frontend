import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./vendor.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createVendor, getAllVendors } from "../../../../redux/actions/vendor";
import Loader from "../../../loader/Loader";

const Vendor = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error, message, loading, vendors } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    dispatch(getAllVendors());
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      setName("");

    }
  }, [error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createVendor(name));
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="vendor">

      <div className="actions-row">
        <input type="text" placeholder="Search Vendor" />
        <Link className="primary-btn" to="/admin/vendors/add">Add</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Program</th>
            <th>Amount</th>
            <th>Currency</th>

          </tr>
        </thead>

        <tbody>
          {vendors && vendors.length > 0
            ? vendors.map((v, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{v.name}</td>
                <td>{v.program.generalInformation[0].country}</td>
                <td>{v.amount}</td>
                <td>{v.currency}</td>
              </tr>
            ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default Vendor;
