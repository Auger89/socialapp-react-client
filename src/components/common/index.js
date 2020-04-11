import styled from '@emotion/styled';

const Separator = styled.hr`
  border: none;
  margin: 4px;
`;

const VisibleSeparator = styled.hr`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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

const ProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  margin: auto;
`;

export {
  Separator,
  VisibleSeparator,
  ImageWrapper,
  ProfileImage,
  ProfileDetails,
  ProfileRow
};
