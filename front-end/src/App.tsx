import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './routes/LoginRoute';
import Register from './routes/RegisterRoute';
import Home from './routes/Home';

function App() {
  /*
  return (
        <ProvideAuth>
          <Router>
            <div className="App">
              <Navbar />

              <Switch>
                <Route path="/dinners">
                  <DinnersPage />
                </Route>
                <Route path="/signin">
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
  */
 return (
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
);
}

export default App;
