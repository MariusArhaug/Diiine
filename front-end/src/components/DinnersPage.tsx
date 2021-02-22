import React, { useEffect, useState } from 'react';
import client from '../feathers';
import { DinnerCard } from './DinnerCard';

export default function DinnersPage() {
    
    const [dinners, setDinners] = useState();

    const findDinners = () => {
        const result = client.service('dinners').find();
        console.log(result);
    }

    /* 
       const findDinners = () => {
        client.service('dinners')
        .find().catch(e => { console.log('error', e); })
        .then(res => {
            console.log(res.data);
        })}
    */

    return (
        <div>
            <button onClick={findDinners}>
                Find dinners!
            </button>
        </div>
    );
}