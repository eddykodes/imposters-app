import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Component
import UserCard from '../UserCard'
import QuestionHeader from './QuestionHeader'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'

const useStyles = makeStyles((theme) => ({
  formInput: {
    '& input': {
      textAlign: 'center',
    },
  }
}))

export default function Question() {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { question, target, round, sendAnswer, waitingOn } = useContext(SocketContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => clearTimeout(timer)
  })

  const handleChange = (event) => {
    setAnswer(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendAnswer(answer)
    setSubmitted(true)
  }

  return (
    <Box display='flex' alignItems='center' flexGrow={1}>
      { show ? (
        <Grid container justify='center'>
          <QuestionHeader question={question} target={target} />
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
            <>
            <Grid item xs={10} md={8} lg={6}>
              <Box component='form' my={6} onSubmit={handleSubmit}>
                <FormControl fullWidth className={classes.formInput}>
                  <Typography variant='overline' align='center' gutterBottom>Answer:</Typography>
                  <FilledInput 
                    required 
                    placeholder='Your answer here'
                    value={answer}
                    onChange={handleChange} 
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
              <Box display='flex' justifyContent='center'>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
              </Box>
            </Grid>
            </>
          )}
        </Grid>
      ) : (
        <Grid container direction='column' alignItems='center' spacing={3}>
          <Grid item>
            <Typography variant='h1' style={{ textTransform: 'uppercase'}}>Round {round}</Typography>
          </Grid>
          <Grid item>
            <Box textAlign='center'>
              <Typography variant='overline'>The target:</Typography>
            </Box>
            <UserCard user={target} size='medium'/>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
