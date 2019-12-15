import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { FIREBASE_ID_TOKEN } from '../utils/constants';
import service from '../services';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const isExpired = token => token.exp * 1000 < Date.now();

  const getUserData = async () => {
    try {
      const response = await service.getUserData();
      setUserData(response.data);
    } catch (err) {
      console.log(err.toJSON());
    }
  };

  const logout = () => {
    localStorage.removeItem(FIREBASE_ID_TOKEN);
    setAuthenticated(false);
    setUserData(null);
  };

  const authenticate = async () => {
    const userToken = localStorage.getItem(FIREBASE_ID_TOKEN);
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      if (isExpired(decodedToken)) {
        logout();
      } else {
        setAuthenticated(true);
        await getUserData();
      }
    }
  };

  const login = async data => {
    let errors = null;
    try {
      const response = await service.login(data);
      localStorage.setItem(FIREBASE_ID_TOKEN, `Bearer ${response.data.token}`);
      await authenticate();
    } catch (err) {
      console.log(err.toJSON());
      errors = err.response.data;
    }
    return errors;
  };

  const signup = async data => {
    let errors = null;
    try {
      const response = await service.signup(data);
      localStorage.setItem(FIREBASE_ID_TOKEN, `Bearer ${response.data.token}`);
      await authenticate();
    } catch (err) {
      console.log(err.toJSON());
      errors = err.response.data;
    }
    return errors;
  };

  useEffect(() => {
    authenticate();
  }, []);

  console.log('userData: ', userData);

  return (
    <UserContext.Provider
      value={{ userData, authenticated, login, signup, logout }}
    >
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
