import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { GoUpload } from "react-icons/go";
import { createLead } from "../../../redux/actions/leads";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import Select from "react-select";
import { getAllPrograms } from "../../../redux/actions/program";
import * as XLSX from "xlsx";
import "./admin.scss";

const AddClients = () => {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="" id="add-clients">
      <div className="upload-file">
        <div {...getRootProps()}>
          <GoUpload className="upload-icon" />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop excel file here, or click to select files</p>
          )}
        </div>
      </div>

      <div className="parsed-clients"></div>

      <button className="primary-btn">Create</button>
    </section>
  );
};

export default AddClients;
