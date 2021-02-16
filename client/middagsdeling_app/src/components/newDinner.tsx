import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Link } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo_colored from '../media/logo_colored.svg'
import { useStyles } from '../styles';
import { Link as RouterLink } from 'react-router-dom';


export default function newDinner() {
    
    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return(
        <div className={classes.wrapper}>
            <img src={logo_colored} alt="logo" className={classes.logo} />
            <Paper className={classes.newDinner}>
                <div className={classes.flexerVertical}>
                    <Avatar className={classes.icon}><FastfoodIcon /></Avatar>
                    <h1>Add new dinner</h1>
                    <h5>Please enter information about your dinner</h5>
                    <TextField label="Dinner name" placeholder='Enter name' />
                    <TextField label="Description" placeholder='Enter description' />
                    <TextField label="Location" placeholder='Enter location' />
                    <TextField label="Maximum guests" placeholder='Enter maximum guests' />
                    <TextField label="Allergies" placeholder='Enter allergies' />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checked}
                                onChange={handleChange}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Share the recepit?"
                    />
                    <Button component={RouterLink} to="/" variant="contained" color="primary">
                        Add dinner
                    </Button>

                </div>
            </Paper>
        </div>


    )


}    