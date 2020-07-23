import React, {useState} from 'react'

const Blog = ({ blog, handleNewLike, user, handleRemove }) => {
  
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}

  const blogStyleVisible = {
    paddingLeft: 4,
    paddingTop: 6,
    paddingBottom: 6,
    display: visible ? '' : 'none',
    border: 'solid'
  }

  const showRemove = {display: blog.user.id === user.id ? '' : 'none'}

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    handleNewLike({blog})
  }

  const removeBlog = async () => {
    handleRemove({blog})
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
        <button onClick={addLike}>like</button> <br/>
        <button style={showRemove} onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
