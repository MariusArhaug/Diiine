import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Chat } from '../../types';

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(1),
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 200,
        },
    }),
);

export default function Message(props: {content: Chat, reciever: boolean}) {

    const classes = useStylesModified();

    const user = props.content.chat_from;

    const color: string = props.reciever ? "#D4F1DB" : "#FFFFFF";

    //Array of items (avatar and message content)
    let items = [
        <Grid item>
            <Paper className={classes.paper} style={{ textAlign: "left", backgroundColor: color }}>
                <Typography variant="body1">{props.content.message}</Typography>
            </Paper>
        </Grid>,
        <Grid item>
            <Avatar>{user.name.charAt(0)}</Avatar>
        </Grid>
    ];

    //Reverses order of items if not a reciever message
    items = props.reciever ? items : items.reverse();

    return (
        <Grid className={classes.container} container item xs={12} justify={props.reciever ? "flex-end" : "flex-start"}>
            <Grid spacing={1} justify={props.reciever ? "flex-end" : "flex-start"} container item alignItems="flex-end" >
                {items.map(item => item)}
            </Grid>
            <Grid item>
                <Typography variant="caption">Sent at: {props.content.created_at.toLocaleDateString()}</Typography>
            </Grid>
        </Grid>
        
    );
}

