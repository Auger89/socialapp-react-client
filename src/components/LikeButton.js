import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LikeBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeIcon from '@material-ui/icons/Favorite';

const LikeButton = ({ authenticated, active, like, unlike }) => {
  if (!authenticated) {
    return (
      <Tooltip title="Like" placement="top">
        <IconButton>
          <Link to="/login">
            <LikeBorderIcon color="primary" />
          </Link>
        </IconButton>
      </Tooltip>
    );
  }
  if (active) {
    return (
      <Tooltip title="Undo like" placement="top">
        <IconButton onClick={unlike}>
          <LikeIcon color="primary" />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Like" placement="top">
      <IconButton onClick={like}>
        <LikeBorderIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

LikeButton.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired
};

export default LikeButton;
