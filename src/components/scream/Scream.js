import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUser } from '../../contexts/userContext';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

const CardWrapper = styled(Card)`
  position: relative;
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

const Scream = ({ data, openDialog }) => {
  const {
    id,
    body,
    createdAt,
    commentCount,
    likeCount,
    userHandle,
    userImage
  } = data;
  const { userDetails, authenticated } = useUser();
  const { credentials } = userDetails || {};

  dayjs.extend(relativeTime);
  return (
    <CardWrapper>
      <CardImage image={userImage} title="Profile image" />
      <CardSpace>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {authenticated && credentials && credentials.handle === userHandle && (
          <DeleteScream screamId={id} />
        )}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton id={id} />
        <span>{`${likeCount} likes`}</span>
        <Tooltip title="Comments" placement="top">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{`${commentCount} comments`}</span>
        <ScreamDialog id={id} userHandle={userHandle} isOpen={openDialog} />
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
  }).isRequired,
  openDialog: PropTypes.bool
};

Scream.defaultProps = {
  openDialog: false
};

export default Scream;
