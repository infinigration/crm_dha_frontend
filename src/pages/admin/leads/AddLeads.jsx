import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./add-leads.scss";
import { useDispatch, useSelector } from "react-redux";
import { GoUpload } from "react-icons/go";
import { createLead } from "../../../redux/actions/leads";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import Select from "react-select";
import { getAllPrograms } from "../../../redux/actions/program";
import * as XLSX from "xlsx";

const AddLeads = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientSource, setClientSource] = useState("");
  const [campaign, setCampaign] = useState("");
  const [leads, setLeads] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.leads);
  const navigate = useNavigate();
  const { programs } = useSelector((state) => state.program);

  const sourceOptions = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
  ];

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/leads");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newLead = {
      name: clientName,
      phone: clientPhone,
      source: clientSource.value,
      city: clientCity,
      campaign: campaign,
      status: "Created",
    };
    const updatedLeads = [...leads, newLead];
    dispatch(createLead(updatedLeads));

    setClientName("");
    setClientPhone("");
    setClientCity("");
    setClientSource("");
    setCampaign("");
    setLeads([]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extracting leads data from rows and ignoring the first row (header)
      const newLeads = rows.slice(1).map((row) => ({
        name: row[0],
        phone: row[1],
        source: row[2],
        city: row[3],
        campaign: row[4],
        status: "Created",
      }));

      // Updating leads state
      setLeads((prevLeads) => [...prevLeads, ...newLeads]);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  useEffect(() => {
    dispatch(getAllPrograms());
  }, [dispatch]);

  const programOptions =
    programs && programs.length > 0
      ? programs.map((p) => ({
          value: p._id,
          label: p.generalInformation[0].country,
        }))
      : "";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(createLead(leads));
  };

  return loading ? (
    <Loader />
  ) : (
    <section id="add-leads" className="section">
      <div className="row">
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Client City"
            value={clientCity}
            onChange={(e) => setClientCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client Phone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Campaign"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
          />

          <Select
            placeholder="Choose Source"
            value={clientSource}
            onChange={setClientSource}
            defaultValue={clientSource}
            options={sourceOptions}
          />
          <button className="primary-btn">Submit</button>
        </form>
        <div className="upload-file">
          <div {...getRootProps()}>
            <GoUpload />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop excel file here, or click to select files</p>
            )}
          </div>
        </div>
      </div>

      {/* Display parsed leads */}
      {leads.length > 0 && (
        <div className="parsed-leads">
          <h3>Parsed Leads:</h3>
          <ul>
            {leads.map((lead, index) => (
              <li key={index}>
                {lead.name}, {lead.phone}, {lead.source}, {lead.city},{" "}
                {lead.campaign}
              </li>
            ))}
          </ul>

          <button onClick={clickHandler} className="primary-btn">
            Create
          </button>
        </div>
      )}
    </section>
  );
};

export default AddLeads;
