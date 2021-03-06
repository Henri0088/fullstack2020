import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleNewLike, user, handleRemove }) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }

    const blogStyleVisible = {
        paddingLeft: 4,
        paddingTop: 6,
        paddingBottom: 6,
        display: visible ? '' : 'none',
        border: 'solid'
    }

    const showRemove = { display: blog.user.id === user.id ? '' : 'none' }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const addLike = async () => {
        handleNewLike({ blog })
    }

    const removeBlog = async () => {
        handleRemove({ blog })
    }

    return (
        <div>
            <div style={hideWhenVisible} className='minimalInfo'>
                {`${blog.title} | ${blog.author} | `}
                <button onClick={toggleVisible}>view</button>
            </div>
            <div style={blogStyleVisible} className='allInfo'>
                {`${blog.title} | ${blog.author} | `}
                <button onClick={toggleVisible}>hide</button> <br />
                {blog.url} <br />
                <span className='likeAmount' id='likes'>{`${blog.likes} | `}</span>
                <button onClick={addLike}>like</button> <br />
                <button style={showRemove} onClick={removeBlog} id='deleteButton'>Remove</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    handleNewLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog
