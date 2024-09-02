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
          <h3>Title</h3>
          <p>{filteredProgram.generalInformation[0].title}</p>
        </div>

        <div className="feild">
          <h3>Duration</h3>
          <p>{filteredProgram.generalInformation[0].duration}</p>
        </div>

        <div className="feild">
          <h3>Total Cost</h3>
          <p>{filteredProgram.generalInformation[0].totalCost} {filteredProgram.generalInformation[0].currency}</p>
        </div>




        <div className="feild">
          <h3>Deduction</h3>
          <p>{filteredProgram.generalInformation[0].deduction} {filteredProgram.generalInformation[0].currency}</p>
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
            <p>{j.salary}</p>
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

      <div className="general-information">
        <h2>Process</h2>

        {filteredProgram.processes && filteredProgram.processes.map((j) => (
          <div className="feild">
            <h3>{j.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramDetails;
