import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import {ProvideAuth, useAuth} from './hooks/use-auth'

import { DinnersPage } from './components/Dinners-page';
import { Login } from './components/Login';
import { Signup} from './components/Signup';
import './feathers';

function App() {
  return (
        <ProvideAuth>
          <Router>
            <div className="App">
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
        </ProvideAuth>
  );
}

export default App;
