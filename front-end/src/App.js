import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import { DinnersPage } from './components/Dinners-page';
import { Login } from './components/Login';
import { Signup} from './components/Signup';
import './feathers';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/dinners">Dinners</Link>
                </li>
            </ul>
        </nav>
            

        <Switch>
          <Route path="/dinners">
            <DinnersPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
