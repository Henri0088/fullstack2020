import React from 'react'

const newNumberForm = (props) => {
    return (
        <form>
            <div>
                name: <input value={props.newName} onChange={props.nameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.numberChange} />
            </div>
            <button onClick={props.handleClick}>add</button>
        </form>
    )
}

export default newNumberForm