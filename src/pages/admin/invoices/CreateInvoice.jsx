import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createInvoice } from "../../../redux/actions/invoice";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getAllContracts } from "../../../redux/actions/contract";

const CreateInvoice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContracts());
  },[]);

  const { contracts } = useSelector((state) => state.contract);
  const params = useParams();

  const [contract, setContract] = useState(
    contracts && contracts.contracts.length > 0 && params.id != undefined
      ? contracts.contracts
          .filter((f) => f._id === params.id)
          .map((c) => ({
            value: c._id,
            label: `${c.lead.client.name}-${c.program.generalInformation[0].country}`,
          }))
      : []
  );

  const contractOptions =
    contracts && contracts.contracts.length > 0
      ? contracts.contracts.map((c) => ({
          value: c._id,
          label: `${c.lead.client.name}-${c.program.generalInformation[0].country}`,
        }))
      : "";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createInvoice(contract[0].value));
  };

  const { loading, error, message } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message]);

  return loading || !contracts ? (
    <Loader />
  ) : (
    <section className="section" id="create_invoice">
      <form action="" onSubmit={submitHandler}>
        <h2 className="heading">Create Invoice</h2>
        <Select
          placeholder="Choose Contract"
          options={contractOptions}
          value={contract}
          defaultValue={contract}
          onChange={setContract}
        />
        <button className="primary-btn">Create Invoice</button>
      </form>
    </section>
  );
};

export default CreateInvoice;
