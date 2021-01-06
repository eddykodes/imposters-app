import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  function saveUser(user) {
    const savedUser = { 
      ...user,
      prevId: user.id 
    }
    localStorage.setItem('user', JSON.stringify(savedUser))
    console.log('savedUser', savedUser)
  }

  useEffect(() => {
    console.log('user', user)
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id
      })
      console.log('connected with ID:', socket.id)
    })
  }, [user])

  useEffect(() => {
    socket.on('userJoin', (payload) => {
      setUsers(payload.users)
    })
  }, [users])

  const joinRoom = (user, callback) => {
    socket.emit('joinRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)
      
      setError(null)
      setUser(user)
      saveUser(user)
      callback(payload.room)
    })
  }

  const createRoom = (user, callback) => {
    socket.emit('createRoom', user, (payload) => {
      if (payload.error)
        return setError(payload.error)

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

  const getRoomData = (user) => {
    socket.emit('getRoomData', user, (payload) => {
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
