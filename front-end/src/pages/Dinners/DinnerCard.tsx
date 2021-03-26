import { Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Dinner, User } from '../../types';
import { useHistory } from 'react-router-dom';
import client from '../../feathers-client';
import React, { useEffect, useState } from 'react';

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

export default function DinnerCard(dinner: Dinner) {

  const classes = useStylesModified();
  const componentName = "DinnerCard"
  const [owner, setOwner] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    client.service('users')
      .get(dinner.user_id)
      .then((res: User) => {
        setOwner(res);
      })
      .catch((e: any) => console.log(e))
  }, [dinner.user_id])

  const handleOnClick = () => {
    history.push({
      pathname: `/dinner/${dinner.dinners_id}`,
      state: {
        dinner: dinner,
        dinner_owner: owner,
      },
    })
  }

  return (
    <div className={`${classes.root}  ${componentName}`}>
      <Paper className={classes.paper} style={{ textAlign: "left" }} onClick={handleOnClick}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" className="dinnerInfo">
              {dinner.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="dinnerInfo">
              {dinner.title}
            </Typography>
          </Grid>
          {dinner.allergens.length > 0 &&
            <Grid item xs={12}>
              <Typography variant="body2" className="dinnerInfo">
                Allergens: {dinner.allergens.split(',').join(', ')}
              </Typography>
            </Grid>
          }
          <Grid item container spacing={1}>
            {dinner.tags.split(',').map(a => (
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

