import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Dinner } from '../types';

export default function ListComponent(props : Dinner) {

    return (
        <Paper elevation={3} >
            <p>{props.owner}: {props.description}</p>
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
        Se på types.ts for å se på hva som skal gjøres
        Koble DinnerID opp til middag
    */
}

