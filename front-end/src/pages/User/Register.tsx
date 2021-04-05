import React, { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Chip } from '../../types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../../styles/App.css';
import { CreateChipArray } from '../../hooks/CreateChipArray';
import { ErrorAlert } from '../../hooks/Alerts';

const allergies = [
  { label: 'Lactose', value: 'lactose' },
  { label: 'Gluten', value: 'gluten' },
  { label: 'Shellfish', value: 'shellfish' },
  { label: 'Egg', value: 'egg' },
  { label: 'Fish', value: 'fish' },
  { label: 'Mustard', value: 'mustard' },
  { label: 'Celleri', value: 'celleri' },
  { label: 'Peanuts', value: 'peanuts' },
  { label: 'Soy', value: 'soy' },
  { label: 'Molluscs', value: 'molluscs' },
  { label: 'Lupin', value: 'lupin' },
  { label: 'Sulfites', value: 'sulfites' },
]

interface Form {
  name: string,
  email: string,
  password: string,
  allergies: Chip[] | undefined
  isAdmin: boolean,
  adminKey: string,
}

const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

const formIsValid = (form: Form): boolean => {
  let errorFields = '';
  let isValid = true;
  if (!validateEmail(form.email)) {
    isValid = false;
    errorFields += 'Email '
  }
  if (!validatePassword(form.password)) {
    isValid = false;
    errorFields += 'Password '
  }

  console.log(form);
  console.log({
    ...form,
    allergies: form.allergies ? form.allergies.map(a => a.label).join(",") : ""
  });

  if (form.isAdmin === true && form.adminKey !== "vielskerPU40lol") {
    isValid = false;
    errorFields += 'Key';
  }
  if (!isValid) {
    ErrorAlert('Error!', `the following fields not out filled out: \n ${errorFields}`, 'Try again')
  }
  return isValid;
}

export default function Register() {
  const auth = useAuth();
  const history = useHistory();

  const [allergyInputValue, setAllergyInputValue] = useState('');

  const [credentials, setCredentials] = useState<Form>({
    name: '',
    email: '',
    password: '',
    allergies: [],
    isAdmin: false,
    adminKey: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'isAdmin') {
      setCredentials((credentials) => ({
        ...credentials,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setCredentials((credentials) => ({
        ...credentials,
        [event.target.name]: event.target.value,
      }));
    }
  }

  const handleAllergyChange = (event: any, value: any) => {
    setCredentials({ ...credentials, allergies: value as Chip[] });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid(credentials)) {
      return;
    };
    
    const form = (({ adminKey, ...o }) => o)({
      ...credentials,
      allergies: credentials.allergies ? credentials.allergies.map(a => a.label).join(",") : ""
    });
    auth.signup(form)
      .then(() => {
        auth.signin({ email: form.email, password: form.password })
          .then(() => {
            history.push({
              pathname: `/profile/`
            })
          }).catch((e: Error) => console.log('Error with loging in!', e.message))
      }).catch((e: Error) => console.log('Error with signing up', e.message));
  }


  return (
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
                <Grid container spacing={3}>
                  <Grid item xs={6} >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="isAdmin" color="primary" checked={credentials.isAdmin}
                          onChange={handleInputChange} />}
                        label="Admin"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Key:'
                      className='form-field'
                      type='password'
                      name='adminKey'
                      value={credentials.adminKey}
                      style={{ width: "100%" }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={allergies}
                    value={credentials.allergies}
                    inputValue={allergyInputValue}
                    onInputChange={(_, newInputValue) => {
                      setAllergyInputValue(newInputValue)
                    }}
                    onChange={handleAllergyChange}
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
                  Already have an account?
                  <Link component={RouterLink} to="/login">Log in</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  )
}