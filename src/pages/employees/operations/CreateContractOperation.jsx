import React, { useState, useEffect } from 'react';
import Select from "react-select";
import "./operation.scss";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createContract } from '../../../redux/actions/contract';
import { getAllLeads } from '../../../redux/actions/leads';
import { getAllPrograms } from '../../../redux/actions/program';

const CreateContractOperation = () => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(state => state.contract);
    const { leads } = useSelector(state => state.leads)
    const { programs } = useSelector(state => state.program)
    useEffect(() => {
        dispatch(getAllLeads())
        dispatch(getAllPrograms())
    }, [])




    let leadsOptions = leads && leads.leads.length > 0 ? leads.leads.filter((l) => l.salesStatus == "Close Client").map((l) => ({
        value: l._id,
        label: l.client.name
    })) : []

    let programsOption = programs && programs.length > 0 ? programs.map((p) => ({
        value: p._id,
        label: p.generalInformation[0].title
    })) : []

 


    // State management for form fields
    const [lead, setLead] = useState('');
    const [program, setProgram] = useState('');
    const [installements, setInstallements] = useState([{ amount: '', stage: '', remarks: '' }]);
    const [discount, setDiscount] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(installements)
        dispatch(createContract(lead.value, program.value, installements, discount));
    };

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

    // Handle change in installment fields
    const handleInstallmentChange = (index, field, value) => {
        const newInstallments = [...installements];
        newInstallments[index][field] = value;
        setInstallements(newInstallments);
    };

    // Add a new installment
    const addInstallment = () => {
        setInstallements([...installements, { amount: '', stage: '', remarks: '' }]);
    };

    // Remove an installment
    const removeInstallment = (index) => {
        const newInstallments = installements.filter((_, i) => i !== index);
        setInstallements(newInstallments);
    };

    return (
        <section className='create-contract'>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Lead</span>
                    <Select
                        placeholder="Choose Lead"
                        value={lead}
                        onChange={setLead}
                        options={leadsOptions}
                    />
                </label>

                <label>
                    <span>Choose Program</span>
                    <Select
                        placeholder="Choose Program"
                        value={program}
                        onChange={setProgram}
                        options={programsOption}
                    />
                </label>

                <div className='installments-section'>
                    <span>Installments</span>
                    {installements.map((installment, index) => (
                        <div key={index} className='installment'>
                            <input
                                type="Number"
                                placeholder='Enter Amount'
                                value={installment.amount}
                                onChange={(e) => handleInstallmentChange(index, 'amount', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Enter Stage'
                                value={installment.stage}
                                onChange={(e) => handleInstallmentChange(index, 'stage', e.target.value)}
                            />
                            <textarea
                                placeholder='Enter Remark'
                                value={installment.remarks}
                                onChange={(e) => handleInstallmentChange(index, 'remarks', e.target.value)}
                            />
                            {installements.length > 1 && (
                                <button className='primary-btn remove' type="button" onClick={() => removeInstallment(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button className='primary-btn' type="button" onClick={addInstallment}>Add Installment</button>
                </div>

                <label>
                    <span>Discount</span>
                    <input
                        type="Number"
                        placeholder='Enter Amount'
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </label>

                <button className='primary-btn' type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </section>
    );
};

export default CreateContractOperation;
