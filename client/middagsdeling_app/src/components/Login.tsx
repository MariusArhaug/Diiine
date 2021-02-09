import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Login extends Component<{}, {}> {

    constructor(props: any){
        super(props)

        this.login = this.login.bind(this)
        
    }

    private login(){

    }

    render() {
        return <div>
            <h1>Login</h1>
            <TextField label="Username" />
            <br/>
            <TextField label="Password" />
            <br/>
            <Button onClick={this.login} variant="contained" color="primary">
                Log in
            </Button>
        </div>
    }
}