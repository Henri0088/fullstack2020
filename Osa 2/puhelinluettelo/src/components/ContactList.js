import React from 'react'
import Contact from './Contact'

const contactList = ({persons}) => {
    return (
        <ul>
            {persons.map(person => 
                <Contact key={person.name} person={person} />
            )}
        </ul>
    )
}

export default contactList