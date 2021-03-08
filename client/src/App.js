import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DeveloperProfile from './pages/DeveloperProfile'

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
          <Route path = '/' exact component = {Home}/>
          <Route path='/api/developers/:developerId' exact component={DeveloperProfile} />
      </Switch>
    </Router>
  );
}

export default App;
