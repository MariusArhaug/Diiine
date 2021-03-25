import { useState, useEffect } from "react";
import { User } from '../types';
import client from '../feathers-client'
import { Rating } from '../types';
import RatingDOM from '@material-ui/lab/Rating';
import { Grid } from '@material-ui/core';


export default function AverageRating(user: User) {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    client.service('rating')
      .find({ query: { rated_by: user.user_id } })
      .then((res: any) => {
        const ratings: Rating[] = res.data
        const ratingValues: number[] = ratings.map(a => a.rating_value);
        setAverage(ratingValues.reduce((a, acc) => acc + a) / ratings.length)
      })
      .catch((e: Error) => {
        console.log(e);
      })
  }, [average, user.user_id])

  return (
    <Grid>
      <RatingDOM
        name="simple-controlled"
        value={Math.round(average * 2) / 2}
        precision={0.1}
        readOnly
      />
      <div>Average rating: {average}</div>
    </Grid>
  )
}
