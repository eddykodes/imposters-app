import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Components
import AnswerCard from './AnswerCard'
import QuestionHeader from './QuestionHeader'

// Components
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    textTransform: 'uppercase',
  },
  answers: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}))

export default function Answer() {
  const classes = useStyles()
  const [vote, setVote] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { target, question, answers, waitingOn, sendVote } = useContext(SocketContext)


  function handleSubmit(event) {
    event.preventDefault()
    sendVote(vote)
    setVote(null)
    setSubmitted(true)
  }  

  return (
    <Box display='flex' alignItems='center' flexGrow={1} >
      <Grid container justify='center'>
        <QuestionHeader question={question} target={target} />
        <Grid container className={classes.answers} spacing={3}>
          { answers.map((answer, i) => (
            <AnswerCard key={i} index={i} answer={answer} voteStatus={i === vote} setVote={setVote}/>
          ))}
        </Grid>
        { submitted ? (
          <Grid item xs={12} md={10} lg={8} className={classes.action}>
            <Box display='flex' justifyContent='center' mt={6}>
              <Typography>Waiting on...</Typography>
            </Box>
            <Box display='flex' justifyContent='center' mt={1}>
              { waitingOn.map(user => (
                <Box key={user.id} mr={1}>
                  <UserCard user={user} size='mini' />
                </Box>
              ))}
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} md={10} lg={8}>
            <Box display='flex' justifyContent='center'>
              <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
