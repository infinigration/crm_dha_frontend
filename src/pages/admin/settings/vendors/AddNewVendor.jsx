import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import { getAllPrograms } from '../../../../redux/actions/program'
import "./vendor.scss"
import { createVendor } from '../../../../redux/actions/vendor'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../loader/Loader'
const AddNewVendor = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [program, setProgram] = useState("")
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("")
    useEffect(() => {
        dispatch(getAllPrograms())
    }, [])

    const { programs } = useSelector((state) => state.program)
    const programOptions = programs && programs.length > 0 ? programs.map((p) => ({
        value: p._id,
        label: p.generalInformation[0].country
    })) : [{ value: "", label: "" }]


    const currencyOptions = [
        { value: "pkr", label: "PKR" },
        { value: "usd", label: "USD" },
        { value: "euro", label: "EURO" },
        { value: "gbp", label: "GBP" },
        { value: "cad", label: "CAD" },

    ]

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createVendor(name, program.value, amount, currency.value))
    }
    
    const { message, error, loading } = useSelector(state => state.vendor)
    const navigate = useNavigate()


    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
            navigate("/admin/vendors")
        }
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
    }, [error, message])
    return (
        loading ? <Loader /> : <section className='section' id='add-new-vendor'>
            <form action="" onSubmit={submitHandler}>
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <Select options={programOptions} placeholder="Choose Program" value={program} onChange={setProgram}></Select>
                <input type="Number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Select options={currencyOptions} placeholder="Choose Currecny" value={currency} onChange={setCurrency}></Select>
                <button className='primary-btn'>Submit</button>
            </form>
        </section>
    )
}

export default AddNewVendor