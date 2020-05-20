import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
        .then(response => setWeather(response.data) || console.log(response.data))
    }, [])

    if (weather === null) {
        return null
    }

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature: {weather.current.temperature} Celcius</p>
            <img src={weather.current.weather_icons} width='100' alt='' />
            <p>Wind: {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather
