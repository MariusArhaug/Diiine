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
                //console.log(res.data)
                //create dinnercard and store in array. 
                res.data.forEach((dinner: any) : void => {
                    setDinners(dinner);
                })
                
                console.log(dinners)
            })
            .catch((e : Error) => { console.log('error', e); })
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