import React, { useEffect } from 'react'
import "./operation.scss"
import Select from "react-select"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContracts } from '../../../redux/actions/contract'
import { convertTimeToPKT } from '../../../utils/utils'
const OperationContracts = () => {
    const dispatch = useDispatch()
    const { loading, error, message, contracts } = useSelector(state => state.contract)
    useEffect(() => {
        dispatch(getAllContracts())
    }, [])




    return (
        <section className='operations-contract'>
            <div className="actions-row">
                <Link className='primary-btn' to={"/operations/contracts/add"}>Add New</Link>
            </div>
            <div className="filter-container">
                <label htmlFor="">
                    <span>
                        Tags
                    </span>
                    <Select placeholder="Choose Program"></Select>

                </label>

                <label htmlFor="">
                    <span>
                        Stages
                    </span>
                    <Select placeholder="Choose Program"></Select>

                </label>

                <label htmlFor="">
                    <span>
                        Program
                    </span>
                    <Select placeholder="Choose Program"></Select>

                </label>

                <label htmlFor="">
                    <span>
                        Month
                    </span>
                    <Select placeholder="Choose Month"></Select>

                </label>

                <label htmlFor="">
                    <span>
                        Date
                    </span>
                    <input type="date" placeholder='Date' />

                </label>

                <label htmlFor="">
                    <span>
                        Phone Number
                    </span>
                    <input type="text" placeholder='Search Phone Number' />

                </label>

                <label htmlFor="">
                    <span>
                        Name
                    </span>
                    <input type="text" placeholder='Search Name' />

                </label>

                <label htmlFor="">
                    <span>
                        Employee
                    </span>
                    <Select placeholder="Choose Month"></Select>

                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Signing Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {contracts && contracts.contracts && contracts.contracts.length > 0 ?
                        contracts.contracts.map((c, index) =>

                            <tr>
                                <td>{index + 1}</td>
                                <td>{convertTimeToPKT(c.createdAt).date}</td>
                                <td>{c.lead.client.name}</td>
                                <td>{c.operationStatus}</td>
                                <td>{c.signingDate}</td>
                                <td>{c.program.generalInformation[0].totalCost} {c.program.generalInformation[0].currency}</td>
                                <td className='actions'>
                                    <Link to={`/operation/contract/${c.lead._id}/activities`}>Activites</Link>
                                    <Link to={`/operation/contract/${c._id}/view`}>View Contract</Link>
                                    <Link to={`/operation/contract/${c._id}/updatestatus`}>Update Status</Link>
                                    <Link>Update Stage</Link>
                                </td>

                            </tr>


                        ) : ""}
                </tbody>
            </table>
        </section>
    )
}

export default OperationContracts