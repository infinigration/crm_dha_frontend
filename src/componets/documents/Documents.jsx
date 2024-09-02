import React, { useEffect, useRef, useState } from "react";
import "./documents.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads, uploadClientDocuments } from "../../redux/actions/leads";
import { Link, useParams } from "react-router-dom";
import Loader from "../../pages/loader/Loader";
import toast from "react-hot-toast";

const Documents = ({ documents }) => {
  const [avatar, setAvatar] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null);
  const fileInputRefs = useRef({});
  const dispatch = useDispatch();
  const params = useParams();

  const handleFileUpload = (id) => {
    fileInputRefs.current[id].click();
    setCurrentDocId(id);
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    if (file && currentDocId) {
      const myForm = new FormData();
      myForm.append("file", file);

      dispatch(uploadClientDocuments(myForm, params.id, currentDocId));

      // Reset state
      setCurrentDocId(null);
      setAvatar(null);
    }
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
              <tr key={d._id} id={d._id}>
                <td>{index + 1}</td>
                <td>{d.title}</td>
                <td>{d.status}</td>
                <td className="actions">
                  {d.status !== "uploaded" ? (
                    <div>
                      <input
                        type="file"
                        ref={(el) => (fileInputRefs.current[d._id] = el)}
                        style={{ display: "none" }}
                        onChange={changeImageHandler}
                      />
                      <button onClick={() => handleFileUpload(d._id)}>
                        Upload
                      </button>
                    </div>
                  ) : (
                    <Link to={d.file.url} target="_blank">
                      View
                    </Link>
                  )}
                </td>
              </tr>
            ))
            : <tr><td colSpan="4">No Documents Found</td></tr>}
        </tbody>
      </table>
    </section>
  );
};

export default Documents;
