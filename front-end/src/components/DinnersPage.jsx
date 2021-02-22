import React, { useEffect, useState } from 'react';
import client from '../feathers';
import { DinnerCard } from './DinnerCard';

export const DinnersPage = () => {

    const [dinners, setDinners] = useState();


    /* const findDinners = async () => {
        return client.service('dinners')
            .find().catch(e => { console.log('error', e); })
            .then(res => {
                console.log(res.data);
                return res.data.map(dinner => {
                   return <DinnerCard key={dinner.dinner_id} dinner={dinner} />
                })
            })
    }

    setDinners(findDinners); */

    const findDinners = () => {
        client.service('dinners')
        .find().catch(e => { console.log('error', e); })
        .then(res => {
            console.log(res.data);
        })}
    

    return (
            <div>
                <button onClick={findDinners}>
                    Find dinners!
            </button>
                <div>

                </div>

            </div>
        ) }