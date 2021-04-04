import { User } from "../../types";
import {
    Container,
    Grid,
    makeStyles,
    Avatar,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { MouseEventHandler } from "react";
import { useAuth } from "../../hooks/use-auth";
import Scrollbars from "react-custom-scrollbars";

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
        // height: "600px",
        // width: "100%",
        backgroundColor: "#ffffff"
    },
    user: {
        margin: "auto",
        padding: '1rem',
        cursor: "pointer",
        textAlign: "left",
        transition: "background-color 0.1s ease",
        "&:hover": {
            backgroundColor: "#fafafa"
        },
    },
    avatar: {
        marginRight: "1rem",
        padding: 0,
    }
});

type Props = {
    users: User[];
    onUserClick: (userId: number) => void;
}

export default function UserWindow(props: Props) {
    const users = props.users;
    const classes = useStyles();
    const loggedInUser = useAuth().user;

    const populateUsers = (user: User) => {
        return (
            <Paper elevation={0} key={user.user_id} onClick={() => props.onUserClick(user.user_id)} className={classes.user}>
                <Grid container direction="row" alignItems='center'>
                    <Grid item className={classes.avatar}>
                        <Avatar src={user.avatar}>
                            {user.avatar ? "" : user.name[0].toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="body1">
                            {user.user_id == loggedInUser.user_id ? "You" : user.name}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    return (
        <div className={classes.root}>
            <Typography variant="h6">
                Chats
                {/* Number of users: <span>{users.length}</span> */}
            </Typography>
            <Scrollbars
                // ref={messageEl}
                autoHide
                style={{ width: "100%", height: 660 }}
                renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
            >
                {users.map((e: User) => populateUsers(e))}
            </Scrollbars>
            
        </div>
    );
}
