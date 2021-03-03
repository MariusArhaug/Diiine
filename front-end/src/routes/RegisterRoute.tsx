import React from 'react';
import { Signup } from '../components/Signup';
import Navbar from '../components/Navbar';

export default function RegisterRoute() {
    return (
        <div>
            <Navbar />
                <Signup />
        </div>
    )
}