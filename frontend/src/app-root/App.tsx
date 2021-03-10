import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from '../home/Home';
import Game from '../game/Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/play">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
