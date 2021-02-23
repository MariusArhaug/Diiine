import {Grid} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Dinner } from '../types';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: "#ffffff"
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
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      marginRight: 'auto'
    }
  }),
);

export default function ListComponent(props: Dinner) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    {props.name}
                  </Typography>
                <Grid item>
                <Avatar alt="Illustrasjon" src="/static/images/avatar/1.jpg" className={classes.large} />
                </Grid>
                  <Typography variant="body2" gutterBottom>
                    {props.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.allergens}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="button" color="initial" style={{cursor: 'pointer' }}>
                    Join
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{props.type}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        </div>
    );}
