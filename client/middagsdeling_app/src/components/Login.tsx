import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Link } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo_colored from '../media/logo_colored.svg'
import { useStyles } from '../styles';


export default function Login() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.wrapper}>
            <img src={logo_colored} alt="logo" className={classes.logo}/>
            <Paper className={classes.login}>
                <Avatar className={classes.icon}><PersonAddIcon /></Avatar>
                <h1>Sign in</h1>
                <TextField label="Username" placeholder='Enter username' />
                <TextField label="Password" placeholder='Enter password' />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checked}
                            onChange={handleChange}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button variant="contained" color="primary">
                    Log in
                </Button>
                <div className={classes.links}>
                    <Link>Forgot password?</Link>
                    <span>Don't have an account yet? <Link>Sign up</Link></span>
                </div>
            </Paper>
        </div>
        )

}