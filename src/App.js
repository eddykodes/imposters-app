import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/room/:id' component={Room} />
        <Route exact path='/' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
