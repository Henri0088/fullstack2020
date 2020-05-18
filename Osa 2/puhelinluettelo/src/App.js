import React, {useState} from 'react';
import Contact from './components/Contact'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
    name: 'Arto Hellas',
    number: '040-1231244'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleClick = (event) => {
    console.log('clicked')
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newContact))
    }
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Contact key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )

}

export default App;
