import React, { useState, useEffect } from 'react'
import BlogRender from './components/BlogRender'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({username, password})

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Login failed')
    }
  }

  return (
    <div>
      {user === null ?
      LoginForm({username, setUsername, password, setPassword, handleLogin}) :
      BlogRender({blogs})
      }
    </div>

  )
}

export default App