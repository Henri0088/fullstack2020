import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountryInfo from './components/countryInfo'

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [countryData, setCountryData] = useState([])
  const [shownData, setShownData] = useState([])

  useEffect(() => {
    axios
    .get('http://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountryData(response.data)
    })
  }, [])

  const handleChange = (event) => {
    let val1 = event.target.value
    // Input kontrolli
    setNewSearch(val1)
    // Datan filtteröinti
    const newData = countryData.filter(country => 
      country.name.toUpperCase().includes(val1.toUpperCase())
    )
    setShownData(newData)
  }

  const changeSearch = (value) => {
    setNewSearch(value)
    const newData = countryData.filter(country =>
      country.name.toUpperCase().includes(value.toUpperCase())
    )
    setShownData(newData)
  }

  return (
    <div>
      {console.log('re-rendering')}
      <form>
        find countries <input value={newSearch} onChange={handleChange} />
      </form>
      <CountryInfo data={shownData} setSearch={changeSearch} />
    </div>
  )
}

export default App;
