import React, { useRef } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MaterialLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import { useUser } from '../../contexts/userContext';
import service from '../../services';
import {
  ImageWrapper,
  ProfileImage,
  ProfileDetails,
  ProfileRow
} from '../common';
import ProfileSkeleton from '../../utils/ProfileSkeleton';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const Separator = styled.hr`
  border: none;
  margin: 0 0 10px 0;
`;

const ButtonsContainer = styled.div`
  text-align: center;
  & a {
    margin: 20px 10px;
  }
`;

const EditButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const LinkWrapper = styled.div`
  margin: auto;
  width: fit-content;
`;

const Profile = () => {
  const {
    userDetails,
    getUser,
    loadingUserData,
    logout,
    authenticated
  } = useUser();
  const { credentials } = userDetails || {};
  const { handle, createdAt, imageUrl, bio, website, location } =
    credentials || {};
  const imageInput = useRef();

  const onImageChange = event => {
    const image = event.target.files[0];
    service
      .uploadImage(image)
      .then(() => getUser())
      .catch(err => console.log(err));
  };

  if (!authenticated) {
    return (
      <Paper>
        <Typography variant="body2" align="center">
          Login to see your profile
        </Typography>
        <ButtonsContainer>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </ButtonsContainer>
      </Paper>
    );
  }
  if (loadingUserData) return <ProfileSkeleton />;

  return (
    <StyledPaper>
      <ImageWrapper>
        <ProfileImage src={imageUrl} alt="profile" />
        <input
          ref={imageInput}
          type="file"
          id="image-input"
          hidden="hidden"
          onChange={onImageChange}
        />
        <Tooltip title="Edit profile picture" placement="top">
          <EditButton onClick={() => imageInput.current.click()}>
            <EditIcon color="primary" />
          </EditButton>
        </Tooltip>
      </ImageWrapper>
      <Separator />
      <ProfileDetails>
        <LinkWrapper>
          <MaterialLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            {`@${handle}`}
          </MaterialLink>
        </LinkWrapper>
        <Separator />
        {bio && (
          <>
            <ProfileRow>
              <Typography variant="body2">{bio}</Typography>
            </ProfileRow>
            <Separator />
          </>
        )}
        {location && (
          <>
            <ProfileRow>
              <LocationOn />
              <Typography variant="body2">{location}</Typography>
            </ProfileRow>
            <Separator />
          </>
        )}
        {website && (
          <>
            <ProfileRow>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </ProfileRow>
            <Separator />
          </>
        )}
        <ProfileRow>
          <CalendarToday color="primary" />
          <Typography>{`Joined ${dayjs(createdAt).format('MMM YYYY')}`}</Typography>
        </ProfileRow>
        <Tooltip title="Logout" placement="top">
          <IconButton onClick={logout}>
            <KeyboardReturn color="primary" />
          </IconButton>
        </Tooltip>
        <EditDetails />
      </ProfileDetails>
    </StyledPaper>
  );
};

export default Profile;
