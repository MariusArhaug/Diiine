import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useStyles } from '../styles';
import { Avatar, Button, Chip, Grid, Paper, Tooltip } from '@material-ui/core';
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
import NewRating from './NewRating';
//import Button from '@material-ui/core/Button';

// {dinnerId, name, address, type, allergens, attendants, date}: DinnerProps

export default function DinnerPage() {

    const classes = useStyles();
    let { dinnerId }: { dinnerId: string } = useParams();
    const [ratingValue, setRatingValue] = useState(0);

    const [state, setState] = useState<{owner: User | null, dinner: Dinner | null}>({
        owner: null,
        dinner: null
    });


    const handleJoinDinner = () => {
        console.log("lol");
        const data = {
            dinners_id: parseInt(dinnerId,10)
        }
        //console.log(data);
        client.service('attendingdinners').create(data)
        alert("You have now joined the dinner!");
    }

    useEffect(() => {
        //Find dinner that we clicked on
        let dinner: Dinner;
        client.service('dinners')
            .get(dinnerId)
            .then((resDinner: Dinner) => {
                dinner = resDinner;
                client.service('users')
                    .get(dinner.user_id)
                    .then((resOwner: User) => {
                        setState({dinner: resDinner, owner: resOwner})
                    })
            })
            .catch((e: Error) => { console.log('error', e); })
    }, []);

    console.log(state)

    return (
        <div className={classes.spacer}>
            <Paper className={classes.spacer} style={{ textAlign: "left" }}>
                {state.dinner && state.owner &&
                    <Grid container spacing={3} direction="row" alignItems="stretch">

                        {/*---------------HEADER IMG-------------------------*/}
                        <Grid item xs={12}>
                            <Paper className={classes.dinnerImage} style={
                                {backgroundImage: "URL('https://image.freepik.com/free-photo/thanksgiving-celebration_53876-73751.jpg')",
                                backgroundSize: "cover"}} />
                        </Grid>

                        <Grid item xs={12} container justify="space-between" alignItems="center">

                            <Grid xs item style={{ textAlign: "left" }}>
                                <Typography variant="caption" color="textSecondary">
                                    {state.dinner.address}
                                </Typography>
                                {/*---------------DINNER NAME ETC-------------------------*/}
                                <Typography variant="h4">{state.dinner.name}</Typography>
                                <Grid item container spacing={1} justify="flex-start">
                                    {state.dinner.tags.split(',').map(a => (
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
                                            {state.dinner.isOpen ? "Open dinner" : "Private dinner"}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {state.dinner.isOpen ? <LockOpenIcon /> : <LockOutlinedIcon />}
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={1} alignItems="center" justify="flex-end">
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            {state.dinner.date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <EventIcon />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} container>
                            <Paper className={classes.container} style={{width: "100%"}}>
                                <Grid item xs={12} container justify="space-between" alignItems="center">
                                    <Grid item xs spacing={1} container alignItems="center">
                                        <Grid item>
                                            <Typography>
                                                Arranger: {state.owner.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Rating
                                                name="simple-controlled"
                                                //value={state.owner.avg_rating}
                                                value={4}
                                                readOnly
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={handleJoinDinner}>
                                            Join dinner
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        
                        

                        <Grid item container xs={12} md={6} spacing={3}>
                            {/*-------------------------DETAILS-------------------------*/}
                            <Grid item xs={12}>
                                <Paper className={classes.container}>
                                    <Typography variant="h6" className={classes.textIcon}>Details</Typography>

                                    <Grid container spacing={1} alignItems="center" justify="flex-start">
                                        <Grid item><GroupIcon /></Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                Number of attendants: {state.dinner.attendants}
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
                                                Allergens: {state.dinner.allergens.split(',').join(', ')}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Paper>
                            </Grid>

                            {/*------------------------------Rating--------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.container}>
                                    <Typography variant="h6">Rating</Typography>
                                    <br/>
                                    <Grid item xs>
                                        <NewRating {...state.owner}/>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        

                        <Grid item container spacing={3} xs={12} md={6}>
                            {/*------------------------------DESCRIPTION--------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.container}>
                                    <Typography variant="h6">Description</Typography>
                                    <Typography variant="body1">
                                        {state.dinner.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </div>
    )
}

