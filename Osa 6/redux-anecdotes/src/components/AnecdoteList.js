import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = anecdotes.filter(n => n.id === id).map(n => n.content)
        props.setNotification(`You voted ${anecdote}`, 5)
        props.newVote(id)
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

const mapStateToProps = (state) => {
    if ( state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    } else {
        const anecdotes = state.anecdotes.filter(anec => anec.content.includes(state.filter))
        return {
            anecdotes
        }
    }
}

const mapDispatchToProps = {
    setNotification,
    newVote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)