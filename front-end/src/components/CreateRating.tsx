import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { Grid, Paper } from '@material-ui/core';
import { User } from '../types';
import NewRating from './NewRating';

export default function CreateRating(user: User) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.container}>
        <Typography variant="h6">Rating</Typography>
        <br />
        <Grid item xs>
          <NewRating {...user} />
        </Grid>
      </Paper>
    </Grid>
  )
}