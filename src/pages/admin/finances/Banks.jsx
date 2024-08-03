import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBanks } from "../../../redux/actions/bank";

const Banks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBanks());
  }, []);

  const { banks } = useSelector((state) => state.bank);

  return (
    <section className="section" id="banks">
      <div className="actions-row">
        <Link className="primary-btn" to={"/admin/bank/new"}>
          Add New
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Account Title</th>
            <th>Account No</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {banks && banks.length > 0
            ? banks.map((b, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.accNo}</td>
                  <td>{b.country}</td>
                  <td>
                    <Link to={`/admin/bank/${b._id}`}>View</Link>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default Banks;
