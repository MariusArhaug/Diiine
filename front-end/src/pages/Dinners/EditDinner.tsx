import React, { useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import client from '../../feathers-client'
import { useStyles } from '../../styles';
import { Chip } from '../../types';
import { Dinner } from '../../types';
import { tags, allergies } from './EditDinnerPage';
import { CreateChipArray } from '../../hooks/CreateChipArray'
import { SuccessAlert, ErrorAlert } from '../../hooks/Alerts';
import { useHistory } from 'react-router-dom';

interface Cred {
  title: string,
  date: Date,
  address: string,
  description: string,
  isDivided: boolean,
  isOpen: boolean,
  attendants: number,
  expenses: number,
  allergens: Chip[] | undefined,
  tags: Chip[] | undefined,
  banner: string,
}

export default function EditDinner(dinner: Dinner) {

  const classes = useStyles();
  const history = useHistory();

  const [credentials, setCredentials] = useState<Cred>({
    title: dinner.title,
    date: dinner.date,
    address: dinner.address,
    description: dinner.description,
    isDivided: dinner.isDivided,
    isOpen: dinner.isOpen,
    attendants: dinner.attendants.length,
    expenses: dinner.expenses,
    allergens: CreateChipArray(dinner.allergens.split(",")),
    tags: CreateChipArray(dinner.tags.split(",")),
    banner: '',
  })

  
  const [allergenInputValue, setAllergenInputValue] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'isDivided' || event.target.name === 'isOpen') {
      console.log(event.target.checked)
      setCredentials((credentials) => ({
        ...credentials,
        [event.target.name]: event.target.checked,
      }));
    }
    else {
      setCredentials((credentials) => ({
        ...credentials,
        [event.target.name]: event.target.value,
      }));
    }
  }

  const handleTagChange = (event: any, value: any) => {
    setCredentials({ ...credentials, tags: value as Chip[] });
  }

  const handleAllergenChange = (event: any, value: any) => {
    setCredentials({ ...credentials, allergens: value as Chip[] });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(credentials)
    event.preventDefault();
    const form = {
      ...credentials,
      allergens: credentials.allergens ? credentials.allergens.map(a => a.label).join(",") : "",
      tags: credentials.tags ? credentials.tags.map(t => t.label).join(",") : ""
    };

    client.service('dinners').patch(dinner.dinners_id, form)
      .then(async () => {
        SuccessAlert('Success!', "Dinner edited!", "Ok!");
        const updatedDinner: Dinner = await client.service('dinners').get(dinner.dinners_id);
        console.log(updatedDinner);
        history.push({
          pathname: `/dinner/${dinner.dinners_id}`,
          state: {
            dinnerFromLocation: updatedDinner
          }
        })
      })
      .catch((e: Error) => {
        console.log(e)
        ErrorAlert('Error!', e.message, 'Understand');
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
                  Edit Dinner
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
                      value={credentials.date}
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
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={credentials.isDivided} name="isDivided" color="primary" onChange={handleInputChange} />}
                        label="Split the bill"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={credentials.isOpen} name="isOpen" color="primary" onChange={handleInputChange} />}
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
                      onChange={handleInputChange}
                      value={credentials.expenses}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={allergies}
                  value={credentials.allergens}
                  inputValue={allergenInputValue}
                  onInputChange={(_, newInputValue) => {
                    setAllergenInputValue(newInputValue)
                  }}
                  onChange={handleAllergenChange}
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
                  options={tags}
                  freeSolo
                  value={credentials.tags}
                  inputValue={tagInputValue}
                  onInputChange={(_, newInputValue) => {
                    setTagInputValue(newInputValue)
                  }}
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
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ width: "100%" }}>
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  )
}
