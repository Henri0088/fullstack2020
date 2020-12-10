import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      return state.map(anec => 
        anec.id !== id ? anec : action.data
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newVote = (id) => {
  return async dispatch => {
    const newAnec = await anecdoteService.newVote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: newAnec
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecs
    })
  }
}

export default reducer