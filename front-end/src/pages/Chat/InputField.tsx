import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { SendRounded } from '@material-ui/icons';
import client from '../../feathers-client';

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(1),
            "& > *": {
                margin: theme.spacing(1)
            }
        },
        paper: {
            padding: "0 " + theme.spacing(2),
            margin: 'auto',
            maxWidth: 200,
        },
    }),
);

export default function InputField() {

    const classes = useStylesModified();

    const [chat, setChat] = useState({
        chat_from: '58',
        chat_to: '82',
        message: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChat((chat) => ({
            ...chat,
            message: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const result = await client.service('chat').create(chat);
        console.log(result);

    }

    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.container}
        >
            <form method='POST' onSubmit={handleSubmit}>
                <Grid item xs>
                    <TextField
                        id="message"
                        type='text'
                        name='message'
                        value={chat.message}
                        placeholder="Type message..."
                        multiline
                        rowsMax={3}
                        // variant="outlined"
                        style={{ width: "100%" }}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <IconButton 
                        color="primary" 
                        type='submit'>
                        <SendRounded />
                    </IconButton>
                </Grid>
            </form>
        </Grid>
    );
}

