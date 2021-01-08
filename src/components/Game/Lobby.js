import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Components
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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


export default function Lobby({ room, handleBack }) {
  const classes = useStyles()
  const { users, error, startGame } = useContext(SocketContext)

  const handleStart = () => {
    startGame()
  }

  return (
    <>
      <Box py={3}>
        <Typography variant='h2' align='center' className={classes.header}>Lobby</Typography>
        <Box display='flex' justifyContent='center'>
          <Box mr={3}>
            <Typography variant='body1'>Room: {room}</Typography>
          </Box>
          <Typography variant='body1' gutterBottom>Players: {users.length} </Typography>
        </Box>
      </Box>
      <Box display='flex' flexGrow={1}>
        {
          error && <Typography color='error'>{error}</Typography>
        }
        <Box>
          { users && users.map(user => (
            <UserCard key={user.id} user={user} size='medium' />
          ))}
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' py={3}>
        <Box mr={1}>
          <Button onClick={handleBack}>
            Leave Room
          </Button>
        </Box>    
        <Button onClick={handleStart}>Start Game</Button>
      </Box>
    </>
  )
}
