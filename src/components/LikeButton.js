import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LikeBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeIcon from '@material-ui/icons/Favorite';
import { useUser } from '../contexts/userContext';
import { useScreams } from '../contexts/screamsContext';

const LikeButton = ({ id, afterPush }) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    userData,
    authenticated,
    updateAddUserLikes,
    updateRemoveUserLikes
  } = useUser();
  const { likeScream, unlikeScream } = useScreams();
  const { likes: userLikes } = userData || {};

  // TODO Add loading when waiting for request response

  useEffect(() => {
    if (userLikes && userLikes.find(({ screamId }) => screamId === id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userLikes, id]);

  const like = async () => {
    await likeScream(id);
    updateAddUserLikes(id);
    afterPush(1);
  };
  const unlike = async () => {
    await unlikeScream(id);
    updateRemoveUserLikes(id);
    afterPush(-1);
  };
  if (!authenticated) {
    return (
      <Link to="/login">
        <Tooltip title="Like" placement="top">
          <IconButton>
            <LikeBorderIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Link>
    );
  }
  if (isLiked) {
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
  id: PropTypes.string.isRequired,
  afterPush: PropTypes.func
};

LikeButton.defaultProps = {
  afterPush: () => {}
};

export default LikeButton;
