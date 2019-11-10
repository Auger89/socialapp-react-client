import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const FormGrid = styled(Grid)`
  text-align: center;
`;

export const AppIconImg = styled.img`
  width: 128px;
  // margin: 20px auto 20px auto;
`;

export const FormTextField = styled(TextField)`
  margin: 10px auto 10px auto;
`;

export const ErrorText = styled(Typography)`
  color: red;
  font-size: 0.8rem;
  margin: 8px 0 12px 0;
`;
