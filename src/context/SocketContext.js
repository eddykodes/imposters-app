import React, { createContext, useState, useEffect } from 'react'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [gameId, setGameId] = useState('')
  const [phase, setPhase] = useState(0)
  const [round, setRound] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [target, setTarget] = useState(null)
  const [question, setQuestion] = useState('')
  const [waitingOn, setWaitingOn] = useState([])

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

  useEffect(() => {
    socket.on('gameData', (payload) => {
      console.log(payload.gameData)
      if (payload.gameData.rounds) 
        setRounds(payload.gameData.rounds)

      if (payload.gameData.round) 
        setRound(payload.gameData.round)

      if (payload.gameData.target) 
        setTarget(payload.gameData.target)

      if (payload.gameData.question) 
        setQuestion(payload.gameData.question)

      if (payload.gameData.waitingOn) 
        setWaitingOn(payload.gameData.waitingOn)

      if (payload.gameData.phase) 
        setPhase(payload.gameData.phase)
    })
  }, [gameId])

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

  const startGame = () => {
    socket.emit('startGame', user, (payload) => {
      setGameId(payload.gameId)
    })
  }

  return (
    <SocketContext.Provider value={{ 
      user, 
      setUser, 
      error, 
      setError, 
      users,
      rounds,
      waitingOn,
      round,
      target,
      question,
      phase,
      joinRoom, 
      createRoom, 
      confirmRoom, 
      getRoomData, 
      startGame 
    }}>
      { props.children }
    </SocketContext.Provider>
  )
}
