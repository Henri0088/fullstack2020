const defState = {
    message: '',
    timeoutID: 0
}

const reducer = (state = defState, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            const oldTimeoutID = state.timeoutID
            if (oldTimeoutID !== 0) {
                clearTimeout(oldTimeoutID)
            }

            const newState = {
                message: action.message,
                timeoutID: action.timeoutID
            }
            return newState
        case 'DELETE_NOTIFICATION':
            const emptyState = {
                message: '',
                timeoutID: 0
            }
            return emptyState
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        const timeoutID = setTimeout(() => dispatch(delNotification()), time * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            timeoutID
        })
    }
}

export const delNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION',
        message: '',
        timeoutID: 0
    }
}

export default reducer