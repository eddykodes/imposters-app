import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Context
import { SocketContextProvider } from './context/SocketContext'

// Pages
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

// Material UI
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './context/Theme'

function App() {
  return (
    <SocketContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/room/:id' component={Room} />
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </SocketContextProvider>

  );
}

export default App;
