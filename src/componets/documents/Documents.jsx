import React, { useEffect, useRef, useState } from "react";
import "./documents.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads, uploadClientDocuments } from "../../redux/actions/leads";
import { Link, useParams } from "react-router-dom";
import Loader from "../../pages/loader/Loader";
import toast from "react-hot-toast";

const Documents = ({ documents }) => {
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const changeImageHandler = (e, id) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(file);
      console.log(file);
    };

    const myForm = new FormData();
    myForm.append("file", file);
    dispatch(uploadClientDocuments(myForm, params.id, id));
  };

  const { loading, error, message } = useSelector((state) => state.leads);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch(getAllLeads());
    }
  }, [error, loading, message]);

  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="documents">
      <h2 className="heading">Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents && documents.length > 0
            ? documents.map((d, index) => (
                <tr key={d._id}>
                  {" "}
                  {/* Add key prop */}
                  <td>{index + 1}</td>
                  <td>{d.title}</td>
                  <td>{d.status}</td>
                  <td className="actions">
                    {d.status != "uploaded" ? (
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={(e) => changeImageHandler(e, d._id)} // Pass 'd._id' as second argument
                        />
                        <button onClick={handleFileUpload}>Upload</button>
                      </div>
                    ) : (
                      <Link to={d.file.url} target="_blank">
                        View
                      </Link>
                    )}
                    {/* <button>Approve</button>
                    <button>Decline</button> */}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </section>
  );
};

export default Documents;
