import React from 'react'

const countryInfo = ({data}) => {
    if (data.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (data.length !== 1) {
        return (
            <div>
                {data.map(country => 
                    <p key={country.numericCode}>{country.name}</p>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <h1>{data[0].name}</h1>
                Capital: {data[0].capital} <br/>
                Population: {data[0].population}
                <h2>Languages</h2>
                {console.log(data)}
                <ul>
                    {data[0].languages.map(lang =>
                        <li key={lang.iso639_1}>{lang.name}</li>
                    )}
                </ul>
                <img src={data[0].flag} width='200'/>
            </div>
        )
    }
}

export default countryInfo
