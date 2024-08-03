import React, { useEffect, useState } from "react";
import "./emplyee.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../../redux/actions/admin";
import toast from "react-hot-toast";
import Loader from "../../../loader/Loader";
import { useNavigate } from "react-router-dom";

const AddNewEmployee = () => {
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [department, setDepartment] = useState(null);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");

  const roleOptions = [
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
  ];

  const depOptions = [
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "operations", label: "Operations" },
  ];

  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/settings/employees");
    }
  }, [error, message, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createUser(
        name,
        fatherName,
        cnic,
        mobileNumber,
        email,
        gender.value,
        dob,
        maritalStatus.value,
        religion,
        nationality,
        jobTitle,
        department.value,
        salary,
        role.value,
        password
      )
    );

    console.log(
      name,
      fatherName,
      cnic,
      mobileNumber,
      email,
      gender.value,
      dob,
      maritalStatus.value,
      religion,
      nationality,
      jobTitle,
      department.value,
      salary,
      role.value,
      password
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="add-new-employee">
      <div className="content">
        <form onSubmit={submitHandler}>
          <h2 className="heading">Bio Data</h2>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Father's Name</label>
          <input
            type="text"
            placeholder="Father Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />

          <label>CNIC</label>
          <input
            type="text"
            placeholder="CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />

          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Gender</label>
          <Select
            styles={selectStyles}
            placeholder="Choose Gender"
            options={genderOptions}
            value={gender}
            onChange={setGender}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <label>Marital Status</label>
          <Select
            styles={selectStyles}
            placeholder="Marital Status"
            options={maritalStatusOptions}
            value={maritalStatus}
            onChange={setMaritalStatus}
          />

          <label>Religion</label>
          <input
            type="text"
            placeholder="Religion"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />

          <label>Nationality</label>
          <input
            type="text"
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />

          <label>Role</label>
          <Select
            styles={selectStyles}
            placeholder="Choose Role"
            options={roleOptions}
            value={role}
            onChange={setRole}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h2 className="heading">Job Details</h2>

          <label>Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label>Department</label>
          <Select
            styles={selectStyles}
            placeholder="Choose Department"
            options={depOptions}
            value={department}
            onChange={setDepartment}
          />

          <label>Salary</label>
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            Create Employee
          </button>
        </form>
      </div>
    </section>
  );
};

const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    width: "69vw",
    border: "transparent",
    backgroundColor: "#F1F1F1",
    fontSize: "14px",
    padding: "3px",
    color: "#363636",
  }),
};

export default AddNewEmployee;
