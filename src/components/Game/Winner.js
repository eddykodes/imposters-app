import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Components
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center', 
    textTransform: 'uppercase'
  },
  winner: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    display: 'flex',
    justifyContent: 'center'
  },
}))
export default function Winner({ winner }) {
  const classes = useStyles()
  const { scores } = useContext(SocketContext)

  return (
    <Box display='flex' alignItems='center' flexGrow={1} >
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Typography variant='h2' className={classes.header}>Winner</Typography>
        </Grid>
        <Grid item xs={12} className={classes.winner}>
          <UserCard user={scores[0]} size='large'/>
        </Grid>
        <Grid item xs={11} sm={9} md={7} lg={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth>
                Leave
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth >
                Play Again
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </Box>
  )
}
