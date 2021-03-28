import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import swal from 'sweetalert';
import '../styles/App.css';



export default function Login() {
  const auth = useAuth();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    auth.reAuth();
  }, [auth])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();


    if ((credentials.email === "") || (credentials.password === "")) {
      swal({
        title: 'Whopsie a wee ERROR!',
        text: 'You need to fill in valid login information',
        icon: 'error',
        buttons: {
          confirm: {
            text: "TRY AGAIN",
            className: "buttonStyle errorStyle",
          }
        }
      })
      return;
    }
    // This can be removed if directed to profile automatically
    const res = await auth.signin(credentials);
    console.log(res);
    swal({
      title: 'Success!',
      text: 'You have now logged in!',
      icon: 'success',
      buttons: {
        confirm: {
          text: "Nice!",
          className: "buttonStyle",
        }
      }
    });
    setResult(res);
  }
  if (auth.user !== null) {
    return <Redirect to="/chat" />
  }
  return (
    <div className="verticalCenter">
      {result &&
        <Redirect to="/dinners" />
      }
      <Container maxWidth="xs">
        <Paper style={{ padding: "50px" }}>
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
                <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
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
