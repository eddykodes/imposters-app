import React from 'react'

// Component
import UserCard from '../UserCard'

// Material UI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default function QuestionHeader({ question, target}) {
  return (
    <Grid item xs={12} md={10} lg={8} >
      <Box display='flex' justifyContent='center' alignItems='center'>
        <UserCard user={target} size='small' />
      </Box>
      <Typography variant='h4' align='center' style={{ textTransform: 'uppercase'}}>{question}</Typography>
    </Grid>
  )
}
