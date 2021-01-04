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

  useEffect(() => {
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id
      })
      console.log('connected with ID:', socket.id)
    })
  }, [user])

  const joinRoom = () => {
    socket.emit('joinRoom', user, (error) => {
      if (error) {
        console.log('error', error)
        return error
      }
        
      console.log('user joined room', user)
    })
  }

  return (
    <SocketContext.Provider value={{ user, setUser, joinRoom }}>
      { props.children }
    </SocketContext.Provider>
  )
}
