import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAllPrograms } from "../../../redux/actions/program";
import { getAllLeads } from "../../../redux/actions/leads";
import { createContract } from "../../../redux/actions/contract";
import Loader from "../../loader/Loader";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getAllVendors } from "../../../redux/actions/vendor";
import { getAllBanks } from "../../../redux/actions/bank";

const CreateContract = () => {

  const [installments, setInstallments] = useState([{ amount: "", stage: "", remarks: "" }]);
  const [bank, setBank] = useState(null);
  const [lead, setLead] = useState(null);
  const [program, setProgram] = useState(null);
  const [subAgent, setSubAgent] = useState("");
  const [subAgentPercentage, setSubAgentPercentage] = useState("");
  const [discount, setDiscount] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { leads } = useSelector((state) => state.leads);
  const { programs } = useSelector((state) => state.program);
  const { vendors } = useSelector((state) => state.vendor);
  const { banks } = useSelector((state) => state.bank);
  const { loading, message, error } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(getAllPrograms());
    dispatch(getAllLeads());
    dispatch(getAllVendors());
    dispatch(getAllBanks());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {

      const selectedLead = leads?.leads.find((l) => l._id === params.id);
      if (selectedLead) {
        setLead({ value: selectedLead._id, label: selectedLead.client.name });
        setProgram({
          value: selectedLead.client.program?._id,
          label: selectedLead.client.program?.generalInformation[0].country,
        });
      }
    }
  }, [params.id, leads]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/contracts");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error, dispatch, navigate]);

  const handleAddInstallment = () => {
    setInstallments([...installments, { amount: "", stage: "", remarks: "" }]);
  };

  const handleRemoveInstallment = (index) => {
    setInstallments(installments.filter((_, i) => i !== index));
  };

  const handleInstallmentChange = (index, field, value) => {
    const newInstallments = [...installments];
    newInstallments[index][field] = value;
    setInstallments(newInstallments);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!lead || !program || !bank) {
      toast.error("Please fill in all required fields");
      return;
    }

    const parsedDiscount = Number(discount);
    if (isNaN(parsedDiscount)) {
      toast.error("Discount must be a number");
      return;
    }

    const parsedInstallments = installments.map((installment, index) => {
      const amount = Number(installment.amount);
      if (isNaN(amount)) {
        toast.error(`Installment ${index + 1}: Amount must be a number`);
        return null;
      }
      return { ...installment, amount };
    });

    if (parsedInstallments.includes(null)) {
      return;
    }


    dispatch(createContract(lead.value, program.value, bank.value, parsedInstallments, parsedDiscount));
  };

  const leadOptions = leads?.leads.map((l) => ({ value: l._id, label: l.client.name })) || [];
  const programOptions = programs?.map((p) => ({
    value: p._id,
    label: p.generalInformation[0].country,
  })) || [];
  const vendorOptions = vendors?.map((v) => ({ value: v._id, label: v.name })) || [];
  const bankOptions = banks?.map((b) => ({ value: b._id, label: `${b.title}-${b.accNo}` })) || [];



  return loading ? (
    <Loader />
  ) : (
    <section className="section" id="create-contract">
      <form onSubmit={submitHandler}>
        <h2 className="heading">Create Contract</h2>

        <Select
          placeholder="Choose Bank"
          options={bankOptions}
          onChange={setBank}
          value={bank}
          isClearable
        />
        <Select
          placeholder="Choose Lead"
          options={leadOptions}
          onChange={setLead}
          value={lead}
          isClearable
        />
        <Select
          placeholder="Choose Program"
          options={programOptions}
          onChange={setProgram}
          value={program}
          isClearable
        />
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <Select
          placeholder="Choose SubAgent"
          options={vendorOptions} // Assuming subAgentOptions will be populated similarly
          onChange={setSubAgent}
          value={subAgent}
          isClearable
        />
        <input
          type="text"
          placeholder="Subagent Percentage"
          value={subAgentPercentage}
          onChange={(e) => setSubAgentPercentage(e.target.value)}
        />

        <h2 className="heading">Installments</h2>
        <div className="installments-container">
          <button type="button" className="primary-btn" onClick={handleAddInstallment}>
            Add Installment
          </button>
          {installments.map((installment, index) => (
            <div key={index} className="installment">
              <input
                type="number"
                placeholder="Enter Amount"
                value={installment.amount}
                onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Stage"
                value={installment.stage}
                onChange={(e) => handleInstallmentChange(index, "stage", e.target.value)}
              />
              <textarea
                placeholder="Enter Remarks"
                value={installment.remarks}
                onChange={(e) => handleInstallmentChange(index, "remarks", e.target.value)}
              />
              <button type="button" className="danger-btn" onClick={() => handleRemoveInstallment(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="primary-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateContract;
