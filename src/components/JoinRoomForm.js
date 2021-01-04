import React, { useState, useEffect } from 'react'

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

export default function JoinRoomForm({ user, setShowUserProfile }) {
  const classes = useStyles()
  const [room, setRoom] = useState('')

  useEffect(() => {
    setRoom(user.room)
  }, [user])

  return (
    <form>
      <Box textAlign='center'>
        <Typography variant='overline'>Enter Room Code</Typography>
      </Box>
      <FormControl fullWidth className={classes.formInput}>
        <FilledInput 
          required 
          value={room} 
          onChange={e => setRoom(e.target.value)}
        />
      </FormControl>
      <Button fullWidth onClick={() => setShowUserProfile(true)}>
        Join Room
      </Button>
    </form>
  )
}
