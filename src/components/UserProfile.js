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

export default function UserProfile({user, setShowUserProfile}) {
  const classes = useStyles()
  const [name, setName] = useState('')

  useEffect(() => {
    setName(user.name)
  }, [user])

  return (
    <form>
      <Box textAlign='center'>
        <Typography variant='overline'>Enter Your Name</Typography>
      </Box>
      <FormControl fullWidth className={classes.formInput}>
        <FilledInput 
          required 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <Button fullWidth onClick={() => setShowUserProfile(false)}>
        Join Room
      </Button>
    </form>
  )
}
