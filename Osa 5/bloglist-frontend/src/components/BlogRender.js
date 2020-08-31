import React from 'react'
import Blog from './Blog'

const BlogRender = ({ blogs, handleNewLike, user, handleRemove }) => {

    const formattedBlogs = blogs.map(blog =>
        <div key={blog.title}>
            <Blog blog={blog} handleNewLike={handleNewLike} user={user} handleRemove={handleRemove}/>
        </div>
    )

    return (
        <div id='blogList'>
            {formattedBlogs}
        </div>
    )
}

export default BlogRender