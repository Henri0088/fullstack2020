import React from 'react'

const User = ({ user }) => {

    if (!user) {
        return null
    }

    const blogsFormatted = user.blogs.map(blog => 
        <li key={blog.id}>
            {blog.title}
        </li>    
    )
    
    return (
        <div>
            <h2>{user.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {blogsFormatted}
            </ul>
        </div>
    )
}

export default User