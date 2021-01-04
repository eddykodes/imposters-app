import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {

  const defaultUser = {
    id: 0,
    name: '',
    room: '',
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

  return (
    <SocketContext.Provider value={user}>
      { props.children }
    </SocketContext.Provider>
  )
}
