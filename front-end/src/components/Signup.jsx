import React, {useState} from 'react';
import client from '../feathers';

export const Signup = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [result, setResult] = useState(null);


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

        const userObject = {
            ...credentials,
            "isAdmin": 0,
            "allergies": {
                "nuts": 1,
                "lactose": 0,
            },
            "name": "test"

        }

        try {
            console.log(credentials);
            console.log(userObject);
            const result = await client.service('users').create(userObject);
            setResult(result);
        } catch (error) {
            console.log('error', error);
        }
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