import React from 'react'

const newBlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleNewBlog}) => {
    
    return ( 
        <div>
            <div>
                <h1>Create a new blog</h1>
            </div>

            <form onSubmit={handleNewBlog}>
                <div>
                    Title:
                    <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input
                    type='text'
                    value={url}
                    name='Url'
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default newBlogForm