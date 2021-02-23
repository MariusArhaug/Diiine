import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';

export default function Login() {
    const auth = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [result, setResult] = useState(null);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((credentials) => ({
            ...credentials,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const result = await auth.signin(credentials);
        console.log(result);

        
       
    }

    return (
        <div className="verticalCenter">
            <Container maxWidth="xs">
                <Paper style={{padding: "50px"}}>
                    <form method='POST' onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='email'
                                    label='Email'
                                    className='form-field'
                                    type='text'
                                    name='email'
                                    value={credentials.email}
                                    style={{width: "100%"}}
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
                                    style={{width: "100%"}}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type='submit' variant="contained" color="primary" style={{width: "100%"}}>
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Don't have an account yet? <Link
                                    component={RouterLink} to="signup">Sign up</Link>
                                </Typography>
                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}