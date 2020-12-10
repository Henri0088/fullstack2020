import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(setNotification(`Added anecdote ${content}`, 5))
        dispatch(newAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewAnecdote
