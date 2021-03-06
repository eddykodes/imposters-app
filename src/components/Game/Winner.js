import React, { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'

// Components
import UserCard from '../UserCard'

// Material UI
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

export default function Winner({ handleBack }) {
  const { scores, restartGame } = useContext(SocketContext)

  const handleRestart = () => {
    restartGame()
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' flexGrow={1}>
      <Box>
        <Box py={3} textAlign='center'>
          <Typography variant='h2' style={{ textTransform: 'uppercase'}}>Winner</Typography>
        </Box>
        <Box display='flex' justifyContent='center' py={6}>
          <UserCard user={scores[0]} size='large'/>
        </Box>
        <Box display='flex' justifyContent='center' py={3}>
          <Box mr={1}>
            <Button onClick={handleBack}>
              Leave Room
            </Button>
          </Box>    
          <Button onClick={handleRestart}>Play Again</Button>
        </Box>
      </Box>
    </Box>
  )
}
