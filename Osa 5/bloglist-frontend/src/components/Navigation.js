import React from 'react'
import { Link } from 'react-router-dom'

const setUserToNull = ({ setUser }) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
}

const padding = {
    padding: 5
}

const color = {
    padding: 5,
    backgroundColor: '#91e8fa'
}

const Navigation = ({ user, setUser }) => {

    return (
        <div style={color}>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            {`${user.username} logged in `}
            <button onClick={() => setUserToNull({ setUser })}>Log out</button>
        </div>
    )
}

export default Navigation