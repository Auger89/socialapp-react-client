import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

const AuthRoute = ({ use: Component, auth, ...rest }) => {
  // TODO Use context for user authentication
  if (auth) {
    navigate('/');
  } else {
    return <Component {...rest} />;
  }
  return null;
};

AuthRoute.propTypes = {
  use: PropTypes.node.isRequired,
  auth: PropTypes.bool
};

AuthRoute.defaultProps = {
  auth: false
};

export default AuthRoute;
