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
  const [users, setUsers] = useState([])

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
      setUser(user)
      callback(payload.room)
    })
  }

  const createRoom = (callback) => {
    socket.emit('createRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)

      setUser(payload.newUser)
      setError(null)
      joinRoom(payload.newUser, callback)
    })
  }

  const confirmRoom = (room, callback) => {
    socket.emit('confirmRoom', room, (payload) => {
      if (payload.error)
        return setError(payload.error)
      
      setUser({
        ...user,
        room
      })

      setError(null)
      callback()
    })
  }

  const getRoomData = (room) => {
    socket.emit('getRoomData', room, (payload) => {
      if (payload.error)
        return setError(payload.error)

      setUsers(payload.roomData.users)
    })
  }

  return (
    <SocketContext.Provider value={{ user, setUser, error, setError, users, joinRoom, createRoom, confirmRoom, getRoomData }}>
      { props.children }
    </SocketContext.Provider>
  )
}
