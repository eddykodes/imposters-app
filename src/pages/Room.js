import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

export default function Room() {
  const classes = useStyles()

  return (
    <Box display='flex' flexDirection='column' className={classes.root}>
      <Box item xs={12} py={3}>
        <Typography variant='h2' align='center' className={classes.header}>Lobby</Typography>
        <Box display='flex' justifyContent='center'>
          <Box mr={3}>
            <Typography variant='body1'>Room: </Typography>
          </Box>
          <Typography variant='body1' gutterBottom>Players: </Typography>
        </Box>
      </Box>
      <Box display='flex' flexGrow={1}>
        <Box>
          <Typography>Users go here....</Typography>
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
    </Box>
  )
}
