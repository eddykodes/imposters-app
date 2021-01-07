import React from 'react'

// Components
import UserCard from '../UserCard'
import QuestionHeader from './QuestionHeader'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    marginBottom: theme.spacing(3),
    textTransform: 'uppercase',
  },
  results: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
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
    <Box display='flex' alignItems='center' flexGrow={1}>
      <Grid container justify='center'>
        <QuestionHeader question={question} target={target}/>
        <Grid container className={classes.results}>
          { results.map((result, i) => (
            <Grid key={i} item xs={12} md={6} className={classes.result}>
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