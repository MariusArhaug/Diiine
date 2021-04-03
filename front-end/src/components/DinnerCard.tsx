import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Dinner } from '../types';
//import { useStyles } from '../styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      margin: 'auto',
      maxWidth: 500,
      // backgroundColor: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.1s ease",
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

export default function ListComponent(props: Dinner) {

  const classes = useStylesModified();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/dinner/' + props.dinners_id), [history]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ textAlign: "left" }} onClick={handleOnClick}>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {props.address}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5">
              {props.title}
            </Typography>
          </Grid>


          {props.allergens.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2">
                Allergens: {props.allergens.split(',').join(', ')}
              </Typography>
            </Grid>
          }

          <Grid item container spacing={1}>
            {props.tags.split(',').map(a => (
              <Grid item key={a.charCodeAt(0)}>
                <Chip size="small" label={a} />
              </Grid>
            ))}
          </Grid>

        </Grid>

      </Paper>
    </div>
  );
}

