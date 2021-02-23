import React from 'react';
import ListComponent from '../components/ListComponent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Dinner } from '../types'
import { User } from '../types'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 10000,
            backgroundColor: '#b3cbb9',
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

const user1: User = {
    userId: 10,
    name: "Navn Navnesen",
    address: "Moholt",
    email: "mohotl@gmail.com",
    isAdmin: false,
   allergies: ["nuts", "milk"]
}

const user2: User = {
    userId: 11,
    name: "Hei Heisen",
    address: "Berg",
    email: "berg@gmail.com",
    isAdmin: false,
    allergies: []
}

const user3: User = {
    userId: 12,
    name: "Hade Hadeland",
    address: "Lerkendal",
    email: "lerkendal@gmail.com",
    isAdmin: false,
    allergies: ["Gluten"]
}

const dinner1: Dinner = {
    dinnerId: 1,
    owner: user1,
    name: "Duck Confit",
    description: "Nå sitter jeg og ser på skiskyting og lurer på hvordan den reagerer dersom jeg skriver mye tekst, om det vil bli slikt at det bli fortsatt bare en stor og lang tekstblokk, eller om det hopper ned",
    address: "Angelltrøvegen 3, 7048 Trondheim",
    type: "Meat",
    allergens: "Celery",
    attendants: [user2, user3],
    date: new Date()
}
const dinner2: Dinner = {
    dinnerId: 2,
    owner: user2,
    name: "Taco Friday",
    description: "desc2",
    address: "Weidemanns vei 5B, 7014 Trondheim",
    type: "Vegan",
    allergens: "None",
    attendants: [user3],
    date: new Date()
}
const dinner3: Dinner = {
    dinnerId: 3,
    owner: user3,
    name: "Tapas Night",
    description: "desc3",
    address: "Høyskoleringen 1, 7030 Trondheim",
    type: "Various",
    allergens: "Gluten, Eggs, Soy, Mustard, Shellfish, Other",
    attendants: [],
    date: new Date()
}

/*
export type Rating = {
    rated: User;
    ratedBy: User;
    description: string;
    rating: number;
}

export type Chat = {
    to: User;
    from: User;
    message: string;
}
*/

const dinners: Dinner[] = [dinner1, dinner2, dinner3];

export default function ComplexGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3} direction="column" justify="space-evenly" alignItems="stretch">
                        {dinners.map(dinner => (
                            <Grid item>
                                <ListComponent {...dinner} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}