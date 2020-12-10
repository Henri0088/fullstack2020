const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'DELETE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotificationX = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { notification }
    }
}

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() => dispatch(delNotification()), time * 1000)
    }
}

export const delNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION'
    }
}

export default reducer