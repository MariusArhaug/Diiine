import React, { Component } from 'react';

export default class Login extends Component<{}, {}> {

    render() {
        return <div>
            <h1>Login</h1>
            <span>Brukernavn </span>
            <input type="text" name="" id=""/>
            <br/>
            <span>Passord </span>
            <input type="text" name="" id=""/>
            <br/>
            <input type="button" value="Log in"/>
        </div>
    }
}