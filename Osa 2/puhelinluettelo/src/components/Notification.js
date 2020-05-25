import React from 'react'

const Notification = ({message}) => {
    if (message === '') {
        return null
    }

    const notiStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5
    }

    return (
        <div style={notiStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification