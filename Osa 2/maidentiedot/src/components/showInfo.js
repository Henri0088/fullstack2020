import React from 'react'

const ShowInfo = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            Capital: {country.capital} <br/>
            Population: {country.population}
            <h2>Languages</h2>
            <ul>
                {country.languages.map(lang =>
                    <li key={lang.iso639_1}>{lang.name}</li>
                 )}
            </ul>
            <img src={country.flag} width='200' alt=''/>
        </div>
    )
}

export default ShowInfo