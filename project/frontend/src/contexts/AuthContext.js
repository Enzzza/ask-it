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

  const signin = async (email, password) => {
    let { msg, user, error } = await authController.signin(email, password);

    if (!error) {
      setUser(user);
    }
    return { msg, user, error };
  };

  const signup = async (data) => {
    let { msg, user, error } = await authController.signup(data);

    if (!error) {
      setUser(user);
    }

    return { msg, user, error };
  };
  const signout = async () => {
    let { msg, error } = await authController.signout();

    if (!error) {
      setUser(false);
    }

    return { msg, error };
  };

  const me = async () => {
    let { msg, user, error } = await authController.me();

    if (!error) {
      setUser(user);
    }

    return { msg, user, error };
  };

  const updateDetails = async (data) => {
    let { msg, user, error } = await authController.updateDetails(data);

    if (!error) {
      setUser(user);
    }

    return { msg, user, error };
  };

  const updatePassword = async (data) => {
    let { msg, user, error } = await authController.updatePassword(data);

    if (!error) {
      setUser(user);
    }

    return { msg, user, error };
  };

  useEffect(() => {
    me();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    me,
    updateDetails,
    updatePassword,
  };
}
