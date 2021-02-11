import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Link } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo_colored from '../media/logo_colored.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            height: "100vh",
            width: "100vw"
        },
        logo: {
            flex: "0 1 auto",
            marginBottom: "auto",
            marginTop: theme.spacing(15)
        },
        login: {
            flex: "0 1 auto",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            width: "500px",
            padding: "20px",
        },
        icon: {
            alignSelf: "center"
        },
        links: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "start",
            justifyContent: "center",
            padding: "10px",
        }
    }),
);


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
                <br />
                <TextField label="Password" placeholder='Enter password' />
                <br />
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