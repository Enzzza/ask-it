import React, { useState, useContext, createContext, useEffect } from 'react';
import { authController } from '../api/auth';
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
  const [offlineMsg,setOfflineMsg] = useState([])
  
  const signin = async (email, password) => {
    let {user, messages} = await authController.signin(email, password);
    
    if (user) {
      setUser(user);
      setOfflineMsg([...offlineMsg,...messages]);
    }
    return user;
  };

  const signup = async (data) => {
    let user = await authController.signup(data);

    if (user) {
      setUser(user);
    }

    return user;

  };
    const signout = async () => {
      let status = await authController.signout()

      if(status){
        setUser(false);
        return false;
      }

      return status;


    };

    const me = async () => {
      let user = await authController.me();
  
      if (user) {
        setUser(user);
      }

      return user;
  
    };
    useEffect(() => {
      me();
      
    }, []);

  // Return the user object and auth methods
  return {
    user,
    offlineMsg,
    signin,
    signup,
    signout,
    me,
  };
}
