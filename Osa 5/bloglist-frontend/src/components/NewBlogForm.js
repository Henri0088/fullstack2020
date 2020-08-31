import React, { useState } from 'react'

const NewBlogForm = ({ handleNewBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleNewBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <div>
                <h1>Create a new blog</h1>
            </div>

            <form onSubmit={addBlog} id='form'>
                <div>
                    Title:
                    <input
                        id='title'
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id='author'
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input
                        id='url'
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='createBlogButton' type='submit'>Create</button>
            </form>
        </div>
    )
}

export default NewBlogForm