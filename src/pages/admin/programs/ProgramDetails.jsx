import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./program.scss";
const ProgramDetails = () => {
  const { programs } = useSelector((state) => state.program);
  const params = useParams();

  const filteredProgram = programs.find((p) => p._id === params.id);

  return (
    <section className="section" id="program-details">
      <div className="general-information">
        <h2>General Information</h2>
        <div className="feild">
          <h3>Country</h3>
          <p>{filteredProgram.generalInformation[0].country}</p>
        </div>

        <div className="feild">
          <h3>Duration</h3>
          <p>{filteredProgram.generalInformation[0].duration} Year</p>
        </div>

        <div className="feild">
          <h3>Total Cost</h3>
          <p>{filteredProgram.generalInformation[0].totalCost} Lacs</p>
        </div>

        <div className="feild">
          <h3>Advance (1st Installement)</h3>
          <p>{filteredProgram.generalInformation[0].advance} Lacs</p>
        </div>

        <div className="feild">
          <h3>Work Permit (2nd Installement)</h3>
          <p>{filteredProgram.generalInformation[0].workPermit} Lacs</p>
        </div>

        <div className="feild">
          <h3>Passport Request (3rd Installement)</h3>
          <p>{filteredProgram.generalInformation[0].passportRequest} Lacs</p>
        </div>

        <div className="feild">
          <h3>Visa Cost</h3>
          <p>{filteredProgram.generalInformation[0].visaCost} Lacs</p>
        </div>

        <div className="feild">
          <h3>Deduction</h3>
          <p>{filteredProgram.generalInformation[0].deduction} Lacs</p>
        </div>

        <div className="feild">
          <h3>Province</h3>
          <p>{filteredProgram.generalInformation[0].province}</p>
        </div>

        <div className="feild">
          <h3>Process Duaration</h3>
          <p>{filteredProgram.generalInformation[0].processDuration} Months</p>
        </div>
      </div>

      <div className="general-information">
        <h2>Jobs Available</h2>

        {filteredProgram.jobs.map((j) => (
          <div className="feild">
            <h3>{j.title}</h3>
            <p>{j.salary} PKR</p>
          </div>
        ))}
      </div>

      <div className="general-information">
        <h2>Documents Required</h2>

        {filteredProgram.documents.map((j) => (
          <div className="feild">
            <h3>{j.title}</h3>
            <p>{j.type}</p>
          </div>
        ))}
      </div>

      <div className="general-information">
        <h2>Requirements</h2>

        {filteredProgram.requirements.map((j) => (
          <div className="feild">
            <h3>{j.title}</h3>
          </div>
        ))}
      </div>

      <div className="general-information">
        <h2>Benefits</h2>

        {filteredProgram.benefits && filteredProgram.benefits.map((j) => (
          <div className="feild">
            <h3>{j.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramDetails;
