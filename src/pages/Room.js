import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

// Components
import Lobby from '../components/Game/Lobby'
import Question from '../components/Game/Question'
import Answer from '../components/Game/Answer'
import Results from '../components/Game/Results'
import Scoreboard from '../components/Game/Scoreboard'
import Winner from '../components/Game/Winner'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}))

export default function Room() {
  const classes = useStyles()
  const { user, phase, getRoomData, leaveRoom } = useContext(SocketContext)
  const { id } = useParams()
  let history = useHistory()

  useEffect(() => {
    if (user && user.room !== id)
      return history.push('/')
    
    getRoomData(user)
    // eslint-disable-next-line
  }, [id, user])

  const handleBack = () => {
    leaveRoom(() => {
      history.push('/')
    })
  }

  const display = () => {
    switch(phase) {
      case 1:
        return <Question />
      case 2:
        return <Answer />
      case 3:
        return <Results />
      case 4:
        return <Scoreboard />
      case 5:
        return <Winner handleBack={handleBack} />
      default:
        return <Lobby room={id} handleBack={handleBack} />
    }
  }

  return (
    <Box display='flex' flexDirection='column' className={classes.root}>
      { display() }
    </Box>
  )
}
