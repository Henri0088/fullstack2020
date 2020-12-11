import React from 'react'

const usersList = ({ users }) => {
    const formattedUsers = users.map(user => 
        <div key={user.id}>
            <p>{`${user.username} ${user.blogs.length}`}</p>
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