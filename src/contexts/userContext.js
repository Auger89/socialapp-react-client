import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { FIREBASE_ID_TOKEN } from '../utils/constants';
import service from '../services';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const isExpired = token => token.exp * 1000 < Date.now();

  const authenticate = () => {
    const userToken = localStorage.getItem(FIREBASE_ID_TOKEN);
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      if (isExpired(decodedToken)) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    }
  };

  const login = async userData => {
    let errors = null;
    await service
      .login(userData)
      .then(res => {
        localStorage.setItem(FIREBASE_ID_TOKEN, `Bearer ${res.data.token}`);
        authenticate();
      })
      .catch(err => {
        console.log(err.toJSON());
        errors = err.response.data;
      });
    return errors;
  };

  const signup = async userData => {
    let errors = null;
    await service
      .signup(userData)
      .then(res => {
        localStorage.setItem(FIREBASE_ID_TOKEN, `Bearer ${res.data.token}`);
        authenticate();
      })
      .catch(err => {
        console.log(err.toJSON());
        errors = err.response.data;
      });
    return errors;
  };

  useEffect(() => {
    authenticate();
  }, []);

  const userData = { authenticated };
  console.log('user authenticated? ', authenticated)
  return (
    <UserContext.Provider value={{ userData, login, signup }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { UserProvider, useUser };
