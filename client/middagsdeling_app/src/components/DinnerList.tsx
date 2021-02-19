import React from 'react';
import ListComponent from '../components/ListComponent';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 10000,
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

export type Dinner = {
    name: string;
    description: string;
}

const dinner1: Dinner = {
    name: "test",
    description: "desc"
}
const dinner2: Dinner = {
    name: "test2",
    description: "desc2"
}
const dinner3: Dinner = {
    name: "test3",
    description: "desc3"
}

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