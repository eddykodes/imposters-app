import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

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


export default function Lobby({ room, users, error }) {
  const classes = useStyles()

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
          <Button component={RouterLink} to="/">
            Leave Room
          </Button>
        </Box>    
        <Button>Start Game</Button>
      </Box>
    </>
  )
}
