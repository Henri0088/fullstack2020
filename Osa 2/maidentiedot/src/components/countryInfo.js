import React, { useState } from 'react'
import ShowInfo from './showInfo'
import Weather from './Weather'

const CountryInfo = ({data, setSearch}) => {
    if (data.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (data.length !== 1) {
        return (
            <div>
                {data.map(country => 
                    <p key={country.numericCode}>{country.name} <button onClick={() => setSearch(country.name)}>show</button></p>
                )}
            </div>
        )
    } else {
        return (
            <div> 
                <ShowInfo country={data[0]} />
                <Weather city={data[0].capital} />
            </div>
        )
    }
}

export default CountryInfo
