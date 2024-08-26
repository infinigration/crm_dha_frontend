import React, { useEffect, useState } from 'react'
import "./dashboard.scss"
import axios from 'axios'
import Performance from '../../../componets/performance/Performance'

const Dashboard = () => {
    const [quote, setQuote] = useState("")
    const getDailyQuote = () => {
        axios
            .get("https://api.adviceslip.com/advice")
            .then((response) => {
                const { advice } = response.data.slip;
                setQuote(advice)

            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        getDailyQuote()
    }, [])


    return (
        <section className='dashboard'>

            <div className="first-section">
                <div className="profile-image-container">
                    <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className="quotes-container">
                    <p>{quote}</p>
                </div>
            </div>

            <div className="second-section">

                <div className="performance-row">
                    <Performance title={"Today's Leads"} number={0} />
                    <Performance title={"Leads Assigned"} number={0} />
                    <Performance title={"Unassigned Leads"} number={0} />
                    <Performance title={"Absenties"} number={0} />
                    <Performance title={"Leaves Remaining"} number={0} />
                    <Performance title={"Salary This Month"} number={0} />

                </div>
            </div>

          

        </section>
    )
}

export default Dashboard