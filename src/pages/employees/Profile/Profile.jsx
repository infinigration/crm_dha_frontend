import React, { useState } from "react";
import "./profile.scss";
import AdminData from "../../../componets/admin data/AdminData";
import { useSelector } from "react-redux";
import placeholder from "../../../assets/placeholder.jpg";


const Profile = () => {
  const { auth, isAuthenticated } = useSelector((state) => state.user);

  // State variables for bio data
  const [name, setName] = useState(auth.user.bioData.name);
  const [fatherName, setFatherName] = useState(auth.user.bioData.fatherName);
  const [cnic, setCnic] = useState(auth.user.bioData.cnic);
  const [mobile, setMobile] = useState(auth.user.bioData.mobile);
  const [email, setEmail] = useState(auth.user.bioData.email);
  const [gender, setGender] = useState(auth.user.bioData.gender);
  const [dob, setDob] = useState(auth.user.bioData.dob);
  const [maritalStatus, setMaritalStatus] = useState(auth.user.bioData.maritalStatus);
  const [religion, setReligion] = useState(auth.user.bioData.religion);
  const [nationality, setNationality] = useState(auth.user.bioData.nationality);

  // State variables for job data
  const [jobTitle, setJobTitle] = useState(auth.user.job.title);
  const [department, setDepartment] = useState(auth.user.job.department);
  const [salary, setSalary] = useState(auth.user.job.salary + " PKR");

  console.log(auth.user.bioData);
  return (
    <section id="profile" className="section">
      <div className="stats-row">
        <div className="profile-container">
          <img
            src={
              auth.user.avatar.url !== "temp_url"
                ? auth.user.avatar.url
                : placeholder
            }
            alt=""
          />
          <p className="date-joined">
            <span>Date Joined: </span>
            {auth.user.createdAt.split("T")[0]}
          </p>
        </div>
      </div>
      <form action="">
        <h2 className="heading">Bio Data</h2>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Father's Name:</label>
        <input
          type="text"
          placeholder="Father's Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
        />
        <label>CNIC:</label>
        <input
          type="text"
          placeholder="Enter Your CNIC"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
        />
        <label>Mobile:</label>
        <input
          type="text"
          placeholder="Enter Your Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Gender:</label>
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Date of Birth:</label>
        <input
          type="text"
          placeholder="D.O.B"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label>Marital Status:</label>
        <input
          type="text"
          placeholder="Marital Status"
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
        />
        <label>Religion:</label>
        <input
          type="text"
          placeholder="Religion"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
        />
        <label>Nationality:</label>
        <input
          type="text"
          placeholder="Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />

        <h2 className="heading">Job</h2>

        <label>Job Title:</label>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <label>Department:</label>
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <label>Salary:</label>
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Profile;
