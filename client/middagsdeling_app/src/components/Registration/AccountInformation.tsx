import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '../../styles';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

export default function AccountInformation() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormLabel component="legend">Input account information</FormLabel>
                </Grid>

                <Grid item xs={6}>
                    <TextField className={classes.input} label="First name" placeholder='Enter first name' />
                </Grid>
                <Grid item xs={6}>
                    <TextField className={classes.input} label="Last name" placeholder='Enter last name' />
                </Grid>

                <Grid item xs={12}>
                    <TextField className={classes.input} label="E-mail" placeholder='Enter e-mail' />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Phone number" placeholder='Enter phone number' />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Address" placeholder='Enter address' />
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
                        label="Is user admin?"
                    />
                </Grid>

            </Grid>
        </div>
    )
}