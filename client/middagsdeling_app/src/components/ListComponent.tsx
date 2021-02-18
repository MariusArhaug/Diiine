import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Dinner } from './DinnerList';

export default function ListComponent(props : Dinner) {

    return (
        <Paper elevation={3} >
            <p>{props.name}: {props.description}</p>
        </Paper>
    );

    /*
        name
        adress
        type (veggi, meaty)
        allergens
        attendants
        isDivided
        isOpen
        expenses
        date
        description
    */
}

