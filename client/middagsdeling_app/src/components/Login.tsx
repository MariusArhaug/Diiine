import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default class Login extends Component<{}, {}> {

    constructor(props: any){
        super(props)

        this.login = this.login.bind(this)
        
    }

    private login(){

    }

    render() {
        return <div>
            <h1>Sign in</h1>
            <Avatar><PersonAddIcon/></Avatar>
            <TextField label="Username" placeholder ='Enter username'/>
            <br/>
            <TextField label="Password" placeholder ='Enter password' />
            <br/>
            <Button onClick={this.login} variant="contained" color="primary">
                Log in
            </Button>
        </div>
    }
}