import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useHistory } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  formInput: {
    '& input': {
      textAlign: 'center',
    },
  },
}));

export default function UserProfile({ createRequest, setCreateRequest, setShowUserProfile }) {
  const classes = useStyles()
  const { user, setUser, error, joinRoom, createRoom } = useContext(SocketContext)
  let history = useHistory()

  const handleChange = (event) => {
    setUser({...user, name: event.target.value})
  }

  const handleSubmit = (event) => {
    if (createRequest)
      return handleCreateRoom(event)
    
    return handleJoinRoom(event)
  }

  const handleJoinRoom = (event) => {
    event.preventDefault()
    joinRoom(user, (room) => {
      history.push(`/room/${room}`)
    })     
  }

  const handleCreateRoom = (event) => {
    event.preventDefault()
    createRoom(room => {
      history.push(`/room/${room}`)
    })
  }
  
  const handleBack = (event) => {
    event.preventDefault()
    setCreateRequest(false)
    setShowUserProfile(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign='center'>
        <Typography variant='overline'>Enter Your Name</Typography>
      </Box>
      <FormControl fullWidth className={classes.formInput}>
        <FilledInput 
          required 
          value={user.name} 
          onChange={handleChange}
        />
      </FormControl>
      {
        error && 
        <Box textAlign='center' mb={2}>
          <Typography variant='overline' color='error'>{error}</Typography>
        </Box>
      }
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth type='submit' onClick={handleBack}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth type='submit' onClick={handleSubmit}>
            {createRequest ? 'Create Room' : 'Join Room'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
