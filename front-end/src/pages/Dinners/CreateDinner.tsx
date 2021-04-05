import React, { useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import client from '../../feathers-client'
import { useStyles } from '../../styles';
import { Chip } from '../../types';
import { allergies, tags } from './EditDinnerPage';
import { SuccessAlert, ErrorAlert } from '../../hooks/Alerts';
import { CreateChipArray } from '../../hooks/CreateChipArray'
import { useHistory } from 'react-router-dom';

export default function MyDinners() {
  const history = useHistory();
  const classes = useStyles();

  const [credentials, setCredentials] = useState<{
    title: string,
    address: string,
    description: string,
    date: string,
    tags: Chip[],
    ingredients: string[],
    allergens: Chip[],
    attendants: number,
    isDivided: false,
    isOpen: false,
    expenses: number,
    banner: string
  }>({
    title: '',
    address: '',
    description: '',
    date: '',
    tags: [],
    ingredients: [],
    allergens: [],
    attendants: 0,
    isDivided: false,
    isOpen: false,
    expenses: 0,
    banner: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'isDivided' || event.target.name === 'isOpen') {
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
  const handleTagChange = (event: any, value: any) => {
    console.log(event);

    setCredentials({ ...credentials, tags: value as Chip[] });
  }

  const handleAllergenChange = (event: any, value: any) => {
    setCredentials({ ...credentials, allergens: value as Chip[] });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = {
      ...credentials,
      allergens: credentials.allergens.map(a => a.label).join(","),
      tags: credentials.tags.map(t => t.label).join(","),
      ingredients: credentials.ingredients.join(",")
    };

    client.service('dinners').create(form)
      .then(() => {
        SuccessAlert('Scoore!', 'You have now created a new dinner!', 'Nice!')
        history.push({
          pathname: `/dinners/`,
        })
      })
      .catch((e: Error) => {
        ErrorAlert('Error!', e.message, 'Ok')
      });
  }


  return (
    <div className={classes.spacer}>
      <Container maxWidth="sm">
        <Paper style={{ padding: "50px" }}>
          <form method='POST' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Create Dinner
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      id='title'
                      label='Dinner name'
                      className='form-field'
                      type='text'
                      name='title'
                      value={credentials.title}
                      style={{ width: "100%" }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="date"
                      label="Date"
                      type="date"
                      name="date"
                      defaultValue={credentials.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='address'
                  label='Address'
                  className='form-field'
                  type='text'
                  name='address'
                  value={credentials.address}
                  style={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  style={{ width: "100% " }}
                  value={credentials.description}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={credentials.isDivided} onChange={handleInputChange} name="isDivided" color="primary" />}
                        label="Split the bill"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={credentials.isOpen} onChange={handleInputChange} name="isOpen" color="primary" />}
                        label="Open"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="expenses"
                      label="Expenses (kr)"
                      type="number"
                      name="expenses"
                      defaultValue={credentials.expenses}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  value={credentials.allergens}
                  onChange={handleAllergenChange}
                  options={allergies}
                  freeSolo
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
                <Autocomplete
                  multiple
                  id="tags-standard"
                  value={credentials.tags}
                  options={tags}
                  freeSolo
                  onChange={handleTagChange}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tags"
                      placeholder="Tag"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
                  Create dinner!
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div >
  )
}