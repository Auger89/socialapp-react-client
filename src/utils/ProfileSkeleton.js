import React from 'react';
import styled from '@emotion/styled';
import Card from '@material-ui/core/Card';
import { useTheme } from '@material-ui/core/styles';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import NoImage from '../images/no-img.png';
import {
  ImageWrapper,
  ProfileImage,
  ProfileDetails,
  Separator
} from '../components/common';

const PlaceholderPaper = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const UserDiv = styled.div`
  width: 60px;
  height: 18px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  margin: 0 auto 7px auto;
  opacity: 0.7;
`;

const WidelineDiv = styled.div`
  height: 15px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 10px auto;
`;

const HalflineDiv = styled.div`
  display: inline-block;
  height: 15px;
  width: 40%;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 4px 4px;
`;

const ProfileSkeleton = () => {
  const theme = useTheme();
  return (
    <PlaceholderPaper>
      <ImageWrapper>
        <ProfileImage src={NoImage} alt="profile" />
      </ImageWrapper>
      <Separator />
      <ProfileDetails style={{ textAlign: 'center' }}>
        <UserDiv theme={theme} />
        <Separator />
        <WidelineDiv />
        <WidelineDiv />
        <Separator />
        <LocationOn color="primary" />
        <HalflineDiv />
        <Separator />
        <LinkIcon color="primary" />
        <HalflineDiv />
        <Separator />
        <CalendarToday color="primary" />
        <HalflineDiv />
      </ProfileDetails>
    </PlaceholderPaper>
  );
};

export default ProfileSkeleton;
