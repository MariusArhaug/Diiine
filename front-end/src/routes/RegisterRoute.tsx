import React from 'react';
import { Signup } from '../pages/User/Signup';
import Navbar from '../components/Navbar';

export default function RegisterRoute() {
    return (
        <div>
            <Navbar />
            <Signup />
        </div>
    )
}