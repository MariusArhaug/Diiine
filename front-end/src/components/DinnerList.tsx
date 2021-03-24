import React, { useEffect, useState } from 'react';
import DinnerCard from './DinnerCard';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Dinner } from '../types'
import { User } from '../types'
import client from '../feathers-client';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 10000,
            // backgroundColor: '#b3cbb9',
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

export default function ComplexGrid() {
    const classes = useStyles();
    const [dinners, setDinners] = useState([]);
    //let dinnersArray : Dinner[] = [];

    useEffect(() => {
        client.service('dinners')
            .find({})
            .then((res: any) => {
                console.log(res.data);
                setDinners(res.data);

            })
            .catch((e: Error) => { console.log('error', e); })
        /*const dinner = {
            name: 'test',
            address: '123',
            description: 'lol',
            date: '2000-01-01',
            tags: ['tags'],
            ingredients: ['ing'],
            allergens: ['alg'],
            attendants: 1,
            isDivided: false,
            isOpen: false,
            expenses: 1000,
            banner: '?'
        }
          
        client.service('dinners').create(dinner)
        */
    }, []);

    return (
        <div className={classes.root}>
            {/* <Paper className={classes.paper}> */}
            <Grid container spacing={3} direction="column" justify="space-evenly" alignItems="stretch">
                {dinners.length && dinners!.map((dinner: Dinner) => (
                    <Grid item>
                        <DinnerCard {...dinner} key={dinner.dinners_id} />
                    </Grid>
                ))}
            </Grid>
            {/* </Paper> */}
        </div>
    );
}