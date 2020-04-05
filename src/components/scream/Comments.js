import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Separator, VisibleSeparator } from '../common';

/* import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import { useScreams } from '../../contexts/screamsContext';
import LikeButton from './LikeButton';
import Comments from './Comments'; */

const UserImage = styled.img`
  max-width: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const CommentData = styled.div`
  margin-left: 20px;
`;

const Comments = ({ comments }) => (
  <Grid container>
    {comments.map((comment, index) => {
      const { body, createdAt, userImage, userHandle } = comment;
      return (
        <div
          key={`${userHandle}_
        ${createdAt}`}
        >
          <Grid item sm={12}>
            <Grid container>
              <Grid item sm={2}>
                <UserImage src={userImage} alt="comment" />
              </Grid>
              <Grid item sm={9}>
                <CommentData>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <Separator />
                  <Typography variant="body1">{body}</Typography>
                </CommentData>
              </Grid>
            </Grid>
          </Grid>
          {index !== comments.length - 1 && <VisibleSeparator />}
        </div>
      );
    })}
  </Grid>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      createdAt: PropTypes.string,
      userImage: PropTypes.string,
      userHandle: PropTypes.string
    })
  ).isRequired
};

export default Comments;
