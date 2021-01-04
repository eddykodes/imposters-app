import { createMuiTheme } from '@material-ui/core/styles'

const custom = {
  text: {
    primary: '#4a4a4a'
  }
} 

const theme = createMuiTheme({
  props: {
    MuiButton: {
      disableElevation: true,
      variant: 'contained',
    },
    MuiFormControl: {
      fillWidth: true,
      margin: 'dense',
      size: 'small',
      hiddenLabel: 'true',
    },
    MuiFilledInput: {
      disableUnderline: true,
      autoFocus: true,
      margin: 'dense',
    }
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
    allVariants: {
      color: custom.text.primary
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    }
  },
  shape: {
    borderRadius: 0
  },
  overrides: {
    MuiButton: {
      contained: {
        color: custom.text.primary
      }
    }
  }
})

export default theme