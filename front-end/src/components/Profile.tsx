import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { Dinner, User } from "../types";
//import { useStyles } from '../styles';
import { Link as RouterLink, useHistory } from "react-router-dom";
import client from "../feathers-client";
import { useAuth } from "../hooks/use-auth";
import Rating from "@material-ui/lab/Rating";
import { UseControlledProps } from "@material-ui/core/utils/useControlled";
import { UserInfo } from "os";
import {
    Button,
    Container,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";
import DinnerCard from "./DinnerCard";

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

    console.log(user);
    const [dinners, setDinners] = useState<Dinner[]>([]);

    useEffect(() => {
        client
            .service("dinners")
            .find(user.user_id)
            .then((res: any) => {
                console.log(res.data);
                setDinners(res.data);
            })
            .catch((e: Error) => {
                console.log("error", e);
            });
    }, []);

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
                        <Rating
                            name="simple-controlled"
                            value={user?.avgRating}
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

                    {user?.allergies.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Registered allergies:{" "}
                                {user?.allergies.split(",").join(", ")}
                            </Typography>
                        </Grid>
                    )}

                    {/* <Grid item container spacing={1}>
              <Grid item>
              <Typography variant="body2">
                Upcoming dinner plans: 
              </Typography>
              </Grid>
            
          </Grid> */}

                    <Grid item container spacing={1}>
                        <Grid item>
                            {/* <Typography variant="body2">
                                My dinners:{" "}
                                {dinners.length &&
                                    dinners!.map(
                                        (dinner: Dinner) => dinner.name
                                    )}
                            </Typography> */}
                            <Grid
                                container
                                spacing={3}
                                direction="column"
                                justify="space-evenly"
                                alignItems="stretch"
                            >
                                {dinners.length &&
                                    dinners!.map((dinner: Dinner) => (
                                        <Grid item>
                                            <DinnerCard
                                                {...dinner}
                                                key={dinner.dinners_id}
                                            />
                                        </Grid>
                                    ))}
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
