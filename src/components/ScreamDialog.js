import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Link } from '@reach/router';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { useScreams } from '../contexts/screamsContext';

const Separator = styled.hr`
  border: none;
  margin: 4px;
`;

const ProfileImage = styled.img`
  max-width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const ExpandButton = styled(IconButton)`
  position: absolute;
  left: 90%;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  left: 90%;
  top: 5%;
`;

const ScreamContent = styled(DialogContent)`
  padding: 20px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const ScreamDialog = ({ id, userHandle }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { getScream } = useScreams();

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getScreamById = async screamId => {
      setLoading(true);
      const response = await getScream(screamId);
      if (response) setData(response);
      setLoading(false);
    };

    getScreamById(id);
  }, [id]);

  return (
    <>
      <Tooltip title="Expand scream" placement="top">
        <ExpandButton onClick={() => setOpen(true)}>
          <UnfoldMoreIcon color="primary" />
        </ExpandButton>
      </Tooltip>
      <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
          <CloseButton onClick={close}>
            <CloseIcon />
          </CloseButton>
        </Tooltip>
        <ScreamContent>
          {loading ? (
            <LoadingContainer>
              <CircularProgress size={200} thickness={2} />
            </LoadingContainer>
          ) : (
            // TODO Add error display
            <Grid container spacing={16}>
              <Grid item sm={5}>
                <ProfileImage src={data.userImage} alt="Profile" />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
                  to={`users/${userHandle}`}
                >
                  {`@${userHandle}`}
                </Typography>
                <Separator />
                <Typography color="textSecondary" variant="body2">
                  {dayjs(data.createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <Separator />
                <Typography variant="body1">{data.body}</Typography>
              </Grid>
            </Grid>
          )}
        </ScreamContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  id: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired
};

export default ScreamDialog;