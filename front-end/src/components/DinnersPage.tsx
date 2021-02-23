import React, { useEffect, useState } from 'react';
import client from '../feathers-client';
import DinnerCard from './DinnerCard';
import {Dinner} from '../types'
import { LensTwoTone } from '@material-ui/icons';


export default function DinnersPage() {
    const [dinners, setDinners] = useState();

    //Load dinners when component is rendered.
    useEffect(() => {
            client.service('dinners')
            .find({})
            .then((res : any)  => {
                console.log(res);
                
                
            })
            .catch((e : Error) => { console.log('error', e); })
        }, []);

    useEffect(() => {
        client.service('dinners').create({
                "name": "waaat",
                "adress": "coolstreet 14a, 7030, Trondheim",
                "type": "vegan,byob",
                "attendants": 4,
                "allergens": "nuts",
                "expenses": 0,
                "date": "2021-02-20"
        })
    })
        
    return (
        <div>
            <ul>
                {   //Need to render dinnerCards. @Lars
                    // dinners.map(dinner => (
                    //     <DinnerCard {...dinner} />
                    // ))
                }
            </ul>
        </div>
    );
}