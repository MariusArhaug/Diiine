import React, { useState } from 'react';

import client from '../feathers';

export function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [result, setResult] = useState(null);


    const handleEmailInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setCredentials((credentials) => ({
            ...credentials,
            email: event.target.value,
        }));
    };

    const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setCredentials((credentials) => ({
            ...credentials,
            password: event.target.value,
        }));
    };



    const handleSubmit = async(event: React.FormEvent) : Promise<void> => {
        event.preventDefault();

        client.authenticate({
            strategy: 'local',
            ...credentials
        }).then( () => {
            const temp = client.get('authentication');

            result ? setResult(temp) : setResult(null);
            console.log(result);
            }
        ).catch((e: Error) => console.log('error', e));
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
    )
}