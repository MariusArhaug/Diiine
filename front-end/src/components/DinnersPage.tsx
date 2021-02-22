import React, { useEffect, useState } from 'react';
import client from '../feathers-client';
import DinnerCard from './DinnerCard';
import {Dinner} from '../types'
import { LensTwoTone } from '@material-ui/icons';


export default function DinnersPage() {
    const [dinners, setDinners] = useState();

    const { authenticate } = require('@feathersjs/authentication');
    let dinnerArray : any[] = [];
    //Load dinners when component is rendered.
    useEffect(() => {
            client.service('dinners')
            .find({})
            .then((res : any)  => {
                //console.log(res.data)
                //create dinnercard and store in array. 
                res.data.forEach((dinner: Dinner) : void => {
                    dinnerArray.push(dinner);
                })
                
                console.log(dinnerArray)
            })
            .catch((e : Error) => { console.log('error', e); })
        })
        
    return (
        <div>
            <ul>
                {   //Need to render dinnerCards. @Lars
                    dinnerArray.map(dinner => (
                        <DinnerCard {...dinner} />
                    ))
                }
            </ul>
        </div>
    );
}