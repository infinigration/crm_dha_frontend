import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendorsPayment } from "../../../redux/actions/vendor";
import { Link } from "react-router-dom";

const VendorPayments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVendorsPayment());
  }, []);

  const { vendorPayments } = useSelector((state) => state.vendor);

  console.log(vendorPayments);

  return (
    <section className="section" id="vendor-payments">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Contract</th>
            <th>Total Amount</th>
            <th>Comisson Percentage</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendorPayments && vendorPayments.length > 0
            ? vendorPayments.map((v, index) => (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td>{v.vendor.name}</td>
                  <td>{v.contract}</td>
                  <td>{v.totalAmount}</td>
                  <td>{v.commisson}%</td>
                  <td>{v.status || "Not Paid"}</td>
                  <td><Link>Pay</Link></td>

                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default VendorPayments;
