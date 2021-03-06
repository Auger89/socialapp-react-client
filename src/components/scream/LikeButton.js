import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LikeBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeIcon from '@material-ui/icons/Favorite';
import { useUser } from '../../contexts/userContext';
import { useScreams } from '../../contexts/screamsContext';

const LikeButton = ({ id, afterClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    userDetails,
    authenticated,
    updateAddUserLikes,
    updateRemoveUserLikes
  } = useUser();
  const { likeScream, unlikeScream } = useScreams();
  const { likes: userLikes } = userDetails || {};

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
    afterClick(1);
  };
  const unlike = async () => {
    await unlikeScream(id);
    updateRemoveUserLikes(id);
    afterClick(-1);
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
  afterClick: PropTypes.func
};

LikeButton.defaultProps = {
  afterClick: () => {}
};

export default LikeButton;
