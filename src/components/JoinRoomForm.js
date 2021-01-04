import React, { useState, useEffect } from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  form: {
    '& input': {
      textAlign: 'center',
    },
  },
}));

export default function JoinRoomForm({ user }) {
  const classes = useStyles()
  const [name, setName] = useState('')

  useEffect(() => {
    setName(user.name)
  }, [user])

  return (
    <form>
      <FormControl fullWidth className={classes.form}>
        <FilledInput 
          required 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <Box display='flex' justifyContent='center'>
        <Button fullWidth>
          Join Room
        </Button>
      </Box>
    </form>
  )
}
