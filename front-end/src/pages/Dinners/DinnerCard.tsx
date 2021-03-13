import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Dinner } from '../../types';
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

export default function ListComponent(props: Dinner) {

  const classes = useStylesModified();
  const componentName = "DinnerCard"
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/dinner/' + props.dinners_id), [history]);

  return (
    <div className={`${classes.root}  ${componentName}`}>
      <Paper className={classes.paper} style={{ textAlign: "left" }} onClick={handleOnClick}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" className="dinnerInfo">
              {props.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="dinnerInfo">
              {props.name}
            </Typography>
          </Grid>

          {props.allergens.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2" className="dinnerInfo">
                Allergens: {props.allergens.split(',').join(', ')}
              </Typography>
            </Grid>
          }

          <Grid item container spacing={1}>
            {props.tags.split(',').map(a => (
              <Grid item className="dinnerInfo">
                <Chip size="small" label={a} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

