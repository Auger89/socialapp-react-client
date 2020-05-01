import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useUser } from '../contexts/userContext';

const AuthRoute = ({ use: Component, ...rest }) => {
  const { authenticated } = useUser();

  if (authenticated) {
    navigate('/');
  } else {
    return <Component {...rest} />;
  }
  return null;
};

AuthRoute.propTypes = {
  use: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
};

export default AuthRoute;
