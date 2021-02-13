import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Link } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo_colored from '../media/logo_colored.svg'
import Allergy from './Allergy';
import { useStyles } from '../styles';


export default function Register() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false,
        allergies: [] as any
    });

    const addAllergy = () => {
        console.log("allergy added")
        setState({
            checked: state.checked,
            allergies: [...state.allergies, <Allergy />]
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.wrapper}>
            <img src={logo_colored} alt="logo" className={classes.logo}/>
            <Paper className={classes.login}>

                <Avatar className={classes.icon}>
                    <PersonAddIcon />
                </Avatar>

                <h1>Register</h1>
                <div className={classes.names}>
                    <TextField className={classes.nameInput} label="First name" placeholder='Enter first name' />
                    <TextField className={classes.nameInput} label="Last name" placeholder='Enter last name' />
                </div>
                
                <TextField label="E-mail" placeholder='Enter e-mail' />
                <TextField label="Phone number" placeholder='Enter phone number' />
                <TextField label="Address" placeholder='Enter address' />
                <TextField label="Password" placeholder='Enter password' />

                <Button onClick={() => addAllergy()}>Add allergy</Button>

                {[...state.allergies]}

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