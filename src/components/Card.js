import React from 'react'

const Card = ({ name, body }) => {
    return (
        <div className='card mb-2 pl-2 pt-1 pb-2'>
            <div className='card-title'>{name}</div>
            <pre className='card-body pl-4 pt-'>
                {body}
            </pre>
        </div>
    )
}

export default Card;
