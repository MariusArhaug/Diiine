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

type Props = {
    message: TypeMessage;
    user: User;
    partner: User;

}

export default function Message(props: Props) {
    const classes = useStylesModified();
    const message = props.message;
    const user = props.user;
    const partner = props.partner
    

    const amSender = (user.user_id == message.chat_from) ? true : false;

    const [sender, setSender] = useState<User | undefined>(undefined);

    const color: string = amSender ? "#D4F1DB" : "#FFFFFF";

    //Array of items (avatar and message content)
    let items = [
        <Grid item key="chat-content">
            <Paper
                className={classes.paper}
                style={{ textAlign: "left", backgroundColor: color }}
            >
                <Typography variant="body1">{message.message}</Typography>
            </Paper>
        </Grid>,
        <Grid item key="chat-avatar">
            <Avatar src={amSender ? user.avatar : partner.avatar}>{amSender ? user.name[0].toUpperCase() : partner.name[0].toUpperCase()}</Avatar>
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
                    Sent at: {message.created_at} -
                    Sent from: {message.chat_from} -
                    {amSender? 'true':'false'}
                </Typography>
            </Grid>
        </Grid>
    );
}
