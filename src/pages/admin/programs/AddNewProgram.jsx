import React, { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import "./program.scss";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { createProgram } from "../../../redux/actions/program";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom"
import { getAllVendors } from "../../../redux/actions/vendor";
const AddNewProgram = () => {
  const [country, setCountry] = useState();
  const [duration, setDuration] = useState();
  const [totalCost, setTotalCost] = useState();
  const [advance, setAdvance] = useState();
  const [workPermit, setWorkPermit] = useState();
  const [passportRequest, setPassportRequest] = useState();
  const [visaCost, setVisaCost] = useState();
  const [deduction, setDeduction] = useState();
  const [province, setProvince] = useState();
  const [processDuration, setProcessDuration] = useState();
  const [vendor, setVendor] = useState();
  const [vendorAmount, setVendorAmount] = useState()
  const [vendorCurrency, setVendorCurrency] = useState()

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [jobs, setJobs] = useState([{ id: 1, title: "", salary: 2 }]);
  const [documents, setDocuments] = useState([
    { id: 1, title: "", type: "file" },
  ]);
  const [requirements, setRequirements] = useState([
    { id: 1, title: "", type: "file" },
  ]);
  const [benefits, setBenefits] = useState([
    { id: 1, title: "", type: "file" },
  ]);

  const changeHandler = (value) => {
    setValue(value);
  };

  const handleInputChange = (index, event) => {
    const newJobs = [...jobs];
    newJobs[index].title = event.target.value;
    setJobs(newJobs);
  };

  const handleDocumentInputChange = (index, event) => {
    const newDoc = [...documents];
    newDoc[index].title = event.target.value;
    setDocuments(newDoc);
  };

  const handleRequirementsInputChange = (index, event) => {
    const newReq = [...requirements];
    newReq[index].title = event.target.value;
    setRequirements(newReq);
  };

  const handleBenefitsInputChange = (index, event) => {
    const newBenefit = [...benefits];
    newBenefit[index].title = event.target.value;
    setBenefits(newBenefit);
  };

  const handleSalaryChange = (index, event) => {
    const newJobs = [...jobs];
    newJobs[index].salary = event.target.value;
    setJobs(newJobs);
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const newId = jobs.length + 1;
    setJobs([...jobs, { id: newId, title: "", salary: 0 }]);
  };

  const handleRemoveJob = (index, e) => {
    e.preventDefault();
    const newJobs = [...jobs];
    newJobs.splice(index, 1);
    setJobs(newJobs);
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    const newId = documents.length + 1;
    setDocuments([...documents, { id: newId, title: "" }]);
  };

  const handleRemoveDocument = (index, e) => {
    e.preventDefault();
    const newDocument = [...documents];
    newDocument.splice(index, 1);
    setDocuments(newDocument);
  };

  const handleAddRequirement = (e) => {
    e.preventDefault();
    const newId = requirements.length + 1;
    setRequirements([...requirements, { id: newId, title: "" }]);
  };

  const handleRemoveRequirement = (index, e) => {
    e.preventDefault();
    const newReq = [...requirements];
    newReq.splice(index, 1);
    setRequirements(newReq);
  };

  const handleAddBenefit = (e) => {
    e.preventDefault();
    const newId = benefits.length + 1;
    setBenefits([...benefits, { id: newId, title: "" }]);
  };

  const handleRemoveBenefit = (index, e) => {
    e.preventDefault();
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };

  useEffect(() => {
    dispatch(getAllVendors())
  }, [])

  let { vendors } = useSelector(state => state.vendor)
  const vendorOptions = vendors && vendors.length > 0 ? vendors.map((v) => ({
    value: v._id,
    label: v.name,
  })) : [{ value: "", label: "" }]


  let vendorCurrencyOptions = [
    { value: "$", label: "USD" },
    { value: "€", label: "Euro" },
  ]




  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProgram(
        value.label,
        duration,
        totalCost,
        advance,
        workPermit,
        passportRequest,
        visaCost,
        deduction,
        province,
        processDuration,
        jobs,
        documents,
        requirements,
        benefits,
        vendor.value,
        vendorAmount,
        vendorCurrency.value
      )
    );
  };


  const { loading, error, message } = useSelector((state) => state.program);

  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/programs");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message]);

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="add-new-program">
      <form action="" onSubmit={submitHandler}>

        <div className="general-information">
          <h3>Gernal Information</h3>
          <div className="l-i">
            <label htmlFor="">Choose Country</label>
            <Select
              options={options}
              value={value}
              onChange={changeHandler}
              placeholder="Choose Country"
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Duration in Years</label>
            <input
              type="text"
              placeholder="Years e.g 1"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Total Cost (PKR)</label>
            <input
              type="text"
              placeholder="15 Lacs"
              value={totalCost}
              onChange={(event) => setTotalCost(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Advance (Installement 1 | PKR)</label>
            <input
              type="text"
              placeholder="10 Lacs"
              value={advance}
              onChange={(event) => setAdvance(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Work Permit (Installement 2 | PKR)</label>
            <input
              type="text"
              placeholder="10 Lacs"
              value={workPermit}
              onChange={(event) => setWorkPermit(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Passport Request (Installement 3 | PKR)</label>
            <input
              type="text"
              placeholder="10 Lacs"
              value={passportRequest}
              onChange={(event) => setPassportRequest(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Visa Cost</label>
            <input
              type="text"
              placeholder="10 Lacs"
              value={visaCost}
              onChange={(event) => setVisaCost(event.target.value)}
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
            <label htmlFor="">Province</label>
            <input
              type="text"
              placeholder="Punjab"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />
          </div>

          <div className="l-i">
            <label htmlFor="">Process Duration (In Months)</label>
            <input
              type="text"
              placeholder="5 Months"
              value={processDuration}
              onChange={(event) => setProcessDuration(event.target.value)}
            />
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
                  name={`job${job.id}`}
                  placeholder="Job Title"
                  value={job.title}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <input
                  type="number"
                  id={`salary${job.id}`}
                  name={`salary${job.id}`}
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
                  name={`doc${doc.id}`}
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
                  name={`req${req.id}`}
                  placeholder="Requirements Title"
                  value={req.title}
                  onChange={(event) =>
                    handleRequirementsInputChange(index, event)
                  }
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
                  name={`ben${ben.id}`}
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


        <div className="jobs-available">
          <div className="heading-row">
            <h3>Vendor Details</h3>
          </div>

          <div className="l-i">
            <label htmlFor="">Vendor</label>
            <Select placeholder="Choose Vendor"
              value={vendor} defaultInputValue={vendor} onChange={setVendor} options={vendorOptions}>
            </Select>
          </div>

          <div className="l-i">
            <label htmlFor="">Vendor Currency</label>
            <Select placeholder="Vendor Currency"
              value={vendorCurrency} defaultInputValue={vendorCurrency} onChange={setVendorCurrency} options={vendorCurrencyOptions}>
            </Select>
          </div>

          <div className="l-i">
            <label htmlFor="">Vendor Amount</label>
            <input
              type="text"
              placeholder="100"
              value={vendorAmount}
              onChange={(e) => setVendorAmount(e.target.value)}
            />
          </div>
        </div>

        <button className="submit-button">Create Program</button>
      </form>
    </section>
  );
};

export default AddNewProgram;
