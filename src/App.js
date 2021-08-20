import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Home from './Home.js';
import SignIn from './SignIn.js';
import Chat from './Chat.js';
import NavBar from './NavBar.js';

function App() {

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path='/chat/:id'>
          <Chat/>
        </Route>
        <Route path='/signup'>
          <SignIn/>
        </Route>
        <Route path='/signin'>
          <SignIn/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/'>
          <Redirect to='/home'/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
