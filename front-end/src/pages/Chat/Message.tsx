import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

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

export default function Message(props: {content: string, reciever: boolean}) {

    const classes = useStylesModified();

    const color: string = props.reciever ? "#D4F1DB" : "#FFFFFF";

    //Array of items (avatar and message content)
    let items = [
        <Grid item>
            <Paper className={classes.paper} style={{ textAlign: "left", backgroundColor: color }}>
                <Typography variant="body1">{props.content}</Typography>
            </Paper>
        </Grid>,
        <Grid item>
            <Avatar>H</Avatar>
        </Grid>
    ];

    //Reverses order of items if not a reciever message
    items = props.reciever ? items : items.reverse();

    return (
        <Grid className={classes.container} container item xs={12} spacing={1} alignItems="flex-end" justify={props.reciever ? "flex-end" : "flex-start"}>
            {items.map(item => item)}
        </Grid>
    );
}

