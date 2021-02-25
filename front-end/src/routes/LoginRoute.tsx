import React from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

export default function LoginRoute() {
    return (
        <div>
            <Navbar />
                <Login />
        </div>
    )
}