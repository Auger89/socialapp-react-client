import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MaterialLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import dayjs from 'dayjs';
import {
  ImageWrapper,
  ProfileImage,
  ProfileDetails,
  ProfileRow
} from '../common';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const Separator = styled.hr`
  border: none;
  margin: 0 0 10px 0;
`;

const StaticProfile = ({ profile }) => {
  const { handle, createdAt, imageUrl, bio, website, location } = profile || {};

  return (
    <StyledPaper>
      <ImageWrapper>
        <ProfileImage src={imageUrl} alt="profile" />
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
      </ProfileDetails>
    </StyledPaper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.shape({
    handle: PropTypes.string,
    createdAt: PropTypes.string,
    imageUrl: PropTypes.string,
    bio: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string
  }).isRequired
};

export default StaticProfile;
