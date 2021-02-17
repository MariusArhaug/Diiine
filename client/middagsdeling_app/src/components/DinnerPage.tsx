import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useParams } from 'react-router-dom';

type Dinner = {
    dinnerId: number;
    name: string;
    description: string;
    address: string;
    type: string;
    allergens: string[];
    attendants: number;
    date: Date;
    ingredients: {
        name: string;
        price: number;
    }[];
}

const fakeDinner1 = {
    dinnerId: 1,
    name: "Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    address: "Fake address",
    type: "Type",
    allergens: ["Lactose", "Gluten"],
    attendants: 10,
    date: new Date(),
    ingredients: [
        {name: "Flour", price: 25.99},
        {name: "Water", price: 0}
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
        <Paper className={classes.flexerVertical} style={{textAlign: "left"}}>

            <div>
                <Paper className={classes.dinnerImage} />
            </div>

            <div className={classes.flexerHorizontal}>
                <Typography variant="h4">{dinner.name}</Typography>

                <Typography variant="subtitle2" style={{display:"flex", alignItems: "center"}}>
                    <LockOutlinedIcon />
                    Private dinner
                </Typography>

            </div>

            
            <div className={classes.flexerHorizontal}>

                <Paper className={classes.container} style={{width: "70%"}}>
                    <Typography variant="h6">Details</Typography>
                    <Typography variant="subtitle1">Address: {dinner.address}</Typography>
                    <Typography variant="subtitle1">Date: {dinner.date.toDateString()}</Typography>
                    <Typography variant="subtitle1">Number of addendants: X/{dinner.attendants}</Typography>
                    <Typography variant="subtitle1">Allergens: {dinner.allergens.join(', ')}</Typography>
                </Paper>
                <Paper className={classes.container} style={{width: "30%"}}>
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