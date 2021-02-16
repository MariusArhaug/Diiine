import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '../../styles';
import FormLabel from '@material-ui/core/FormLabel';

export default function AccountInformation() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.flexerVertical}>

            <FormLabel component="legend">Input account information</FormLabel>

            <div className={classes.names}>
                <TextField className={classes.nameInput} label="First name" placeholder='Enter first name' />
                <TextField className={classes.nameInput} label="Last name" placeholder='Enter last name' />
            </div>

            <TextField label="E-mail" placeholder='Enter e-mail' />
            <TextField label="Phone number" placeholder='Enter phone number' />
            <TextField label="Address" placeholder='Enter address' />
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
                label="Is user admin?"
            />
        </div>
    )
}