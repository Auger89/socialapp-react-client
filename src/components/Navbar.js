import React from 'react';
import styled from '@emotion/styled';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';

const StyledToolBar = styled(Toolbar)`
  justify-content: center;
`;

const RawLink = styled(Link)`
  color: inherit;
  cursor: pointer;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <AppBar position="static">
      <StyledToolBar>
        <Button color="inherit">
          <RawLink to="/">Home</RawLink>
        </Button>
        <Button color="inherit">
          <RawLink to="/login">Login</RawLink>
        </Button>
        <Button color="inherit">
          <RawLink to="/signup">Signup</RawLink>
        </Button>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
