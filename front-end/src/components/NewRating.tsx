import React, { useState } from 'react';
import RatingDOM from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import client from '../feathers-client';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Rating } from '../types';
import '../styles/App.css';
import Box from '@material-ui/core/Box';
import { useAuth } from '../hooks/use-auth';
import { SuccessAlert, ErrorAlert } from '../hooks/Alerts';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


export default function CustomizedRatings(props: any) {
  const [hover] = useState(-1);
  const [newRating, setNewRating] = useState<Rating>({
    rated_of: props.value,
    rated_by: useAuth().user,
    rating_value: 2.5,
    description: '',
  })

  const handleInputChange = (event: any): void => {
    setNewRating((prevRating) => ({
      ...prevRating,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newRating.description === '') {
      ErrorAlert('Error!', 'You must fill in a rating description', 'Ok');
      return;
    }
    const data = {
      rated_of: newRating.rated_of.user_id,
      rated_by: newRating.rated_by.user_id,
      rating_value: newRating.rating_value,
      description: newRating.description,
    }
    client.service('rating').create(data)
      .then(() => {
        SuccessAlert('Good job!',
          `You have now sucessfully rated this user! \n Your description: ${data!.description}`,
          'Done')
        props.onChange(newRating);
      })
      .catch((e: Error) => ErrorAlert('Error!', e.message, 'Ok'));
  }
  return (
    <div>
      <form method='POST' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="legend">Give user rating</Typography>
          </Grid>
          <Grid item xs={12}>
            <RatingDOM
              name="rating_value"
              precision={0.5}
              value={newRating.rating_value}
              onChange={handleInputChange}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            {newRating.rating_value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : newRating.rating_value]}</Box>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='comment'
              label='Type user comment'
              className='form-field'
              type='comment'
              name='description'
              value={newRating.description}
              style={{ width: "100%" }}
              multiline
              rowsMax={4}
              variant="outlined"
              onChange={handleInputChange}
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
              Give rating
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}