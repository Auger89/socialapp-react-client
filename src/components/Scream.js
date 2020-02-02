import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import LikeBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeIcon from '@material-ui/icons/Favorite';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from '../contexts/userContext';
import { useScreams } from '../contexts/screamsContext';
import LikeButton from './LikeButton';

const CardWrapper = styled(Card)`
  display: flex;
  margin-bottom: 20px;
`;

const CardImage = styled(CardMedia)`
  min-width: 200px;
`;

const CardSpace = styled(CardContent)`
  padding: 25px;
  object-fit: cover;
`;

const Scream = ({ data }) => {
  const {
    id,
    body,
    createdAt,
    commentCount,
    likeCount,
    userHandle,
    userImage
  } = data;
  const {
    userData,
    authenticated,
    updateAddUserLikes,
    updateRemoveUserLikes
  } = useUser();
  const { likeScream, unlikeScream } = useScreams();

  const like = async () => {
    await likeScream(id);
    updateAddUserLikes(id);
  };
  const unlike = async () => {
    await unlikeScream(id);
    updateRemoveUserLikes(id);
  };
  const isAlreadyLiked =
    userData &&
    userData.likes &&
    userData.likes.find(({ screamId }) => screamId === id);

  dayjs.extend(relativeTime);
  return (
    <CardWrapper>
      <CardImage image={userImage} title="Profile image" />
      <CardSpace>
        <Typography
          variant="h5"
          component={Link}
          to={`users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton
          authenticated={authenticated}
          active={isAlreadyLiked}
          like={like}
          unlike={unlike}
        />
        <span>{`${likeCount} likes`}</span>
        <Tooltip title="Edit profile picture" placement="top">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{`${commentCount} comments`}</span>
      </CardSpace>
    </CardWrapper>
  );
};

Scream.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number,
    userHandle: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired
  }).isRequired
};

export default Scream;
