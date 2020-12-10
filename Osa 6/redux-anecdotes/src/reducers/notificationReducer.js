const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'DELETE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { notification }
    }
}

export const delNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION'
    }
}

export default reducer