import React from 'react'
import Blog from './Blog'

const BlogRender = ({ blogs }) => {

    const formattedBlogs = blogs.map(blog => 
        <div key={blog.title}>
            <Blog blog={blog}/>
        </div>
    )

    return (
        <div>
            {formattedBlogs}
        </div>
    )
}

export default BlogRender