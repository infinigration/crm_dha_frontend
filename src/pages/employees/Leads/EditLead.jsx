import React, { useEffect, useState } from 'react'
import Select from "react-select"
import "./leads.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLead } from '../../../redux/actions/leads'
import toast from 'react-hot-toast'
import Loader from '../../loader/Loader'
const EditLead = () => {

    const params = useParams()


    const { leads } = useSelector(state => state.leads.leads)
    const { loading, error, message } = useSelector(state => state.leads)
    const selectedLead = leads && leads.find((l) => l._id === params.id)


    const [clientName, setClientName] = useState(selectedLead && selectedLead.client.name)
    const [clientCity, setClientCity] = useState(selectedLead && selectedLead.client.city)
    const [clientPhone, setClientPhone] = useState(selectedLead && selectedLead.client.phone)
    const [campaign, setCampaign] = useState(selectedLead && selectedLead.client.campaign)
    const [clientSource, setClientSource] = useState(selectedLead && selectedLead.client.source);


    const sourceOptions = [
        { value: "facebook", label: "Facebook" },
        { value: "instagram", label: "Instagram" },
    ];
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateLead(params.id, clientName, clientCity, clientPhone, campaign, clientSource))

    }
    const navigate = useNavigate()
    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
            navigate("/leads")
        }

        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
    }, [])
    return (
        loading ? <Loader /> : <section className='section' id='edit-lead'>
            <form action="" onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Client City"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Client Phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Campaign"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                />

                <Select
                    placeholder="Choose Source"
                    value={clientSource}
                    onChange={setClientSource}
                    defaultValue={clientSource}
                    options={sourceOptions}
                />
                <button className="primary-btn">Update</button>
            </form>
        </section>
    )
}

export default EditLead