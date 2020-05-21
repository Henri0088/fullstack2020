import React from 'react'
import Contact from './Contact'

const contactList = ({persons, remove}) => {
    return (
        <ul>
            {persons.map(person => 
                <div key={person.name}>
                    <Contact person={person} />
                    <button onClick={() => remove(person)}>remove</button>
                </div>
            )}
        </ul>
    )
}

export default contactList