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
import Admin from './routes/AdminRoute'
import Footer from './components/Footer';
import EditDinner from './pages/Dinners/EditDinner';

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
{/*             <Route path="/editdinner/:dinnerId">
              <EditDinner/>
            </Route> */}
          </Switch>
          <Footer/>
        </div>
      </Router>
    </ProvideAuth>
  );
}
