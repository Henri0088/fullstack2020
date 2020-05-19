import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ContactList from './components/ContactList'
import NewNumberForm from './components/newNumberForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setShownPersons(response.data)
    })
  }, [])

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
      const newPersons = persons.concat(newContact)
      
      console.log(newContact.name.toUpperCase())
      setPersons(newPersons)
      setShownPersons(newPersons.filter(person => 
        person.name.toUpperCase().includes(newSearch.toUpperCase())))
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
