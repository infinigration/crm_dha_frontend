import React, { useEffect, useState } from "react";
import "./task-summary.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollowUpDate,
  getAllLeads,
  getTaskSummary,
} from "../../redux/actions/leads";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../pages/loader/Loader";
import { convertTimeToPKT } from "../../utils/utils";
const TaskSummary = ({ data }) => {
  const [visible, setVisible] = useState(false);

  console.log(data)

  const [date, setDate] = useState("");

  const params = useParams();

  let leadId = params.id;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addFollowUpDate(leadId, date, e.target.id));
  };

  const { message, error, loading } = useSelector((state) => state.leads);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch(getAllLeads());
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error]);
  return loading ? (
    <Loader />
  ) : (
    <div className="task-summary">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Done by</th>
            <th>Task</th>

            {/* <th>Actions</th> */}
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0
            ? data.map((d, index) => (
              <tr key={index}>
                <td>{convertTimeToPKT(d.createdAt).date}</td>
                <td>{convertTimeToPKT(d.createdAt).time}</td>
                <td>{d.doneBy.bioData.name}</td>
                <td>{d.task}</td>

                {/* <td className="a">
                    <div>
                      <button onClick={() => setVisible(!visible)}>
                        Add Follow Up Date
                      </button>
                      <button>Mark as completed</button>
                    </div>

                    <form
                      style={{ display: visible ? "flex" : "none" }}
                      id={d._id}
                      onSubmit={submitHandler}
                    >
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <button>Update</button>
                    </form>
                  </td> */}
              </tr>
            ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default TaskSummary;
