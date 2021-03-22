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
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

export default function App() {
  return (
    <Scrollbars
      autoHeight
      autoHide
      autoHeightMin="100vh"
      renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
      renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
    >
      <ProvideAuth>
        <Router>
            <Grid container justify="space-between" direction="column" className="App">
              <Grid item>
                <Navbar />
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
              </Grid> 
              <Grid item>
                <Footer/>
              </Grid>
            </Grid>
        </Router>
      </ProvideAuth>
    </Scrollbars>
  );
}
