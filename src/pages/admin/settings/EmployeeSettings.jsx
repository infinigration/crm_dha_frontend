import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees } from "../../../redux/actions/admin";
import Loader from "../../loader/Loader";

const EmployeeSettings = () => {
  const dispatch = useDispatch();

  const { loading, employees } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getEmployees());
  }, []);
  return loading ? (
    <Loader /> || !employees
  ) : (
    <section className="section" id="employee-settings">
      <div className="actions-row">
        <Link className="primary-btn" to={"/admin/settings/employees/add"}>
          Add New Employee
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
            <th>Links</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees && employees.length > 0
            ? employees.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.bioData && e.bioData.name}</td>
                  <td>{e.bioData && e.bioData.email}</td>
                  <td>{e.bioData && e.job.department}</td>
                  <td className="actions">
                    <Link
                      to={`/admin/settings/employees/${e._id}/changepassword`}
                    >
                      Change Password
                    </Link>
                    <Link to={`/admin/settings/employees/${e._id}/profile`}>
                      View Profile
                    </Link>
                    <Link>Send Email</Link>
                  </td>
                  <td>
                    <Link>Login</Link>
                  </td>
                  <td>Active</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default EmployeeSettings;
