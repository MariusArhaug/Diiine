import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { TypeMessage, User } from "../../types";
import client from "../../feathers-client";
import { useAuth } from "../../hooks/use-auth";

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(1),
        },
        paper: {
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: 200,
        },
    })
);

export default function Message(props: { content: TypeMessage }) {
    const classes = useStylesModified();

    const user = useAuth().user;
    const senderId = props.content.chat_from;
    const amSender = user.user_id === senderId ? true : false;

    const [sender, setSender] = useState<User | undefined>(undefined);

    useEffect(() => {
        client
            .service("users")
            .get(senderId)
            .then((res: any) => {
                setSender(res);
            });
    }, []);

    const color: string = amSender ? "#D4F1DB" : "#FFFFFF";

    //Array of items (avatar and message content)
    let items = [
        <Grid item key="chat-content">
            <Paper
                className={classes.paper}
                style={{ textAlign: "left", backgroundColor: color }}
            >
                <Typography variant="body1">{props.content.message}</Typography>
            </Paper>
        </Grid>,
        <Grid item key="chat-avatar">
            <Avatar>{(sender) ? sender.name[0].toUpperCase() : "X"}</Avatar>
        </Grid>,
    ];

    //Reverses order of items if not a reciever message
    items = amSender ? items : items.reverse();

    return (
        <Grid
            className={classes.container}
            container
            item
            xs={12}
            justify={amSender ? "flex-end" : "flex-start"}
        >
            <Grid
                spacing={1}
                justify={amSender ? "flex-end" : "flex-start"}
                container
                item
                alignItems="flex-end"
            >
                {items}
            </Grid>
            <Grid item>
                <Typography variant="caption">
                    Sent at: {props.content.created_at}
                </Typography>
            </Grid>
        </Grid>
    );
}
