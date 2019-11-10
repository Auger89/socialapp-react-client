import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from '@reach/router';
import { FormGrid, FormTextField, AppIconImg, ErrorText } from './components';
import service from '../services';

const Login = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onEmailChange = evt => setEmail(evt.target.value);
  const onPasswordChange = evt => setPassword(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    setLoading(true);
    service
      .login({ email, password })
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        navigate('../');
      })
      .catch(err => {
        console.log(err.toJSON());
        setLoading(false);
        setErrors(err.response.data);
      });
  };

  return (
    <FormGrid container>
      <Grid item sm />
      <Grid item sm>
        <AppIconImg
          src="https://firebasestorage.googleapis.com/v0/b/social-app-45dd0.appspot.com/o/sun_icon.png?alt=media"
          alt="app icon"
        />
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
