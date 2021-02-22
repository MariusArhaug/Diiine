import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';

import client from '../feathers';

export const Login = () => {
    const auth = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleEmailInputChange = (event) => {
        setCredentials((credentials) => ({
            ...credentials,
            email: event.target.value,
        }));
    };

    const handlePasswordChange = (event) => {
        setCredentials((credentials) => ({
            ...credentials,
            password: event.target.value,
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const result = await auth.signin(credentials);
        console.log(result);
    }


    return (
        <div>
            <div>
                Log in here
            </div>
            <div>
                <form method='POST' onSubmit={handleSubmit}>
                    <input
                        id='email'
                        className='form-field'
                        type='text'
                        name='email'
                        value={credentials.email}
                        onChange={handleEmailInputChange}
                    />

                    <input
                        id='password'
                        className='form-field'
                        type='password'
                        name='password'
                        value={credentials.password}
                        onChange={handlePasswordChange}
                    />

                    <button className='form-field' type='submit'>
                        Log in!
                    </button>
                </form>
            </div>
        </div>
    );
}