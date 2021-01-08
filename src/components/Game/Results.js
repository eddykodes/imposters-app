import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'

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

export default function Results() {
  const classes = useStyles()
  const { target, question, results } = useContext(SocketContext)

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
                      <Box key={i}>
                        <UserCard user={v} size='mini'/>
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