import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

// Components
import Lobby from '../components/Game/Lobby'
import Question from '../components/Game/Question'
import Answer from '../components/Game/Answer'
import Results from '../components/Game/Results'
import Scoreboard from '../components/Game/Scoreboard'

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

  const question = 'This is where a question will go?'

  useEffect(() => {
    if (user && user.room !== id)
      return history.push('/')
      
    getRoomData(user)
    // eslint-disable-next-line
  }, [id, user])

  const display = () => {
    switch(gameStatus) {
      case 1:
        return <Question round={1} question={question} target={users[0]} />
      case 2:
        return <Answer round={1} question={question} target={users[0]} />
      case 3:
        return <Results question={question} target={users[0]} />
      case 4:
        return <Scoreboard round={1} />
      default:
        return <Lobby room={id} users={users} error={error} />
    }
  }

  return (
    <Box display='flex' flexDirection='column' className={classes.root}>
      <Box pt={3}>
        <Button onClick={() => setGameStatus(0)}>Lobby</Button>
        <Button onClick={() => setGameStatus(1)}>Question</Button>
        <Button onClick={() => setGameStatus(2)}>Answer</Button>
        <Button onClick={() => setGameStatus(3)}>Results</Button>
        <Button onClick={() => setGameStatus(4)}>Scoreboard</Button>
      </Box>
      { display() }
    </Box>
  )
}
