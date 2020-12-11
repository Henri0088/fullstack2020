import React, { useState, useEffect, useRef } from 'react'
import BlogRender from './components/BlogRender'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import login from './services/login'
import newBlog from './services/newBlog'
import newLike from './services/newLike'
import removeBlog from './services/removeBlog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import {
    Switch, Route, Link,
    BrowserRouter as Router
} from 'react-router-dom'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [notiMsg, setNewNoti] = useState('')
    const [errorMsg, setNewErr] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        const fetchBlogs = async () => {
            const fetchedBlogs = await blogService.getAll()
            fetchedBlogs.sort((a, b) => b.likes - a.likes)
            setBlogs(fetchedBlogs)
        }
        fetchBlogs()
    }, [])

    useEffect(() => {
        const loggedJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedJSON) {
            const user = JSON.parse(loggedJSON)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.getAll()
            setUsers(fetchedUsers)
        }
        fetchUsers()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login({ username, password })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')
            setBlogs(await blogService.getAll())
        } catch (exception) {
            console.log('Login failed')
            showError('Wrong username or password')
        }
    }

    const handleNewBlog = async ({ title, author, url }) => {
        try {
            const res = await newBlog({ user, title, author, url })
            setBlogs(blogs.concat(res))

            blogFormRef.current.toggleVisible()
            showNotification(`A new blog '${title}' by ${author} added`)
        } catch (exception) {
            console.log('Couldn\'t create a new blog')
            showError('A new blog couldn\'t be added')
        }
    }

    const handleNewLike = async ({ blog }) => {
        await newLike({ blog })
        let i = blogs.findIndex(b => b.id === blog.id)

        let newBlogs = [...blogs]
        let likedBlog = blogs[i]
        likedBlog.likes += 1
        newBlogs[i] = likedBlog
        setBlogs(newBlogs)
    }

    const handleRemove = async ({ blog }) => {
        let ans = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (!ans) {
            return
        }

        const id = blog.id
        await removeBlog({ id, user })

        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
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
            <div id='frontpageLogIn'>
                <Error message={errorMsg} />
                <LoginForm username={username} setUsername={setUsername}
                    password={password} setPassword={setPassword}
                    handleLogin={handleLogin} />
            </div>
        )
    } else {
        return (
            <Router>
                <div>
                    <h1>Blogs</h1>
                    <Error message={errorMsg} />
                    <Logout user={user} setUser={setUser} />
                </div>
                <Switch>
                    <Route path='/users'>
                        <UsersList users={users} />
                    </Route>
                    <Route path='/'>
                        <div>
                            <div>
                                <Notification message={notiMsg} />
                            </div>
                            <div>
                                <br />
                                <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
                                    <NewBlogForm handleNewBlog={handleNewBlog} />
                                </Togglable>
                            </div>
                            <div id='blogList'>
                                <br />
                                <BlogRender blogs={blogs} handleNewLike={handleNewLike} user={user} handleRemove={handleRemove} />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App