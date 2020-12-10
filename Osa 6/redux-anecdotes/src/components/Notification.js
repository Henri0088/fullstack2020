import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  setTimeout(() => dispatch(delNotification()), 5000)

  if (notification !== '') {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default Notification