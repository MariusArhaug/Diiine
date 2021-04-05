import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Dinner, User } from "../../types";
import client from "../../feathers-client";
import { useAuth } from "../../hooks/use-auth";
import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import DinnerCard from "../Dinners/DinnerCard";
import RatingDOM from '@material-ui/lab/Rating';

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(3),
      margin: "auto",
      maxWidth: 500,
      backgroundColor: "#ffffff",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

export default function Profile() {
  const classes = useStylesModified();
  const user: User = useAuth().user;
  const auth: any = useAuth();

  const [dinners, setDinners] = useState<Dinner[]>([]);

  useEffect(() => {
    // client
    //   .service("dinners")
    //   .find(user.user_id)
    //   .then((res: any) => {
    //     setDinners(res.data);
    //   })
    //   .catch((e: Error) => {
    //     console.log("error", e);
    //   });
  }, [user.user_id]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ textAlign: "center" }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Typography variant="h3" color="textPrimary">
              {user?.name}
            </Typography>
          </Grid>
          <Grid item>
            Average Rating: {user?.avg_rating}
            <RatingDOM
              name="average_rating"
              precision={0.1}
              value={user?.avg_rating}
              readOnly
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper} style={{ textAlign: "left" }}>
        <Grid
          container
          spacing={8}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <Grid item>
            <Typography variant="caption">Hangry yet?</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={async () => await auth.signout()}
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Log out
          </Button>
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              E-mail: {user?.email}
            </Typography>
          </Grid>

          {user?.allergies!.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2">
                Registered allergies:{" "}
                {user?.allergies?.split(",").join(", ")}
              </Typography>
            </Grid>
          )}
          <Grid item container spacing={1}>
            <Grid item>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
              >
                {dinners.length ?
                  dinners!.map((dinner: Dinner) => (
                    <Grid item key={dinner.dinners_id}>
                      <DinnerCard
                        {...dinner}
                        key={dinner.dinners_id}
                      />
                    </Grid>
                  )) : <Grid xs={12}>You have not created any dinner arrangments yet!</Grid>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
