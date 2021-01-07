import React, { useState } from 'react'
import raiseHand from '../assets/raise-hand.png'

// Components
import UserCard from './UserCard'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  howToPlayButton: {
    width: '280px'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  image: {
    height: '150px'
  },
  paper: {
    height: '100%',
  },
  header: {
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function HowToPlay() {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user1 = {
    name: 'Dexter',
  }
  const user2 = {
    name: 'Cherry',
  }

  return (
    <>
      <Button
        variant='contained'
        disableElevation
        className={classes.howToPlayButton}
        onClick={handleClickOpen}
      >
        How To Play
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color='transparent' elevation={0}>
          <Toolbar>
            <Typography variant='h4' className={classes.title}>
              How To Play
            </Typography>
            <Button variant='text' onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper} variant='outlined' elevation={0}>
                <Box p={3}>
                  <Typography variant='h4' align='center' className={classes.header}>1</Typography>
                  <Typography variant='body1' align='center'>Every round one random player will be the selected as the target and given a question...</Typography>
                  <Box className={classes.root} display='flex' alignItems='center' my={4}>
                    <Grid container direction='column' alignItems='center' spacing={2}>
                      <Grid item>
                        <Box textAlign='center'>
                          <Typography variant='overline'>The target:</Typography>
                        </Box>
                        <UserCard user={user1} size='medium'/>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper className={classes.paper} variant='outlined' elevation={0}>
                <Box p={3}>
                  <Typography variant='h4' align='center' className={classes.header}>2</Typography>
                  <Typography variant='body1' align='center'>Your mission is to answer the question how you think the target will, to fool the rest...</Typography>
                  <Box my={4}>
                    <Grid container justify='center'>
                      <Grid item xs={10}>
                        <Typography variant='h4' align='center' style={{ textTransform: 'uppercase'}}>My secret is...</Typography>
                      </Grid>
                      <Grid item xs={10} md={9}>
                        <Box my={3}>
                          <FormControl fullWidth>
                            <Typography variant='body2' align='center' gutterBottom>Answer:</Typography>
                            <FilledInput 
                              disabled
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper} variant='outlined' elevation={0}>
                <Box p={3}>
                  <Typography variant='h4' align='center' className={classes.header}>3</Typography>
                  <Typography variant='body1' align='center'>Cast your vote and see if you can spot the real answer out of all the fakes...</Typography>
                  <Box display='flex' justifyContent='center' mt={6}>
                    <img src={raiseHand} className={classes.image} alt='vote-graphic' />
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper} variant='outlined' elevation={0}>
                <Box p={3}>
                  <Typography variant='h4' align='center' className={classes.header}>4</Typography>
                  <Typography variant='body1' align='center'>The more players that pick your answer, the more points you get...</Typography>
                  <Box className={classes.root} display='flex' alignItems='center' my={4}>
                    <Grid container direction='column' alignItems='center'>
                      <Grid item >
                        <Typography variant='body2' align='center' className={classes.target}>The winner:</Typography>
                        <UserCard user={user2} size='medium'/>
                      </Grid>
                    </Grid>
                  </Box>
                  <Typography variant='body1' align='center'>Fool as many players as you can to be the ultimate imposter!</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='center' mt={3}>
            <Button variant='contained' disableElevation onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Container>
      </Dialog>
    </>
  )
}
