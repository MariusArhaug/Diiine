import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { User, Rating } from '../types';
import { useState } from 'react';
import RatingDOM from '@material-ui/lab/Rating';

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: "#ffffff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#fafafa"
      }
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

export default function RatingCard(rating: Rating) {

  const classes = useStylesModified();
  const [state] = useState<Rating>(rating);
  const [ratedBy] = useState<User>(rating.rated_by)


  return (
    <Paper className={classes.paper} style={{
      textAlign: "left", cursor: "default", marginTop: 10
    }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">
            Rated by: {ratedBy.name} @:{ratedBy.email}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {state.description}
          </Typography>
          <RatingDOM
            name="rating_value"
            precision={0.5}
            value={state.rating_value}
            readOnly
          />
        </Grid>
      </Grid>
    </Paper >
  );
}


