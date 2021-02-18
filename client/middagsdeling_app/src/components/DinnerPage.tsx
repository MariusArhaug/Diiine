import React from 'react';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useStyles } from '../styles';
import { Avatar, Paper, Tooltip } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import GroupIcon from '@material-ui/icons/Group';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useParams } from 'react-router-dom';
import { Dinner } from '../types';
import { shadows } from '@material-ui/system';

const User1 = {
    userId: 1,
    name: "Name Nameson",
    address: "Fake address",
    email: "name@nameson.com",
    isAdmin: false,
    allergies: []
}
const User2 = {
    userId: 2,
    name: "Namea Nameson",
    address: "Fake address",
    email: "namea@nameson.com",
    isAdmin: false,
    allergies: []
}
const User3 = {
    userId: 3,
    name: "Babe Nameson",
    address: "Fake address",
    email: "nameb@nameson.com",
    isAdmin: false,
    allergies: []
}


const fakeDinner1 = {
    dinnerId: 1,
    name: "Title",
    owner: User1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    address: "Fake address",
    type: "Vegan",
    allergens: ["Lactose", "Gluten"],
    attendants: [User1, User2, User3],
    date: new Date(),
    ingredients: [
        { name: "Flour", price: 25.99 },
        { name: "Water", price: 0 }
    ]
}

const getDinner = (id: string) => {
    return fakeDinner1;
}

// {dinnerId, name, address, type, allergens, attendants, date}: DinnerProps

export default function DinnerPage() {

    const classes = useStyles();
    let { id }: { id: string } = useParams();

    const dinner: Dinner = getDinner(id);

    return (
        <Paper className={classes.flexerVertical} style={{ textAlign: "left" }}>

            <div>
                <Paper className={classes.dinnerImage} />
            </div>

            <div className={classes.flexerHorizontal}>
                <Typography variant="h4">{dinner.name}</Typography>

                <Typography variant="subtitle2" className={classes.textIcon}>
                    <LockOutlinedIcon />
                    Private dinner
                </Typography>

            </div>


            <div className={classes.flexerHorizontal}>

                <Paper className={classes.container} style={{ width: "70%" }}>
                    <Typography variant="h6" className={classes.textIcon}>Details</Typography>

                    <Typography variant="subtitle1" className={classes.textIcon}>
                        <GroupIcon />
                        <span>Number of addendants: {dinner.attendants.length}</span>
                    </Typography>

                    <AvatarGroup max={5} style={{ paddingLeft: "30px" }}>
                        {dinner.attendants.map(
                            a => (
                                <Tooltip title={a.name}>
                                    <Avatar style={{ width: "30px", height: "30px", border: "1px solid gray" }}>{a.name.charAt(0)}</Avatar>
                                </Tooltip>
                            )

                        )}
                    </AvatarGroup>
                    <Typography variant="subtitle1" className={classes.textIcon}>
                        <PlaceIcon />
                        <span>Address: {dinner.address}</span>
                    </Typography>
                    <Typography variant="subtitle1" className={classes.textIcon}>
                        <EventIcon />
                        <span>Date: {dinner.date.toDateString()}</span>
                    </Typography>

                    <Typography variant="subtitle1" className={classes.textIcon}>
                        <LocalHospitalIcon />
                        <span>Allergens: {dinner.allergens.join(', ')}</span>
                    </Typography>

                </Paper>
                <Paper className={classes.container} style={{ width: "30%" }}>
                    <Typography variant="h6">Ingredients</Typography>
                    {dinner.ingredients.map(i => (
                        <Typography variant="subtitle1">{i.name + ": " + i.price + " kr"}</Typography>
                    ))}
                </Paper>
            </div>

            <div className={classes.flexerHorizontal}>
                <Paper className={classes.container}>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body1">{dinner.description}</Typography>
                </Paper>

                <Paper className={classes.container}>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body1">{dinner.description}</Typography>
                </Paper>
            </div>

            <div >

            </div>
        </Paper>
    )
}