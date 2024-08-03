import React, { useEffect, useState } from "react";
import AdminData from "../../../../componets/admin data/AdminData";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../../../redux/actions/admin";
import { useParams } from "react-router-dom";
import Loader from "../../../loader/Loader";
import placeholder from "../../../../assets/placeholder.jpg";
const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { loading, error, message, employee } = useSelector(
    (state) => state.admin
  );
  const [email, setEmail] = useState(employee ? employee.employee.email : "");
  const [name, setName] = useState(employee && employee.employee.name);
  const [role, setRole] = useState(employee && employee.employee.role);

  useEffect(() => {
    dispatch(getEmployee(params.id));
  }, []);
  return loading ? (
    <Loader /> || !employee || !employee.employee
  ) : (
    <section className="section" id="employee-profile">
      <div className="profile-container">
        <div className="image-container">
          <img
            src={
              employee && employee.employee.avatar.url === "temp_url"
                ? placeholder
                : employee && employee.employee.avatar.url
            }
            alt=""
          />
          <span>
            Joined On: {employee && employee.employee.createdAt.split("T")[0]}
          </span>
          <button className="primary-btn">Upload Profile Picture</button>
        </div>

        <div className="stats-container">
          <AdminData description={"Leads Assigned"} number={0} />
          <AdminData description={"Conversion"} number={0} />
          <AdminData description={"Success Ration"} number={0} />
        </div>
      </div>

      <div className="details-container">
        <h2 className="heading">Bio Data</h2>
        <p>
          Name <span>{employee && employee.employee.bioData.name}</span>
        </p>

        <p>
          Father Name{" "}
          <span>{employee && employee.employee.bioData.fatherName}</span>
        </p>

        <p>
          CNIC <span>{employee && employee.employee.bioData.cnic}</span>
        </p>
        <p>
          Mobile No <span>{employee && employee.employee.bioData.mobile}</span>
        </p>

        <p>
          Email <span>{employee && employee.employee.bioData.email}</span>
        </p>

        <p>
          Gender <span>{employee && employee.employee.bioData.gender}</span>
        </p>

        <p>
          Date of Birth{" "}
          <span>{employee && employee.employee.bioData.dob.split("T")[0]}</span>
        </p>

        <p>
          Marital Status{" "}
          <span>{employee && employee.employee.bioData.maritalStatus}</span>
        </p>

        <p>
          Relegion <span>{employee && employee.employee.bioData.relegion}</span>
        </p>

        <p>
          Nationality{" "}
          <span>{employee && employee.employee.bioData.nationality}</span>
        </p>

        <h2 className="heading">Job</h2>

        <p>
          Nationality <span>{employee && employee.employee.job.title}</span>
        </p>

        <p>
          Department <span>{employee && employee.employee.job.department}</span>
        </p>

        <p>
          Salary <span>{employee && employee.employee.job.salary} PKR</span>
        </p>
      </div>
    </section>
  );
};

export default EmployeeProfile;
