import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

// Components
import Lobby from '../components/Game/Lobby'
import Question from '../components/Game/Question'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  header: {
    textTransform: 'uppercase'
  }
}))

export default function Room() {
  const classes = useStyles()
  const [ gameStatus, setGameStatus ] = useState(0)
  const { user, users, error, getRoomData } = useContext(SocketContext)
  const { id } = useParams()
  let history = useHistory()

  useEffect(() => {
    if (user && user.room !== id)
      return history.push('/')
      
    getRoomData(user)
    // eslint-disable-next-line
  }, [id, user])

  const display = () => {
    switch(gameStatus) {
      case 1:
        return <Question />
      default:
        return <Lobby users={users} error={error} />
    }
  }

  return (
    <Box display='flex' flexDirection='column' className={classes.root}>
      <Box pt={3}>
        <Button onClick={() => setGameStatus('')}>Lobby</Button>
        <Button onClick={() => setGameStatus('question')}>Question</Button>
      </Box>
      { display() }
    </Box>
  )
}
