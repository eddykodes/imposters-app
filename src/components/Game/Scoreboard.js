import React from 'react'

// Component
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  status: {
    textTransform: 'uppercase',
    marginTop: theme.spacing(1)
  },
  players: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

export default function Scoreboard({ scores, round }) {
  const classes = useStyles()

  return (
    <>
      <Box py={3} textAlign='center'>
        <Typography variant='h2' align='center' style={{ textTransform: 'uppercase'}}>Scores</Typography>
          { round === 8 ? (
            <Typography variant='overline' className={classes.status}>Game Over</Typography>
          ) : (
            <Typography variant='overline' className={classes.status}>{8-round} rounds remaining</Typography>
          )}
      </Box>
      <Grid container justify='center'>
        
        <Grid item xs={12} sm={10} md={9} lg={8} className={classes.players}>
        {
          scores.map((score, i) => (
            <Box key={i} display='flex' justifyContent='space-between' alignItems='center'>
              <UserCard user={score.user} size='medium'/>
              <Typography variant='h2' gutterBottom >{score.score}</Typography>
            </Box>
          ))
        }
        </Grid>
      </Grid>
    </>
  )
}

Scoreboard.defaultProps = {
  scores: [
    { user: { name: 'User 1' }, score: 90 },
    { user: { name: 'User 2' }, score: 80 },
    { user: { name: 'User 3' }, score: 70 },
    { user: { name: 'User 4' }, score: 60 },
    { user: { name: 'User 5' }, score: 50 },
    { user: { name: 'User 6' }, score: 40 },
  ]
}