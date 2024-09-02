import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./program.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateProgram } from "../../../redux/actions/program";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProgram = () => {
  const { id } = useParams();
  const params = useParams()
  const { programs } = useSelector(state => state.program)
  let selectedProgram = programs && programs.length > 0 ? programs.find((p) => p._id === params.id) : {}

  const [country, setCountry] = useState({ value: selectedProgram.generalInformation[0].country, label: selectedProgram.generalInformation[0].country });
  const [title, setTitle] = useState(selectedProgram.generalInformation[0].title);
  const [duration, setDuration] = useState(selectedProgram.generalInformation[0].duration);
  const [totalCost, setTotalCost] = useState(selectedProgram.generalInformation[0].totalCost);
  const [deduction, setDeduction] = useState(selectedProgram.generalInformation[0].deduction);
  const [processDuration, setProcessDuration] = useState(selectedProgram.generalInformation[0].processDuration);
  const [jobs, setJobs] = useState(selectedProgram.jobs);
  const [documents, setDocuments] = useState(selectedProgram.documents);
  const [requirements, setRequirements] = useState(selectedProgram.requirements);
  const [benefits, setBenefits] = useState(selectedProgram.benefits);
  const [timelineProcesses, setTimelineProcesses] = useState(selectedProgram.processes);
  const [currency, setCurrency] = useState({ value: selectedProgram.generalInformation[0].currency, label: selectedProgram.generalInformation[0].currency })

  const handleInputChange = (index, event) => {
    const values = [...jobs];
    values[index][event.target.name] = event.target.value;
    setJobs(values);
  };

  const handleRemoveJob = (index, e) => {
    e.preventDefault();
    const values = [...jobs];
    values.splice(index, 1);
    setJobs(values);
  };

  const handleDocumentInputChange = (index, event) => {
    const values = [...documents];
    values[index][event.target.name] = event.target.value;
    setDocuments(values);
  };

  const handleRemoveDocument = (index, e) => {
    e.preventDefault();
    const values = [...documents];
    values.splice(index, 1);
    setDocuments(values);
  };

  const handleRequirementsInputChange = (index, event) => {
    const values = [...requirements];
    values[index][event.target.name] = event.target.value;
    setRequirements(values);
  };

  const handleRemoveRequirement = (index, e) => {
    e.preventDefault();
    const values = [...requirements];
    values.splice(index, 1);
    setRequirements(values);
  };

  const handleBenefitsInputChange = (index, event) => {
    const values = [...benefits];
    values[index][event.target.name] = event.target.value;
    setBenefits(values);
  };

  const handleRemoveBenefit = (index, e) => {
    e.preventDefault();
    const values = [...benefits];
    values.splice(index, 1);
    setBenefits(values);
  };

  const handleTimelineProcessChange = (index, event) => {
    const values = [...timelineProcesses];
    values[index][event.target.name] = event.target.value;
    setTimelineProcesses(values);
  };

  const handleRemoveTimelineProcess = (index, e) => {
    e.preventDefault();
    const values = [...timelineProcesses];
    values.splice(index, 1);
    setTimelineProcesses(values);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProgram(
      id,
      country.value,
      title,
      duration,
      totalCost,
      deduction,
      processDuration,
      currency.value,
      jobs,
      documents,
      requirements,
      benefits,
      timelineProcesses
    ));
  };

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  const { message, error, loading } = useSelector((state) => state.program);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/operations/programs");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error]);

  return (
    loading ? <Loader /> : <section className="section" id="update-program">
      <form onSubmit={submitHandler}>
        <div className="general-information">
          <h3>General Information</h3>
          <div className="l-i">
            <label htmlFor="">Choose Country</label>
            <Select
              options={options}
              value={country}
              onChange={changeHandler}
              placeholder="Choose Country"
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g Canada TRC"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Duration of Work Permit</label>
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Total Cost</label>
            <input
              type="text"
              placeholder="Enter Total Cost"
              value={totalCost}
              onChange={(event) => setTotalCost(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Deduction (PKR)</label>
            <input
              type="text"
              placeholder="10 Lacs"
              value={deduction}
              onChange={(event) => setDeduction(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Process Duration</label>
            <input
              type="text"
              placeholder="5 Months"
              value={processDuration}
              onChange={(event) => setProcessDuration(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Currency</label>
            <Select placeholder="Choose Currency" value={currency} onChange={setCurrency}
              options={[
                { value: "PKR", label: "PKR" },
                { value: "USD", label: "USD" },
                { value: "CAD", label: "CAD" },
                { value: "Pounds", label: "Pounds" },
                { value: "Euros", label: "Euros" },

              ]}
            ></Select>
          </div>
        </div>

        <div className="jobs-available">
          <div className="heading-row">
            <h3>Jobs Available</h3>
          </div>

          <div className="l">
            {jobs.map((job, index) => (
              <div key={job.id} className="l-i">
                <label htmlFor={`job${job.id}`}>Job {job.id}</label>
                <input
                  type="text"
                  id={`job${job.id}`}
                  name="title"
                  placeholder="Job Title"
                  value={job.title}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <input
                  type="number"
                  id={`salary${job.id}`}
                  name="salary"
                  placeholder="Salary"
                  value={job.salary}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <button
                  className="remove"
                  onClick={(e) => handleRemoveJob(index, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-available">
          <div className="heading-row">
            <h3>Required Documents</h3>
          </div>

          <div className="l">
            {documents.map((doc, index) => (
              <div key={doc.id} className="l-i">
                <label htmlFor={`doc${doc.id}`}>Document {doc.id}</label>
                <input
                  type="text"
                  id={`doc${doc.id}`}
                  name="title"
                  placeholder="Document Title"
                  value={doc.title}
                  onChange={(event) => handleDocumentInputChange(index, event)}
                />
                <button
                  className="remove"
                  onClick={(e) => handleRemoveDocument(index, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-available">
          <div className="heading-row">
            <h3>Requirements</h3>
          </div>

          <div className="l">
            {requirements.map((req, index) => (
              <div key={req.id} className="l-i">
                <label htmlFor={`req${req.id}`}>Requirement {req.id}</label>
                <input
                  type="text"
                  id={`req${req.id}`}
                  name="title"
                  placeholder="Requirement Title"
                  value={req.title}
                  onChange={(event) => handleRequirementsInputChange(index, event)}
                />
                <button
                  className="remove"
                  onClick={(e) => handleRemoveRequirement(index, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-available">
          <div className="heading-row">
            <h3>Benefits</h3>
          </div>

          <div className="l">
            {benefits.map((benefit, index) => (
              <div key={benefit.id} className="l-i">
                <label htmlFor={`benefit${benefit.id}`}>Benefit {benefit.id}</label>
                <input
                  type="text"
                  id={`benefit${benefit.id}`}
                  name="title"
                  placeholder="Benefit Title"
                  value={benefit.title}
                  onChange={(event) => handleBenefitsInputChange(index, event)}
                />
                <button
                  className="remove"
                  onClick={(e) => handleRemoveBenefit(index, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-available">
          <div className="heading-row">
            <h3>Timeline Process</h3>
          </div>

          <div className="l">
            {timelineProcesses.map((timelineProcess, index) => (
              <div key={timelineProcess.id} className="l-i">
                <label htmlFor={`timelineProcess${timelineProcess.id}`}>
                  Process {timelineProcess.id}
                </label>
                <input
                  type="text"
                  id={`timelineProcess${timelineProcess.id}`}
                  name="title"
                  placeholder="Process Title"
                  value={timelineProcess.title}
                  onChange={(event) => handleTimelineProcessChange(index, event)}
                />
                <input
                  type="text"
                  id={`duration${timelineProcess.id}`}
                  name="duration"
                  placeholder="Duration"
                  value={timelineProcess.duration}
                  onChange={(event) => handleTimelineProcessChange(index, event)}
                />
                <button
                  className="remove"
                  onClick={(e) => handleRemoveTimelineProcess(index, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="primary-btn" >
          Update Program
        </button>
      </form>
    </section>
  );
};

export default UpdateProgram;
