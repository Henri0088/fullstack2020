import userEvent from '@testing-library/user-event'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const vote = (id) => {
        console.log('vote', id)
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