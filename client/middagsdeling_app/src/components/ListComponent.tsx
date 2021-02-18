import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Dinner } from './DinnerList';

export default function ListComponent(props : Dinner) {

    return (
        <Paper>
            <p>{props.name} + {props.description}</p>
        </Paper>
    );
}

