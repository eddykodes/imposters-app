import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { socket } from '../socket'

export const SocketContext = createContext()

export const SocketContextProvider = props => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [id, setId] = useState(uuidv4())
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  
  const [users, setUsers] = useState([])
  const [gameId, setGameId] = useState('')
  const [phase, setPhase] = useState(0)
  const [round, setRound] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [target, setTarget] = useState(null)
  const [question, setQuestion] = useState('')
  const [waitingOn, setWaitingOn] = useState([])
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState([])
  const [scores, setScores] = useState([])

  const saveUser = (saveData) => {
    setUser(saveData)
    localStorage.setItem('user', JSON.stringify(saveData))
  }

  useEffect(() => {
    // Set user data if localstorage user
    if (user) {
      setId(user.id)
      setName(user.name)
      setRoom(user.room)
    }
    return 
  }, [user])

  useEffect(() => {
    socket.on('usersUpdate', (payload) => {
      setUsers(payload.users)
    })
  }, [users])

  useEffect(() => {
    socket.on('gameData', (payload) => {
      if (payload.gameData.id) 
        setGameId(payload.gameData.id)

      if (payload.gameData.rounds) 
        setRounds(payload.gameData.rounds)

      if (payload.gameData.round) 
        setRound(payload.gameData.round)

      if (payload.gameData.target) 
        setTarget(payload.gameData.target)

      if (payload.gameData.question) 
        setQuestion(payload.gameData.question)
      
      if (payload.gameData.answers) 
        setAnswers(payload.gameData.answers)
      
      if (payload.gameData.votes) 
        setResults(payload.gameData.votes)

      if (payload.gameData.scores) 
        setScores(payload.gameData.scores)

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
      saveUser(user)
      setPhase(0)
      if (callback)
        callback(payload.room)
    })
  }

  const leaveRoom = (callback) => {
    socket.emit('leaveRoom', user, () => {
      callback()
    })
  }

  const confirmRoom = (room, callback) => {
    socket.emit('confirmRoom', room, (payload) => {
      if (payload.error)
        return setError(payload.error)
      
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
    socket.emit('startGame', user)
  }

  const sendAnswer = (answer) => {
    socket.emit('sendAnswer', gameId, user, answer)
  }

  const sendVote = (vote) => {
    if (vote !== null)
      socket.emit('sendVote', gameId, user, vote)
  }


  return (
    <SocketContext.Provider value={{ 
      name,
      setName,
      room,
      setRoom,
      id,
      loading,
      setLoading,
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
      answers,
      phase,
      results,
      scores,
      joinRoom, 
      leaveRoom,
      confirmRoom, 
      getRoomData, 
      startGame,
      sendAnswer,
      sendVote, 
    }}>
      { props.children }
    </SocketContext.Provider>
  )
}
