import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { Grid, Paper } from '@material-ui/core';
import { User, Rating } from '../types';
import NewRating from './NewRating';
import { useEffect, useState } from 'react';
import RatingCard from './RatingCard';
import client from '../feathers-client';

export default function RatingContainer(user: User) {
  const classes = useStyles();
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    client.service('rating')
      .find({ query: { rated_of: user.user_id } })
      .then((res: any) => {
        setRatings([...res.data])
      })
  }, [user.user_id])

  const handleChange = (newValue: Rating) => {
    setRatings(prev => [...prev, newValue])
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.container}>
        <Typography variant="h6">
          Rating
        </Typography>
        <br />
        <Grid item xs>
          <NewRating value={user} onChange={handleChange} />
        </Grid>
        <Grid>
          {ratings.length && ratings!.map((rating: Rating) => (
            <Grid item>
              <RatingCard {...rating} key={rating.rating_id} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  )
}