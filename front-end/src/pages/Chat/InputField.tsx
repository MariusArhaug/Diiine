import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { SendRounded } from '@material-ui/icons';

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(1) ,
            "& > *": {
                margin: theme.spacing(1)
            }
        },
        paper: {
            padding: "0 " +theme.spacing(2),
            margin: 'auto',
            maxWidth: 200,
        },
    }),
);

export default function InputField() {

    const classes = useStylesModified();

    return (
        <Grid 
            container
            alignItems="center"
            justify="space-between"
            className={classes.container}
        >
            <Grid item xs>
            <TextField
                id="textarea"
                placeholder="Type message..."
                multiline
                rowsMax={3}
                // variant="outlined"
                style={{width: "100%"}}
                />
            </Grid>
            <Grid item>
                <IconButton color="primary">
                    <SendRounded />
                </IconButton>
            </Grid>
        </Grid>
    );
}

