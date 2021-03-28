import React, { useState, useEffect } from "react";
import { Dinner, User } from '../../types';
import client from '../../feathers-client'
import { Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AdminCard from './AdminCard';

//Make a style on how the page is going to look
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
    }),
);

export default function Admin() {

    const classes = useStyles();
    //Update the User instead of the entire page when encountering an update
    const [users, setUsers] = useState([]);

    //const [dinners, setDinners] = useState({
    //    data: []
    //});

    useEffect(() => {
        client.service('users')
        .find({})
        .then((res: any) => {
            console.log(res.data);
            setUsers(res.data);
        })
        .catch((e: Error) => { console.log('error', e)})
    }, []);

    
    //useEffect(() => {
      //  client.service('dinners').find().then((response: any) => {
        //    setDinners(response);
        //})

    //}, []);

    //const populateUserCards = () => {

    //}

    return (
        <div className = {classes.root}>
            <Grid container spacing = {3} direction = 'column' justify = 'space-evenly' alignItems = 'stretch'> 
                {users.length && users!.map((user: User) => (
                    <Grid item key={user.user_id}>
                        <AdminCard {...user} key={user.user_id} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )




}
