import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id
      })
    })

    return () => {
      socket.off()
    }
  }, [user])

  return (
    <SocketContext.Provider value={user}>
      { props.children }
    </SocketContext.Provider>
  )
}
