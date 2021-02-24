import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { Dinner, User } from '../types';
//import { useStyles } from '../styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import client from '../feathers-client';
import { useAuth } from '../hooks/use-auth';

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

const user1: User = {
    userId: 10,
    name: "Olivia Olsen",
    address: "Gregus gate 8",
    email: "olivia@gmail.com",
    isAdmin: false,
    allergies: ["nuts", "milk"]
}

const temp: Dinner = {
    dinners_id: 1,
    owner: user1,
    name: "Italiensk aften",
    description: "Pasta, vin og sorbet",
    address: "Angelltrøvegen 3, 7048 Trondheim",
    tags: "Meat,Pasta,Wine, Dessert",
    allergens: "Gluten",
    ingredients: "",
    isOpen: true,
    attendants: [],
    maxAttendants: 10,
    date: new Date(2021, 2, 24, 19, 3)
}

export default function Profile() {
  const classes = useStylesModified();

  // const user: User = useAuth().user;

  // console.log(user);

  const [user, setUser] = useState(null)

  useEffect(() => {
    //Find dinner that we clicked on
    client.service('users')
      .get()
      .then((res: any) => {
        setUser(res);
      })
      .catch((e: Error) => { console.log('error', e); })
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ textAlign: "left" }}>
        <Grid container spacing={1}>

          <Grid item>
            <Typography variant="h5">
              {user?.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              Address: {user?.address}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1">
              E-mail: {user?.email}
            </Typography>
          </Grid>

          {user?.allergies.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2">
                Registered allergens: {user?.allergies.join(', ')}
              </Typography>
            </Grid>
          }
        </Grid>
      </Paper>

      <h1>
        Upcoming dinner plans:
        </h1>

      <Paper className={classes.paper} style={{ textAlign: "left" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {temp.address}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5">
              {temp.name}
            </Typography>
          </Grid>

          <Grid item container spacing={1}>
            <Typography variant="subtitle1">
              Date and time: {temp.date.toString}
            </Typography>
          </Grid>

          <Grid item container spacing={1}>
            {temp.tags.split(',').map(a => (
              <Grid item>
                <Chip size="small" label={a} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}