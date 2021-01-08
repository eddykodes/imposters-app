import React, { useContext, useState } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Components
import AnswerCard from './AnswerCard'
import QuestionHeader from './QuestionHeader'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

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
  const { target, question, answers } = useContext(SocketContext)

  return (
    <Box display='flex' alignItems='center' flexGrow={1} >
      <Grid container justify='center'>
        <QuestionHeader question={question} target={target} />
        <Grid container className={classes.answers} spacing={3}>
          { answers.map((answer, i) => (
            <AnswerCard key={i} index={i} answer={answer} voteStatus={i === vote} setVote={setVote}/>
          ))}
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Box display='flex' justifyContent='center'>
            <Button>Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
