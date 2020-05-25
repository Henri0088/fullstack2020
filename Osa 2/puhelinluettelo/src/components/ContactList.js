import React from 'react'
import Contact from './Contact'

const contactList = ({persons, remove}) => {
    return (
        <ul>
            {persons.map(person => 
                <div key={person.name}>
                    <Contact person={person} remove={remove} />
                </div>
            )}
        </ul>
    )
}

export default contactList