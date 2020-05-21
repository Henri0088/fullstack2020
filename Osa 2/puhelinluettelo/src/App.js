import React, {useState, useEffect} from 'react';
import ContactList from './components/ContactList'
import NewNumberForm from './components/newNumberForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => updateAllPStates(response))
  }, [])

  const updateAllPStates = data => {
    setPersons(data)
    setShownPersons(data)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    let val1 = event.target.value
    setNewSearch(val1)
    setShownPersons(persons.filter(person => person.name.toUpperCase().includes(val1.toUpperCase())))
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      }
      personService
      .create(newContact)
      .then(response => {
        const newPersons = persons.concat(newContact)
        setPersons(newPersons)
        setShownPersons(newPersons.filter(person => 
          person.name.toUpperCase().includes(newSearch.toUpperCase())))
      })
      .catch(error => console.log(error))
    }
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      search: <input value={newSearch} onChange={handleSearchChange} />
      <h2>Add new number</h2>
      <NewNumberForm 
        newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <ContactList persons={shownPersons} />
    </div>
  )

}

export default App;
