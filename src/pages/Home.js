import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import logo from '../assets/incognito.svg'
import JoinRoomForm from '../components/JoinRoomForm'
import UserProfile from '../components/UserProfile'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  logo: {
    backgroundColor: '#eeeeee',
    width: '225px',
    height: '225px',
    borderRadius: '50%',
    margin: 'auto',
    '& img': {
      width: '135px',
      height: '135px',
      paddingLeft: '5px'
    }
  },
  headerTitle: {
    textTransform: 'uppercase',
  },
  headerButton: {
    width: '280px'
  },
  actions: {
    justifyContent: 'center'
  },
}));

export default function Home() {
  const classes = useStyles()
  const { setError } = useContext(SocketContext)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [createRequest, setCreateRequest] = useState(false)
  
  const handleCreateRequest = () => {
    setError(null)
    setCreateRequest(true)
    setShowUserProfile(true)
  }

  return (
    <Grid container justify='center' alignItems='center' className={classes.root}>
      <Grid container justify='center'>    
        <Grid item xs={12}>
            <Box className={classes.logo} display='flex' justifyContent='center' alignItems='center'>
              <img alt='Logo' src={logo} />
            </Box>
            <Typography variant='h2' className={classes.headerTitle} align='center'>Imposters</Typography>
            <Box display='flex' justifyContent='center' mt={1} mb={6}>
              <Button className={classes.headerButton}>How To Play</Button>
            </Box>
        </Grid>
        <Grid item xs={11} sm={9} md={7} lg={4}>
          {
            showUserProfile ? (
              <UserProfile 
                createRequest={createRequest} 
                setCreateRequest={setCreateRequest} 
                setShowUserProfile={setShowUserProfile} 
              />
            ) : (
              <>
                <JoinRoomForm setShowUserProfile={setShowUserProfile} />  
                <Box my={2}>
                  <Divider />
                </Box>
                <Button fullWidth onClick={handleCreateRequest}>Create Room</Button>
              </>
            )
          }
          
        </Grid>
      </Grid>
    </Grid>
  )
}
