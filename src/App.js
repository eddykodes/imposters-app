import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Context
import { SocketContextProvider } from './context/SocketContext'
// Pages
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

function App() {
  return (
    <SocketContextProvider>
      <Router>
        <Switch>
          <Route exact path='/room/:id' component={Room} />
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </SocketContextProvider>

  );
}

export default App;
