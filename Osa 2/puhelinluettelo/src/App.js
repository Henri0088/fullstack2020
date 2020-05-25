import React, {useState, useEffect} from 'react';
import ContactList from './components/ContactList'
import NewNumberForm from './components/newNumberForm'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMsg from './components/Error'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ shownPersons, setShownPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ newNoti, setNewNoti] = useState('')
  const [ newError, setNewError] = useState('')

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
      const alert = window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number?`)
      if (alert) {
        const iD = persons.find(p => p.name === newName).id
        const newContact = {
          name: newName,
          number: newNumber,
          id: iD
        }
        personService
        .update(newContact)
        .then(response => {
          const newPersons = persons.map(p => 
            p.name === newContact.name
            ? {...newContact}
            : p
          )
          setPersons(newPersons)
          setShownPersons(newPersons.filter(person =>
            person.name.toUpperCase().includes(newSearch.toUpperCase())))
            showNotification(`Updated ${newContact.name}`)
        })
        .catch(() => {
          showError(`Information of ${newContact.name} has already been removed from the server, please refresh.`)
        })
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      }
      personService
      .create(newContact)
      .then(response => {
        const newPersons = persons.concat(response)
        setPersons(newPersons)
        setShownPersons(newPersons.filter(person => 
          person.name.toUpperCase().includes(newSearch.toUpperCase())))
      })
      showNotification(`Added ${newContact.name}`)
    }
    setNewNumber('')
    setNewName('')
  }

  const handleRemove = user => {
    if (window.confirm(`Delete ${user.name} ?`)) {
      personService.remove(user.id)
      const newContacts = persons.filter(person => person.id !== user.id)
      updateAllPStates(newContacts)
      showNotification(`Removed ${user.name}`)
    }
  }

  const showNotification = message => {
    setNewNoti(message)
    setTimeout(() => {
      setNewNoti('')
    }, 3000)
  }

  const showError = message => {
    setNewError(message)
    setTimeout(() => {
      setNewError('')
    }, 7000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNoti}/>
      <ErrorMsg message={newError}/>
      search: <input value={newSearch} onChange={handleSearchChange} />
      <h2>Add new number</h2>
      <NewNumberForm 
        newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <ContactList persons={shownPersons} remove={handleRemove} />
    </div>
  )

}

export default App;
