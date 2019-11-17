import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { FIREBASE_ID_TOKEN } from '../utils/constants';

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

  useEffect(() => {
    authenticate();
  }, []);

  const userData = { authenticated };
  return (
    <UserContext.Provider value={{ userData, authenticate }}>
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
