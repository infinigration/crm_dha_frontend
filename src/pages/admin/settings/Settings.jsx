import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <section className="section" id="admin-settings">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Setting Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>01</td>
            <td>Employees</td>
            <td>
              <Link to={"employees"}>View</Link>
            </td>
          </tr>

          <tr>
            <td>03</td>
            <td>Leads Setting</td>
            <td>
              <Link to={"leads"}>View</Link>
            </td>
          </tr>

          <tr>
            <td>04</td>
            <td>Vendors</td>
            <td>
              <Link to={"/admin/vendors"}>View</Link>
            </td>
          </tr>

          <tr>
            <td>03</td>
            <td>Sub Agents</td>
            <td>
              <Link to={"leads"}>View</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Settings;
