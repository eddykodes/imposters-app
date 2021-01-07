import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  paper: {
    height: '100%',
    backgroundColor: '#EEEEEE',
    border: '1px solid #EEEEEE'
  },
  content: {
    height: '100%'
  }
}))

export default function AnswerCard({ answer, index, voteStatus, setVote }) {
  const classes = useStyles()

  function handleClick() {
    if (voteStatus)
      return setVote(null)

    setVote(index)
  }

  return (
    <Grid item xs={12} md={6} className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Box display='flex' alignItems='center' className={classes.content}>
          <Box flexGrow={1} p={1}>
            <Typography variant="body1">
              {answer}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClick}>
              {voteStatus ? <CheckCircleIcon color='primary' /> : <CheckCircleIcon />}
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}
