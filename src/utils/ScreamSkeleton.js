import React from 'react';
import styled from '@emotion/styled';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useTheme } from '@material-ui/core/styles';
import NoImage from '../images/no-img.png';

const PlaceholderCard = styled(Card)`
  display: flex;
  margin-bottom: 20px;
`;
const PlaceholderContent = styled(CardContent)`
  width: 100%;
  flex-direction: column;
  padding: 25px;
`;
const PlaceholderMedia = styled(CardMedia)`
  min-width: 200px;
  object-fit: cover;
`;
const UserDiv = styled.div`
  width: 60px;
  height: 18px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 7px;
  opacity: 0.7;
`;
const DateDiv = styled.div`
  height: 14px;
  width: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;
const WidelineDiv = styled.div`
  height: 15px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;
const HalflineDiv = styled.div`
  height: 15px;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const ScreamSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      {[1, 2, 3, 4, 5].map(item => (
        <PlaceholderCard key={item}>
          <PlaceholderMedia image={NoImage} />
          <PlaceholderContent>
            <UserDiv theme={theme} />
            <DateDiv />
            <WidelineDiv />
            <HalflineDiv />
          </PlaceholderContent>
        </PlaceholderCard>
      ))}
    </>
  );
};

export default ScreamSkeleton;
