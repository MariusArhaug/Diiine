import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
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
import { Avatar } from "@material-ui/core";

const useStylesModified = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      padding: "40px",
      margin: "auto",
      maxWidth: 500,
      backgroundColor: "#b3cbb9",
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
    center: {
      colorDefault: "5e565a",
      root: "5e565a",
      margin: "auto",
      padding: "20px",
      borderStyle: "solid",
      borderBlockColor: "ffffff"
    },
    button: {
      color: '#512D38',
      padding: "5px"
    },
    typo: {
      padding: "5px"
    }
  })
);

export default function Profile() {
  const classes = useStylesModified();
  const user: User = useAuth().user;
  const auth: any = useAuth();

  const [dinners, setDinners] = useState<Dinner[]>([]);

  useEffect(() => {
    client
      .service("dinners")
      .find(user.user_id)
      .then((res: any) => {
        setDinners(res.data);
      })
      .catch((e: Error) => {
        console.log("error", e);
      });
  }, [user.user_id]);

  return (
    <div className={classes.root}>
      <Grid item container>
        <Grid item xs={6}>
          <p className={classes.typo} />
          <Paper className={classes.paper} style={{ textAlign: "center" }}>
            <Avatar className={classes.center} src={user.avatar} sizes="large">
              {user.avatar ? "" : user.name[0].toUpperCase()}
            </Avatar>
            <Typography variant="h4" color="textPrimary" className={classes.typo}>
              {user?.name}
            </Typography>
            <Typography className={classes.typo} variant="body1">
              E-mail: {user?.email}
            </Typography>
            <p>{' '}</p>
            <Typography className={classes.typo}>
            Average Rating: {user?.avg_rating}
              <RatingDOM
                name="average_rating"
                precision={0.1}
                value={user?.avg_rating}
                readOnly
              />
            </Typography>

            {user?.allergies!.length > 0 && (
            <Grid item xs={12}>
              <Typography className={classes.typo} variant="body2">
                Registered allergies:{" "}
                {user?.allergies?.split(",").join(", ")}
              </Typography>
            </Grid>
            )}
            <p className={classes.typo} />
            <Button
              className={classes.button}
              onClick={async () => await auth.signout()}
              type="submit"
              variant="contained"
              style={{ width: "30%" }}
            >
              Log out
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            Your dinner plans:
          </Typography>
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
    </div>
  );
}
