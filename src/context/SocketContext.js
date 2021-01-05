import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {

  const defaultUser = {
    id: 0,
    name: 'default',
    room: 'default',
  }
  const [user, setUser] = useState(defaultUser)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id
      })
      console.log('connected with ID:', socket.id)
    })
  }, [user])

  const joinRoom = (callback) => {
    socket.emit('joinRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)
      
      setError(null)
      callback(payload.room)
    })
  }

  return (
    <SocketContext.Provider value={{ user, setUser, error, joinRoom }}>
      { props.children }
    </SocketContext.Provider>
  )
}
