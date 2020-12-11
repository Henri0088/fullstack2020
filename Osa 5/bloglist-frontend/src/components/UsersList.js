import React from 'react'
import {
    Switch, Route, Link,
    BrowserRouter as Router
} from 'react-router-dom'

const usersList = ({ users }) => {
    const formattedUsers = users.map(user => 
        <div key={user.id}>
            <Link to={`/users/${user.id}`}>{`${user.username}`}</Link>
            {` ${user.blogs.length}`}
        </div>
    )

    return (
        <div>
            <h2>Blogs created (per user)</h2>
            {formattedUsers}
        </div>
    )
}

export default usersList