import React, { useState, useEffect } from 'react'
import BlogRender from './components/BlogRender'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import login from './services/login'
import newBlog from './services/newBlog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notiMsg, setNewNoti] = useState('')
  const [errorMsg, setNewErr] = useState('')
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception) {
      console.log('Login failed')
      showError('Wrong username or password')
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const res = await newBlog({user, title, author, url})
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      showNotification(`A new blog \'${title}\' by ${author} added`)
    } catch (exception) {
      console.log('Couldn\'t create a new blog', exception)
      showError('A new blog couldn\'t be added')
    }
  }

  const showNotification = message => {
    setNewNoti(message)
    setTimeout(() => {
      setNewNoti('')
    }, 3000)
  }

  const showError = message => {
    setNewErr(message)
    setTimeout(() => {
      setNewErr('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Error message={errorMsg}/>
        <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        handleLogin={handleLogin}/>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <h1>Blogs</h1>
          <Notification message={notiMsg}/>
          <Error message={errorMsg}/>
          <Logout user={user} setUser={setUser}/>
        </div>
        <div>
          <br/>
          <NewBlogForm title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl} handleNewBlog={handleNewBlog}/>
        </div>
        <div>
          <br/>
          <BlogRender blogs={blogs}/>
        </div>
      </div>
    )
  }
}

export default App