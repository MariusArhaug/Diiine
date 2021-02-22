import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link as RouterLink } from 'react-router-dom';
//import client from '../feathers';

const allergies = [
    {label: 'Lactose', value: 'lactose'},
    {label: 'Gluten', value: 'gluten'},
    {label: 'Nuts', value: 'nuts'},
]

export const Signup = () => {
    const auth = useAuth();

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allergies: []
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((credentials) => ({
            ...credentials,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await auth.signup(credentials);
        console.log(result);
    }

    return (
        <div>
            <div className="verticalCenter">
                <Container maxWidth="xs">
                    <Paper style={{ padding: "50px" }}>
                        <form method='POST' onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Sign Up
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id='firstname'
                                                label='First name'
                                                className='form-field'
                                                type='text'
                                                name='firstName'
                                                value={credentials.firstName}
                                                style={{ width: "100%" }}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                    id='lastname'
                                                    label='Last name'
                                                    className='form-field'
                                                    type='text'
                                                    name='lastName'
                                                    value={credentials.lastName}
                                                    style={{ width: "100%" }}
                                                    onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='email'
                                        label='Email'
                                        className='form-field'
                                        type='text'
                                        name='email'
                                        value={credentials.email}
                                        style={{ width: "100%" }}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id='password'
                                        label='Password'
                                        className='form-field'
                                        type='password'
                                        name='password'
                                        value={credentials.password}
                                        style={{ width: "100%" }}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={allergies}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Allergies"
                                            placeholder="Allergy"
                                        />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
                                        Sign Up
                                </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        Already have an account? <Link
                                        component={RouterLink} to="/login">Log in</Link>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </div>
    )
}