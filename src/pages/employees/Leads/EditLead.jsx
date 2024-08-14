import React, { useState } from 'react'
import Select from "react-select"
import "./leads.scss"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const EditLead = () => {

    const params = useParams()


    const { leads } = useSelector(state => state.leads.leads)
    const selectedLead = leads.find((l) => l._id === params.id)
  

    const [clientName, setClientName] = useState(selectedLead.client.name)
    const [clientCity, setClientCity] = useState(selectedLead.client.city)
    const [clientPhone, setClientPhone] = useState(selectedLead.client.phone)
    const [campaign, setCampaign] = useState(selectedLead.client.campaign)
    const [clientSource, setClientSource] = useState(selectedLead.client.source);


    const sourceOptions = [
        { value: "facebook", label: "Facebook" },
        { value: "instagram", label: "Instagram" },
    ];
    return (
        <section className='section' id='edit-lead'>
            <form action="" className=''>
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