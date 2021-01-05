import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {

  const defaultUser = {
    name: '',
    room: '',
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

  const joinRoom = (user, callback) => {
    socket.emit('joinRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)
      
      setError(null)
      callback(payload.room)
    })
  }

  const createRoom = (callback) => {
    socket.emit('createRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)

      setUser(payload.newUser)
      joinRoom(payload.newUser, callback)
    })
  }

  return (
    <SocketContext.Provider value={{ user, setUser, error, joinRoom, createRoom }}>
      { props.children }
    </SocketContext.Provider>
  )
}
