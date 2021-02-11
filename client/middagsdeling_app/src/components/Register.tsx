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
import Allergy from './Allergy';

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
            alignSelf: "start",
            marginBottom: "auto",
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(3),
            height: "50px"
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
        },
        names: {
            display: "flex",
            justifyContent: "space-between",
        },
        nameInput: {
            width: "48%"
        }
    }),
);


export default function Register() {

    const classes = useStyles();

    let allergies = []

    const [state, setState] = React.useState({
        checked: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const deleteAllergy = (allergy: typeof Allergy) => {

    }

    return (
        <div className={classes.wrapper}>
            <img src={logo_colored} alt="logo" className={classes.logo}/>
            <Paper className={classes.login}>
                <Avatar className={classes.icon}><PersonAddIcon /></Avatar>
                <h1>Register</h1>
                <div className={classes.names}>
                    <TextField className={classes.nameInput} label="First name" placeholder='Enter first name' />
                    <TextField className={classes.nameInput} label="Last name" placeholder='Enter last name' />
                </div>
                
                <TextField label="E-mail" placeholder='Enter e-mail' />
                <TextField label="Phone number" placeholder='Enter phone number' />
                <TextField label="Address" placeholder='Enter address' />
                <TextField label="Password" placeholder='Enter password' />

                <Button>Add allergy</Button>

                {/* <Allergy deleteSelf={deleteAllergy} /> */}

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checked}
                            onChange={handleChange}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="Is user admin?"
                />
                <Button variant="contained" color="primary">
                    Register
                </Button>
                <div className={classes.links}>
                    <span>Already have an account? <Link>Sign in</Link></span>
                </div>
            </Paper>
        </div>
        )

}