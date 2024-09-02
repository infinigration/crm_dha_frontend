import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from "react-select"
import { updateContractStatus } from '../../../redux/actions/contract'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import toast from 'react-hot-toast'
const UpdateOperationStatus = () => {
    const params = useParams()

    const dispatch = useDispatch()
    const [status, setStatus] = useState("")
    const { loading, error, message } = useSelector(state => state.contract)
    const navigate = useNavigate()
    const options = [
        { value: "Assesment", label: "Assesment" },
        { value: "Submisson", label: "Submisson" },
        { value: "Application", label: "Application" },
        { value: "Work Permit", label: "Work Permit" },
        { value: "Cos Drafting", label: "Cos Drafting" },
        { value: "Cos Final", label: "Cos Final" },
        { value: "Visa App", label: "Visa App" },
        { value: "Embassy Appointment", label: "Embassy Appointement" },
        { value: "Visa Center", label: "Visa Center" },
        { value: "Biometrics", label: "Biometrics" },
        { value: "Embassy Submisson", label: "Embassy Submisson" },
        { value: "Visa", label: "Visa" },
    ]

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateContractStatus(params.id, status.value))
    }


    useEffect(() => {
        if (message) {
            toast.success(message.message)
            dispatch({ type: "clearMessage" })
            navigate("/operations/clients")

        }

        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
    }, [error, message])
    return (
        loading ? <Loader /> : <section className='update-operation-status'>
            <form action="" onSubmit={submitHandler}>
                <Select placeholder="Choose Status" options={options} value={status} onChange={setStatus}></Select>
                <button className='primary-btn'>Update</button>
            </form>
        </section>
    )
}

export default UpdateOperationStatus