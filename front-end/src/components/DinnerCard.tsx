import { Dinner } from '../types'
import React from 'react';

export default function DinnerCard(dinner: Dinner) {
    return (
        <div className="card">
            <img src={dinner.pictureURL} alt="Meal" style={{width: "100%"}} />
            <div className="container">
                <h4><b>{dinner.name}</b></h4>
                <p>{dinner.description}</p>
            </div>
            
        </div>
        
    );
}