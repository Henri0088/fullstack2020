import React, {useState} from 'react'
const Blog = ({ blog }) => {
  
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}

  const blogStyleVisible = {
    paddingLeft: 4,
    paddingTop: 6,
    paddingBottom: 6,
    display: visible ? '' : 'none',
    border: 'solid'
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {`${blog.title} | ${blog.author} | `}
        <button onClick={toggleVisible}>view</button>
      </div>
      <div style={blogStyleVisible}>
        {`${blog.title} | ${blog.author} | `}
        <button onClick={toggleVisible}>hide</button> <br/>
        {blog.url} <br/>
        {`${blog.likes} | `}
        <button>like</button> <br/>
        {blog.username}
      </div>
    </div>
  )
}

export default Blog
