import { useState, useContext, createContext } from "react";
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

  const reAuth = () => {
    return client.reAuthenticate().then(res => {
        setUser(res.user);
        return res.user
    }).catch((e) => {
        console.log('error signing in with jwt');
    })
    }

  const signin = (credentials) => {
    return client.authenticate({
        strategy: 'local',
        ...credentials
    }).then(response => {
        setUser(response.user);
        return response.user;
    }).catch((e) => {
        console.log('error signing in', e);
    });
  };

  const signout = async () => {
      // TODO: .logout().then(//redirect to home)
      await client.logout();
      setUser(null);

  };

  const signup = (credentials) => {
    const userObject = {
        ...credentials,
    }
    return client.service('users').create(userObject)
      .then(response => {
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
    reAuth
  };
}