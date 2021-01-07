import React, { useEffect, useState } from 'react'

// Component
import UserCard from '../UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    textTransform: 'uppercase',
  },
  formInput: {
    '& input': {
      textAlign: 'center',
    },
  }
}))

export default function Question({ round, target }) {
  const classes = useStyles()
  const question = 'This is where a question will go?'
  const [show, setShow] = useState(false)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => clearTimeout(timer)
  })

  const handleChange = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <Box display='flex' alignItems='center' flexGrow={1}>
      { show ? (
        <Grid container justify='center'>
          <Grid item xs={12} md={10} lg={8} >
            <Box display='flex' justifyContent='center' alignItems='center'>
              <UserCard user={target} size='small' />
            </Box>
            <Typography variant='h4' align='center' className={classes.header}>{question}</Typography>
          </Grid>
          <Grid item xs={10} md={8} lg={6}>
            <Box component='form' my={6}>
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
              <Button >Submit</Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction='column' alignItems='center' spacing={3}>
          <Grid item>
            <Typography variant='h1' className={classes.header}>Round {round}</Typography>
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
