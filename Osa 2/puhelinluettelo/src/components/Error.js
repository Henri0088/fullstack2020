import React from 'react'

const ErrorMsg = ({message}) => {
    if (message === '') {
        return null
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5
    }

    return (
        <div style={errorStyle}>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMsg