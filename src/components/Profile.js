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
import { useUser } from '../contexts/userContext';
import service from '../services';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const Separator = styled.hr`
  border: none;
  margin: 0 0 10px 0;
`;

const ImageWrapper = styled.div`
  text-align: center;
  position: relative;
  & button: {
    position: absolute;
    top: 80%;
    left: 70%;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  max-width: 100%;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  text-align: center;
  & span, svg: {
    vertical-align: middle;
  }
  & a: {
    color: #00bcd4;
  }
`;

const ButtonsContainer = styled.div`
  text-align: center;
  & a {
    margin: 20px 10px;
  }
`;

const ProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  margin: auto;
`;

const EditButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Profile = () => {
  const {
    userData,
    getUserData,
    loadingUserData,
    logout,
    authenticated
  } = useUser();
  const { credentials } = userData || {};
  const { handle, createdAt, imageUrl, bio, website, location } =
    credentials || {};
  const imageInput = useRef();

  const onImageChange = event => {
    const image = event.target.files[0];
    service
      .uploadImage(image)
      .then(() => getUserData())
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
  if (loadingUserData) return <p>Loading...</p>;

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
        <MaterialLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
        >
          {`@${handle}`}
        </MaterialLink>
        <Separator />
        {bio && (
          <>
            <Typography variant="body2">{bio}</Typography>
            <Separator />
          </>
        )}
        {location && (
          <>
            <ProfileRow>
              <LocationOn />
              <span>{location}</span>
            </ProfileRow>
            <Separator />
          </>
        )}
        {website && (
          <>
            <ProfileRow>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {` ${website}`}
              </a>
            </ProfileRow>
            <Separator />
          </>
        )}
        <ProfileRow>
          <CalendarToday color="primary" />
          <span>{`Joined ${dayjs(createdAt).format('MMM YYYY')}`}</span>
        </ProfileRow>
        <Tooltip title="Logout" placement="top">
          <IconButton onClick={logout}>
            <KeyboardReturn color="primary" />
          </IconButton>
        </Tooltip>
      </ProfileDetails>
    </StyledPaper>
  );
};

export default Profile;
