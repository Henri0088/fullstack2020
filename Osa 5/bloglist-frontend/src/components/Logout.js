import React from 'react'

const setUserToNull = ({ setUser }) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
}

const Logout = ({ user, setUser }) => {

    return (
        <div>
            {`${user.username} logged in `}
            <button onClick={() => setUserToNull({setUser})}>Log out</button>
        </div>
    )
}

export default Logout