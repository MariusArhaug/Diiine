import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {ProvideAuth, useAuth} from './hooks/use-auth'
import Login from './routes/LoginRoute';
import Register from './routes/RegisterRoute';
import Home from './routes/Home';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
