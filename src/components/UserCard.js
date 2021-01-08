import React from 'react'
import logo from '../assets/incognito.svg'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    backgroundColor: props => props.avatarColor,
    borderRadius: '50%',
    flexShrink: 0,
    width: props => props.avatarSize,
    height: props => props.avatarSize,
    '& img': {
      paddingLeft: '1px',
      width: props => props.imgSize,
      height: props => props.imgSize,
    }
  },
  name: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: props => props.avatarColor,
    textTransform: 'uppercase'
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}))

export default function UserCard({ user, size }) {
  const cardSizes = () => {
    switch(size) {
      case 'small':
        return { avatarSize: '30px', imgSize: '18px', textSize: 'body2' }
      case 'medium':
        return { avatarSize: '75px', imgSize: '40px', textSize: 'h4' }
      case 'large':
        return { avatarSize: '180px', imgSize: '115px', textSize: 'h1' }
      default:
        return { avatarSize: '30px', imgSize: '18px', textSize: '' }
    }
  }

  const { avatarSize, imgSize, textSize } = cardSizes()
  const classes = useStyles({ avatarColor: '#EEEEEE', avatarSize, imgSize})

  return (
    <Box display='flex' alignItems='center' className={classes.root}>
      <Box className={classes.avatar} display='flex' justifyContent='center' alignItems='center' mr={1}>
        <img alt='Logo' src={logo} />
      </Box>
      { size !== 'mini' &&
        <Box>
          <Typography variant={textSize} className={classes.name}>{user.name}</Typography>
        </Box>
      }
    </Box>
  )
}

UserCard.defaultProps = {
  size: 'small',
  user: {
    name: '???'
  }
}