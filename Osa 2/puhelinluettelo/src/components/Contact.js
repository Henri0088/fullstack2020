import React from 'react';

const Contact = ({person, remove}) => {
    return (
        <div>
            <p>{person.name} {person.number} 
                <button onClick={() => remove(person)}>
                    remove
                </button>
            </p>
        </div>
    )
}

export default Contact