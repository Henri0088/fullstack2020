import React, {useState} from 'react';
import Contact from './components/Contact'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Michael Stevens'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClick = (event) => {
    console.log('clicked')
    event.preventDefault()

    const newContact = {
      name: newName
    }
    setPersons(persons.concat(newContact))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Contact key={person.name} name={person.name}/>
        )}
      </ul>
    </div>
  )

}

export default App;
