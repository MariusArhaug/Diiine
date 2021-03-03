import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link as RouterLink } from 'react-router-dom';
import { Chip } from '../types';

const allergies = [
    {label: 'Lactose', value: 'lactose'},
    {label: 'Gluten', value: 'gluten'},
    {label: 'Shellfish', value: 'shellfish'},
    {label: 'Egg', value: 'egg'},
    {label: 'Fish', value: 'fish'},
    {label: 'Mustard', value: 'mustard'},
    {label: 'Celleri', value: 'celleri'},
    {label: 'Peanuts', value: 'peanuts'},
    {label: 'Soy', value: 'soy'},
    {label: 'Molluscs', value: 'molluscs'},
    {label: 'Lupin', value: 'lupin'},
    {label: 'Sulfites', value: 'sulfites'},
]

export const Signup = () => {
    const auth = useAuth();

    const [credentials, setCredentials] = useState<{
        name: string,
        email: string,
        password: string,
        allergies: Chip[]
    }>({
        name: '',
        email: '',
        password: '',
        allergies: []
    });

    //can be put in another seperate file.
    const validateEmail = (email: string) : boolean  => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password: string) : boolean => {
        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        return re.test(String(password).toLowerCase());
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        /*if (validateEmail(credentials.email) || validatePassword(credentials.password)) {
            return; //check fields.
        }*/
        setCredentials((credentials) => ({
            ...credentials,
            [event.target.name]: event.target.value,
        }));
    }

    const createChipArray = (value: any) => {
        let temp = []
        for (let element of value){
            if (!(element.hasOwnProperty("label")) || !(element.hasOwnProperty("value"))){
                temp.push({label: element, value: element})
            }
            else {
                temp.push(element)
            }
        }
        return temp
    }

    const handleAllergyChange = (event: any, value: any) => {
        setCredentials({ ...credentials, allergies: createChipArray(value) });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
       
        const form = {...credentials, 
            allergies: credentials.allergies.map(a => a.value).join(",")};
        console.log(form)
        const result = await auth.signup(form);
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
                                    <TextField
                                        id='name'
                                        label='Name'
                                        className='form-field'
                                        type='text'
                                        name='name'
                                        value={credentials.name}
                                        style={{ width: "100%" }}
                                        onChange={handleInputChange}
                                    />
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
                                        value={credentials.allergies}
                                        onChange={handleAllergyChange}
                                        options={allergies}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Allergens"
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
                    <Button component={RouterLink} to='/login'>Log in</Button>
                </Container>
            </div>
        </div>
    )
}