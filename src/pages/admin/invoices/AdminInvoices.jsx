import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./invoices.scss";
import CustomSelect from "../../../componets/CustomSelect/CustomSelect";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../../redux/actions/invoice";
const AdminInvoices = () => {
  const [filter, setFilter] = useState();
  const options = [
    { value: "bank", label: "Bank" },
    { value: "cash", label: "Cash" },
  ];
  const [open, isOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInvoices());
  }, []);

  const { invoices } = useSelector((state) => state.invoices);
  return (
    <section className="section" id="admin-invoices">
      <div className="actions-row">
        <CustomSelect
          placeholder="Bank"
          options={options}
          defaultValue={filter}
          value={filter}
          onChange={setFilter}
        />

        <Link className="primary-btn" to={"/admin/invoices/add"}>
          Add New
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Date</th>
            <th>Total</th>
            <th>Installements</th>
            <th>Paid</th>
            <th>Outstanding</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices && invoices.length > 0
            ? invoices.map((i, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.createdAt.split("T")[0]}</td>
                  <td>{i.totalAmount} PKR</td>
                  <td className="span-td">
                    {i.contract && i.contract.installements.length}
                  </td>

                  <td>{i.paid} PKR</td>
                  <td>{i.outstanding} PKR</td>
                  <td className="act-row">
                    <div className="a-row">
                      <Link to={`/admin/invoices/${i._id}`}>View</Link>
                      <button>Download</button>
                      <button onClick={() => isOpen(!open)}>Send</button>
                    </div>

                    <form action="" style={{ display: open ? "flex" : "none" }}>
                      <CustomSelect
                        placeholder="Select Installement"
                        color=""
                      />
                      <button>Send</button>
                    </form>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default AdminInvoices;
