import userEvent from '@testing-library/user-event'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    let anecdotes = useSelector(state => state.anecdotes)

    if (filter !== '') {
         anecdotes = anecdotes.filter(anec => anec.content.includes(filter))
    }

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = anecdotes.filter(n => n.id === id).map(n => n.content)
        const noti = `You voted ${anecdote}`
        dispatch(setNotification(noti))
        dispatch(newVote(id))
    }

    return (
        <div>
            {anecdotes.sort((a, b) => (a.votes - b.votes) * -1).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList