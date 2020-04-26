import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { FIREBASE_ID_TOKEN } from '../utils/constants';
import service from '../services';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const isExpired = token => token.exp * 1000 < Date.now();

  const updateAddUserLikes = screamId => {
    const updatedLikes = [
      ...userDetails.likes,
      { userHandle: userDetails.credentials.handle, screamId }
    ];
    setUserDetails({ ...userDetails, likes: updatedLikes });
  };

  const updateRemoveUserLikes = screamId => {
    const updatedLikes = userDetails.likes.filter(
      like => like.screamId !== screamId
    );
    setUserDetails({ ...userDetails, likes: updatedLikes });
  };

  const getUser = async () => {
    setLoadingUserData(true);

    try {
      const response = await service.getUser();
      setUserDetails(response.data);
    } catch (err) {
      console.log(err.toJSON());
    } finally {
      setLoadingUserData(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(FIREBASE_ID_TOKEN);
    setAuthenticated(false);
    setUserDetails(null);
  };

  const authenticate = async () => {
    const userToken = localStorage.getItem(FIREBASE_ID_TOKEN);
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      if (isExpired(decodedToken)) {
        logout();
      } else {
        setAuthenticated(true);
        await getUser();
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
      errors = err.response && err.response.data;
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

  const editUserDetails = details => {
    service
      .editUserDetails(details)
      .then(getUser)
      .catch(err => console.log(err));
  };

  const markNotificationsRead = async notificationIds => {
    try {
      await service.markNotificationsRead(notificationIds);
      const updatedNotifications = userDetails.notifications.map(
        notification => ({
          ...notification,
          read: true
        })
      );
      setUserDetails({ ...userDetails, notifications: updatedNotifications });
    } catch (err) {
      console.log(err.toJSON());
    }
  };

  // In order to execute an async function in a hook, we must create it inside (scoped)
  useEffect(() => {
    const authenticateAndGetUser = async () => {
      await authenticate();
    };
    authenticateAndGetUser();
  }, []);

  console.log('userDetails: ', userDetails);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        getUser,
        editUserDetails,
        loadingUserData,
        authenticated,
        login,
        signup,
        logout,
        updateAddUserLikes,
        updateRemoveUserLikes,
        markNotificationsRead
      }}
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
