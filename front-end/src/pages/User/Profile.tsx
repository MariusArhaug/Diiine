import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { Dinner, User } from '../../types';
//import { useStyles } from '../styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import client from '../../feathers-client';
import { useAuth } from '../../hooks/use-auth';

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    paper: {
      padding: theme.spacing(3),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: "#ffffff",
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

export default function Profile() {
  const classes = useStylesModified();

  const user: User = useAuth().user;

  console.log(user);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ textAlign: "left" }}>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            <Typography variant="h5">
              {user?.name}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="body1">
              E-mail: {user?.email}
            </Typography>
          </Grid>

          {user?.allergies.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2">
                Registered allergies: {user?.allergies.split(',').join(', ')}
              </Typography>
            </Grid>
          }
        </Grid>
      </Paper>
    </div>
  );
}