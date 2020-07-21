import React from 'react'

const logInForm = ({username, setUsername, password, setPassword, handleLogin}) => {

    return (
        <div>
            <div>
                <h1>Log In</h1>
            </div>
            
            <form onSubmit={handleLogin}>
                <div>
                    username: 
                    <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:
                    <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default logInForm