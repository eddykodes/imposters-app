import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
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

export default function JoinRoomForm({ setShowUserProfile }) {
  const classes = useStyles()
  const { user, error, confirmRoom } = useContext(SocketContext)
  const [room, setRoom] = useState('')

  useEffect(() => {
    if (user.room)
      setRoom(user.room)
  }, [user])

  const handleChange = (event) => {
    setRoom(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    confirmRoom(room, () => setShowUserProfile(true))
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign='center'>
        {
          !error 
            ? <Typography variant='overline'>Enter Room Code</Typography>
            : <Typography variant='overline' color='error'>{error}</Typography>
        }
      </Box>
      <FormControl className={classes.formInput}>
        <FilledInput 
          required 
          value={room} 
          onChange={handleChange}
        />
      </FormControl>
      <Button fullWidth type='submit' onClick={handleSubmit}>
        Join Room
      </Button>
    </form>
  )
}
