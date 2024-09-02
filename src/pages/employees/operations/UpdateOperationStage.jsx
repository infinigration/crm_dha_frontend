import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateContractStatus } from "../../../redux/actions/contract";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import toast from "react-hot-toast";
const UpdateOperationStage = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { loading, error, message } = useSelector((state) => state.contract);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateContractStatus(params.id, status.value));
  };
  useEffect(() => {
    if (message) {
      toast.success(message.message);
      dispatch({ type: "clearMessage" });
      navigate("/operations/contracts");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [error, message]);

  const { contracts } = useSelector((state) => state.contract);
  let selectedContract =
    contracts && contracts.contracts && contracts.contracts.length > 0
      ? contracts.contracts.find((c) => c._id === params.id)
      : {};
  let programStages = selectedContract.lead.program?.processes || [];

  const options =
    programStages && programStages.length > 0
      ? programStages.map((p) => ({
          value: p.title,
          label: p.title,
        }))
      : [];
  return loading ? (
    <Loader />
  ) : (
    <section className="update-operation-status">
      <form action="" onSubmit={submitHandler}>
        <Select
          placeholder="Choose Status"
          options={options}
          value={status}
          onChange={setStatus}
        ></Select>
        <button className="primary-btn">Update</button>
      </form>
    </section>
  );
};

export default UpdateOperationStage;
