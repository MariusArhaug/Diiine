import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useStyles } from '../styles';
import { Avatar, Chip, Grid, Paper, Tooltip } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useParams } from 'react-router-dom';
import { Dinner, User } from '../types';
import client from '../feathers-client';
import Rating from '@material-ui/lab/Rating';

// {dinnerId, name, address, type, allergens, attendants, date}: DinnerProps

export default function DinnerPage() {

    const classes = useStyles();
    let { dinnerId }: { dinnerId: string } = useParams();
    const [ratingValue, setRatingValue] = useState(0);

    const [dinners, setDinners] = useState([]);

    let dinner: Dinner = dinners[0];

    useEffect(() => {
        //Find dinner that we clicked on
        client.service('dinners')
            .get(dinnerId)
            .then((res: never) => {
                const temp: never[] = [res]
                setDinners(temp);
            })
            .catch((e: Error) => { console.log('error', e); })
        //Check if user has joined or not
        /*client.service('attendingDinners')
            .get(user_id)
            .then((res: never) => {
            
            })*/
    }, []);

    return (
        <div>
            <Paper className={classes.spacer} style={{ textAlign: "left" }}>
                {dinners.length &&
                    <Grid container spacing={3} direction="row" alignItems="stretch">
                        
                        {/*---------------HEADER IMG-------------------------*/}
                        <Grid item xs={12}>
                            <Paper className={classes.dinnerImage} />
                        </Grid>

                        <Grid item xs={12} container justify="space-between" alignItems="center">

                            <Grid xs item style={{ textAlign: "left" }}>
                                <Typography variant="caption" color="textSecondary">
                                    {dinner.address}
                                </Typography>
                                {/*---------------DINNER NAME ETC-------------------------*/}
                                <Typography variant="h4">{dinner.name}</Typography>
                                <Grid item container spacing={1} justify="flex-start">
                                    {dinner.tags.split(',').map(a => (
                                        <Grid item>
                                            <Chip size="small" label={a} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            
                            {/*---------------DATE / PRIVATE DINNER-------------------------*/}
                            <Grid xs item container alignItems="center" justify="flex-end">
                                <Grid item container spacing={1} alignItems="center" justify="flex-end">
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            {dinner.isOpen ? "Open dinner" : "Private dinner"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {dinner.isOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={1} alignItems="center" justify="flex-end">
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            {dinner.date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <EventIcon />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        
                        {/*-------------------------DETAILS-------------------------*/}
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.container}>
                                <Typography variant="h6" className={classes.textIcon}>Details</Typography>

                                <Grid container spacing={1} alignItems="center" justify="flex-start">
                                    <Grid item><GroupIcon /></Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            Number of attendants: {dinner.attendants}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                                {/* Attendants */}
                                {/* Need to update attendants-type in back-end
                                <AvatarGroup max={3} className={classes.avatarGroup}>
                                    dinner.attendants.map((a: User) => (
                                            <Tooltip title={a.name} placement="bottom">
                                                <Avatar>{a.name.charAt(0)}</Avatar>
                                            </Tooltip>
                                        )

                                    )
                                </AvatarGroup> 
                                    */}

                                {/* <Grid container spacing={1} alignItems="center" justify="flex-start">
                                    <Grid item><EventIcon /></Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            Date: {new Date(dinner.date).toDateString()}
                                        </Typography>
                                    </Grid>
                                </Grid> */}

                                <Grid container spacing={1} alignItems="center" justify="flex-start">
                                    <Grid item><LocalHospitalIcon /></Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            Allergens: {dinner.allergens.split(',').join(', ')}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Grid>
                        {/*------------------------------INGREDIENTS--------------------- */}
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.container}>
                                <Typography variant="h6">Ingredients</Typography>
                                <Typography variant="body1">{dinner.ingredients}</Typography>
                            </Paper>
                        </Grid>
                        {/*------------------------------DESCRIPTION--------------------- */}
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.container}>
                                <Typography variant="h6">Description</Typography>
                                <Typography variant="body1">{dinner.description}</Typography>
                            </Paper>
                        </Grid>
                        {/*------------------------------RATING--------------------- */}
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.container}>
                                <Typography variant="h6">Rating</Typography>
                                <Typography variant="body1">
                                <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    onChange={undefined/*(event, newValue) => {
                                        setRatingValue(newValue);
                                      }*/}
                                    />
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </div>
    )
}