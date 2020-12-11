import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')
  const [search, setSearch] = useState('')

  if (name !== search) {
    setSearch(name)
  }

  useEffect(() => {
    const fetchCountry = async () => {
      const result = await axios.get(`https://restcountries.eu/rest/v2/name/${search}`)
      console.log('RESULT.DATA[0]', result.data[0])
      setCountry(result.data[0])
      return
    }
    fetchCountry()
  }, [search])
  
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App