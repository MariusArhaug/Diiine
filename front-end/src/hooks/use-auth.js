import React, { useState, useEffect, useContext, createContext } from "react";
import client from '../feathers-client';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const jwtSignin = () => {
        return client.authenticate({
            strategy: 'jwt',
        }).then(res => {
            setUser(res.user);
            return res.user
        }).catch((e) => {
            console.log('error signing in with jwt', e);
        })
    }


    const signin = (credentials) => {
        return client.authenticate({
            strategy: 'local',
            ...credentials
        }).then(response => {
            setUser(response.user);
            console.log(user);
            return response.user;
        }).catch((e) => {
            console.log('error signing in', e);
        });
    };

    const signout = () => {
        // TODO: .logout().then(//redirect to home)
        client.logout();
        setUser(false);
    };

    const signup = (credentials) => {
        const userObject = {
            ...credentials,
            /*
            'name': 'test-from-frontend',
            'isAdmin': 1,
            'allergies':  {
                'nuts': 1,
                'lactose': 0,
                'gluten': 1,
            }*/
        }
        return client.service('users').create(userObject).then(
            response => {
                setUser(response.user);
                return response.user;
            }).catch((e) => {
                console.log('couldn\'t create user', e);
            })
    }

    // Subscribe to user on mount ?? vet ikke helt hva det betyr
    // useEffect();

    return {
        user,
        signin,
        signout,
        signup,
        jwtSignin
    };
}