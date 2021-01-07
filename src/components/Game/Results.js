import React from 'react'

// Components
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - 48px)'
  },
  header: {
    marginBottom: theme.spacing(3),
    textTransform: 'uppercase',
  },
  action: {
    marginTop: theme.spacing(3),
  },
  result: {
    padding: theme.spacing(3)
  },
  paper: {
    height: '100%',
  },
  content: {
    height: '100%'
  }
}))

export default function Results({ results, question, target }) {
  const classes = useStyles()

  return (
    <Box className={classes.root} display='flex' alignItems='center'>
      <Grid container justify='center'>
        <Grid item xs={12} md={10} lg={8} >
          <Box display='flex' justifyContent='center' alignItems='center'>
            <UserCard user={target} size='small' />
          </Box>
          <Typography variant='h4' align='center' className={classes.header}>{question}</Typography>
        </Grid>
        <Grid container>
          { results.map((result, i) => (
            <Grid item xs={12} md={6} className={classes.result}>
              <Paper className={classes.paper} elevation={0}>
                <Box display='flex' alignItems='center' className={classes.content}>
                <Box mr={3}>
                  <UserCard user={result.user} size='small'/>
                </Box>
                <Box display='flex'>
                  { result.votes.map((v, i) => (
                    <Box key={i} mr={1}>
                      <UserCard user={v} size='small'/>
                    </Box>
                  ))}
                </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

Results.defaultProps = {
  results: [
    {
      answer: 'Answer 1',
      user: { name: 'User 1'},
      votes: [{name: 'User 2'}, {name: 'User 3'}]
    },
    {
      answer: 'Answer 2',
      user: { name: 'User 2'},
      votes: [{name: 'User 1'}]
    },
    {
      answer: 'Answer 3',
      user: { name: 'User 3'},
      votes: []
    },
    {
      answer: 'Answer 4',
      user: { name: 'User 4'},
      votes: [{name: 'User 5'}]
    },
    {
      answer: 'Answer 5',
      user: { name: 'User 5'},
      votes: [{name: 'User 6'}, {name: 'User 4'}]
    },
    {
      answer: 'Answer 6',
      user: { name: 'User 6'},
      votes: []
    },
  ]
}