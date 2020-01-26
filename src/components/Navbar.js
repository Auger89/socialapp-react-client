import React from 'react';
import styled from '@emotion/styled';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useUser } from '../contexts/userContext';

const StyledToolBar = styled(Toolbar)`
  justify-content: center;
`;

const RawLink = styled(Link)`
  color: inherit;
  cursor: pointer;
`;

const StyledButton = styled(IconButton)`
  color: #fff;
`;

const Navbar = () => {
  const { authenticated } = useUser();
  return (
    <AppBar position="static">
      <StyledToolBar>
        {authenticated ? (
          <>
            <Tooltip title="Post a Scream">
              <StyledButton>
                <AddIcon />
              </StyledButton>
            </Tooltip>
            <Link to="/">
              <Tooltip title="Home">
                <StyledButton>
                  <HomeIcon />
                </StyledButton>
              </Tooltip>
            </Link>
            <Tooltip title="Notifications">
              <StyledButton>
                <NotificationsIcon />
              </StyledButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Button color="inherit">
              <RawLink to="/">Home</RawLink>
            </Button>
            <Button color="inherit">
              <RawLink to="/login">Login</RawLink>
            </Button>
            <Button color="inherit">
              <RawLink to="/signup">Signup</RawLink>
            </Button>
          </>
        )}
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
