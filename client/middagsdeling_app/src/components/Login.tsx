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
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';

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
            <img src={logo_colored} alt="logo" className={classes.logo} />
            <Paper className={classes.login}>
                <Grid container spacing={3} alignContent="center">

                    {/* <Grid item xs={12}>
                        <Avatar className={classes.icon}><PersonAddIcon /></Avatar>
                    </Grid> */}

                    <Grid item xs={12}>
                        <h1>Sign in</h1>
                    </Grid>


                    <Grid item xs={12}>
                        <TextField className={classes.input} label="Username" placeholder='Enter username' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.input} label="Password" placeholder='Enter password' />
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/" variant="contained" color="primary">
                            Log in
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <span>Don't have an account yet? <Link component={RouterLink} to="/register">Sign up</Link></span>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )

}