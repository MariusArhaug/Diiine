import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { User } from '../types';
import client from '../feathers-client';
import { useEffect, useState } from 'react';

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

export default function RatingCard(user: User) {

  const classes = useStylesModified();
  const [userRating, setUserRating] = useState<User>(user);

  useEffect(() => { })


  return (
    <Paper className={classes.paper} style={{ textAlign: "left" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">
            User: {userRating.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            Rating Description: { }
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}


