import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { User, Dinner } from '../../types';
import '../../styles/App.css';
import { useAuth } from '../../hooks/use-auth';
import DeleteButton from '../Admin/DeleteButton'
import client from '../../feathers-client';
import { AttendingDinner } from '../../types';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      position: 'absolute',
      top: 100,
      left: 100,
      boxShadow: theme.shadows[5],
      width: 400,
      maxWidth: 500,
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#fafafa'
      }
    },
  }));

export default function UserCard({ user, dinner }: { user: User, dinner: Dinner }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1} justify="space-between" xs={12}>
          <Grid item xs={2}>
            <Typography variant='caption' color='textSecondary' className='userInfo' align='center'>
              ID: {user.user_id}
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant='body2' className='userInfo' align='center'>
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2' className='userInfo' align='center'>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
