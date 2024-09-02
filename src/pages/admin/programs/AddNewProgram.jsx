import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./program.scss";
import { useDispatch, useSelector } from "react-redux";
import { createProgram } from "../../../redux/actions/program";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";

const AddNewProgram = () => {
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [deduction, setDeduction] = useState("");
  const [processDuration, setProcessDuration] = useState("");
  const [jobs, setJobs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [timelineProcesses, setTimelineProcesses] = useState([]);
  const [currency, setCurrency] = useState("")

  const handleAddJob = () => {
    setJobs([...jobs, { id: jobs.length + 1, title: "", salary: "" }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...jobs];
    values[index][event.target.name] = event.target.value;
    setJobs(values);
  };

  const handleSalaryChange = (index, event) => {
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

  const handleAddDocument = () => {
    setDocuments([...documents, { id: documents.length + 1, title: "" }]);
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

  const handleAddRequirement = () => {
    setRequirements([...requirements, { id: requirements.length + 1, title: "" }]);
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

  const handleAddBenefit = () => {
    setBenefits([...benefits, { id: benefits.length + 1, title: "" }]);
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

  const handleAddTimelineProcess = () => {
    setTimelineProcesses([...timelineProcesses, { id: timelineProcesses.length + 1, title: "" }]);
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProgram(
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
      timelineProcesses))

  };

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };


  const { message, error, loading } = useSelector(state => state.program)

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
      navigate("/operations/programs")
    }

    if (error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }
  }, [message, error])
  return (
    loading ? <Loader /> : <section className="section" id="add-new-program">
      <form action="" onSubmit={submitHandler}>
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
            <button onClick={handleAddJob}>Add Job</button>
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
                  onChange={(event) => handleSalaryChange(index, event)}
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
            <button onClick={handleAddDocument}>Add Documents</button>
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
            <button onClick={handleAddRequirement}>Add Requirements</button>
          </div>

          <div className="l">
            {requirements.map((req, index) => (
              <div key={req.id} className="l-i">
                <label htmlFor={`req${req.id}`}>Requirements {req.id}</label>
                <input
                  type="text"
                  id={`req${req.id}`}
                  name="title"
                  placeholder="Requirements Title"
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
            <button onClick={handleAddBenefit}>Add Benefits</button>
          </div>

          <div className="l">
            {benefits.map((ben, index) => (
              <div key={ben.id} className="l-i">
                <label htmlFor={`ben${ben.id}`}>Benefits {ben.id}</label>
                <input
                  type="text"
                  id={`ben${ben.id}`}
                  name="title"
                  placeholder="Benefits Title"
                  value={ben.title}
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

        <div className="timeline-process">
          <div className="heading-row">
            <h3>Timeline Processes</h3>
            <button onClick={handleAddTimelineProcess}>Add Timeline Process</button>
          </div>

          <div className="l">
            {timelineProcesses.map((process, index) => (
              <div key={process.id} className="l-i">
                <label htmlFor={`process${process.id}`}>Process {process.id}</label>
                <input
                  type="text"
                  id={`process${process.id}`}
                  name="title"
                  placeholder="Timeline Process Title"
                  value={process.title}
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

        <button type="submit" className="primary-btn">Submit</button>
      </form>
    </section>
  );
};

export default AddNewProgram;
