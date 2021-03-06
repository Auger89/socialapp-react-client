import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from '@reach/router';
import { FormGrid, FormTextField, AppIconImg, ErrorText } from './components';
import { DEFAULT_IMAGE_URL } from '../utils/constants';
import { useUser } from '../contexts/userContext';

const Login = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useUser();

  const onEmailChange = evt => setEmail(evt.target.value);
  const onPasswordChange = evt => setPassword(evt.target.value);

  const handleSubmit = async evt => {
    evt.preventDefault();
    setLoading(true);
    const loginErrors = await login({ email, password });
    setLoading(false);

    if (loginErrors) {
      setErrors(loginErrors);
    } else {
      navigate('../');
    }
  };

  return (
    <FormGrid container>
      <Grid item sm />
      <Grid item sm>
        <AppIconImg src={DEFAULT_IMAGE_URL} alt="app icon" />
        <Typography variant="h2">Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <FormTextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            helperText={errors.email}
            error={!!errors.email}
            onChange={onEmailChange}
            fullWidth
          />
          <FormTextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            helperText={errors.password}
            error={!!errors.password}
            onChange={onPasswordChange}
            fullWidth
          />
          {errors.general && (
            <ErrorText variant="body2">{errors.general}</ErrorText>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                size={20}
                style={{ color: 'white', marginRight: '8px' }}
              />
            )}
            Login
          </Button>
          <Typography
            variant="caption"
            display="block"
            style={{ marginTop: '8px' }}
          >
            Don&apos;t have an account? Sign up
            <Link to="/signup"> here</Link>
          </Typography>
        </form>
      </Grid>
      <Grid item sm />
    </FormGrid>
  );
};

Login.propTypes = {
  navigate: PropTypes.func
};

Login.defaultProps = {
  navigate: () => {}
};

export default Login;
