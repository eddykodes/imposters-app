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
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  formInput: {
    '& input': {
      textAlign: 'center',
    },
  },
}));

export default function UserProfile({ createRequest, setCreateRequest, setShowUserProfile }) {
  const classes = useStyles()
  const { name, setName, room, id, loading, setLoading, error, setError, joinRoom } = useContext(SocketContext)
  let history = useHistory()

  const userData = { id, name, room }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    joinRoom(userData, (room) => {
      setLoading(false)
      history.push(`/room/${room}`)
    })  
  }

  const handleBack = () => {
    setError(null)
    setCreateRequest(false)
    setShowUserProfile(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign='center'>
        {
          !error 
            ? <Typography variant='overline'>Enter Your Name</Typography>
            : <Typography variant='overline' color='error'>{error}</Typography>
        }
      </Box>
      <FormControl fullWidth className={classes.formInput}>
        <FilledInput 
          required 
          value={name} 
          onChange={handleChange}
        />
      </FormControl>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Button fullWidth onClick={handleBack}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth type='submit' onClick={handleSubmit}>
            { loading 
              ? <CircularProgress /> 
              : createRequest 
                ? 'Create Room' 
                : 'Join Room'
            }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
