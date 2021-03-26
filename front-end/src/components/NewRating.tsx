import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import RatingDOM from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import client from '../feathers-client';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { User } from '../types';
import swal from 'sweetalert';
import '../styles/App.css';
import Box from '@material-ui/core/Box';

const styledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})

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


export default function CustomizedRatings(props: User) {

  const [hover, setHover] = React.useState(-1);
  const [newRating, setNewRating] = useState<{
    rated_of: number;
    rating_value: number;
    description: string;
  }>({
    rated_of: props.user_id,
    rating_value: 2.5,
    description: '',
  })


  const handleRatingChange = (event: any): void => {
    setNewRating({ ...newRating, rating_value: event.target.value })
  }

  const handleDescriptionChange = (event: any): void => {
    setNewRating({ ...newRating, description: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(newRating);

    client.service('rating').create(newRating)
      .catch((e: Error) => {
        console.log('couldn\'t post rating', e)
      });
    swal({
      title: 'Good job!',
      text: 'You have now sucessfully rated this user!',
      icon: 'success',
      buttons: {
        confirm: {
          text: `Your description: ${newRating!.description}`,
          className: "buttonStyle"
        }
      }
    });
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
              precision={0.1}
              value={newRating.rating_value}
              onChange={handleRatingChange}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            {newRating.rating_value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='comment'
              label='Type user comment'
              className='form-field'
              type='comment'
              name='description'
              style={{ width: "100%" }}
              multiline
              rowsMax={4}
              variant="outlined"
              onChange={handleDescriptionChange}
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