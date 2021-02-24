import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './routes/LoginRoute';
import Register from './routes/RegisterRoute';
import Home from './routes/Home';
import Footer from './components/footer';

class App extends Component {

  /*static async postData() : Promise<any> {
    
    try {

    } catch(error) {
      console.log(error);
    }
  }

  static async sendData(e : any): Promise<any> {

  }*/

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
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
}

export default App;
