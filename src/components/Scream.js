import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const CardWrapper = styled(Card)`
  display: flex;
  margin-bottom: 20px;
`;

const CardImage = styled(CardMedia)`
  min-width: 200px;
`;

const Scream = ({ data }) => {
  const {
    body,
    createdAt,
    // commentCount,
    // likeCount,
    userHandle,
    userImage
  } = data;
  dayjs.extend(relativeTime);
  return (
    <CardWrapper>
      <CardImage image={userImage} title="Profile image" />
      <CardContent>
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
      </CardContent>
    </CardWrapper>
  );
};

Scream.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number,
    userHandle: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired
  }).isRequired
};

export default Scream;
