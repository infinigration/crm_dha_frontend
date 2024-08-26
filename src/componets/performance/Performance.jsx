import { Title } from 'chart.js'
import React from 'react'

const Performance = ({ number, title }) => {
    return (
        <div className="performance">
            <p className='number'>{number}</p>
            <p className='description'>{title}</p>
        </div>
    )
}

export default Performance