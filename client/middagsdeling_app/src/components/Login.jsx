import React, { useState } from 'react';
import { useStyles } from '../styles';
import { Link as RouterLink } from 'react-router-dom';

import client from '../feathers';

export default function Login() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false
    });

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [result, setResult] = useState(null);

/*     const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }; */

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

        return client.authenticate({strategy: 'local', ...credentials});
       /*  try {
            await client.authenticate({
                strategy: 'local',
                ...credentials
                // email: 'admin@middag.no',
                // password: 'supersecret'
            });
            console.log('we tryin hard');
            const result = await client.get('authentication');

            result ? setResult(result) : setResult(null);
            
        } catch (error) {
            throw Error(error); 
        } */
    }

    const handleSignOut = async () => {
        await client.logout();
    }

    return (
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
                    Log in
                </button>
            </form> 
        </div>
    )

}