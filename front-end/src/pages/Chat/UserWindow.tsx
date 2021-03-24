import { User } from "../../types";
import {
    Container,
    Grid,
    makeStyles,
    Avatar,
    Paper,
    Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
        height: "600px",
        width: "30vw",
        backgroundColor: "red",
    },

    paper: { margin: "auto", maxWidth: 200, padding: '1rem' },
    avatar: {
        margin: "5px",
        padding: 0,
        backgroundColor: 'green'
    }
});

export default function UserWindow(props: any) {
    const users = props.users;
    const classes = useStyles();

    const populateUsers = (user: User) => {
        return (
            <div key={user.user_id} onClick={props.onUserClick(user.user_id)}>
                <Grid container direction="row" alignContent='center'>
                    <Grid item className={classes.avatar}>
                        <Avatar src={user.avatar}>
                            {user.avatar ? "" : user.name[0].toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Paper
                            className={classes.paper}
                            style={{
                                textAlign: "left",
                                backgroundColor: "blue",
                            }}
                        >
                            <Typography variant="body1">{user.name}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <h2>
                Number of users: <span>{users.length}</span>
            </h2>
            {users.map((e: User) => populateUsers(e))}
        </div>
    );
}
