import React, {useState} from 'react';
import {useAuth} from '../hooks/use-auth'
import client from '../feathers';

export const Signup = () => {
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
        const result = auth.signup(credentials);
        console.log(result);
    }

    return (
        <div>
            <div>
                Sign up here
            </div>
            <div>
                <form className='form' method='POST' onSubmit={handleSubmit}>
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
                        Sign up!
                    </button>
                </form> 
            </div>
        </div>
    )
}