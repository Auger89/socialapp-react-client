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

const Signup = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useUser();

  const onEmailChange = evt => setEmail(evt.target.value);
  const onPasswordChange = evt => setPassword(evt.target.value);
  const onConfirmPasswordChange = evt => setConfirmPassword(evt.target.value);
  const onHandleChange = evt => setHandle(evt.target.value);

  const handleSubmit = async evt => {
    evt.preventDefault();
    setLoading(true);
    const signupErrors = await signup({
      email,
      password,
      confirmPassword,
      handle
    });
    setLoading(false);

    if (signupErrors) {
      setErrors(signupErrors);
    } else {
      navigate('../');
    }
  };

  return (
    <FormGrid container>
      <Grid item sm />
      <Grid item sm>
        <AppIconImg src={DEFAULT_IMAGE_URL} alt="app icon" />
        <Typography variant="h2">Signup</Typography>
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
          <FormTextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            onChange={onConfirmPasswordChange}
            fullWidth
          />
          <FormTextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            value={handle}
            helperText={errors.handle}
            error={!!errors.handle}
            onChange={onHandleChange}
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
            Signup
          </Button>
          <Typography
            variant="caption"
            display="block"
            style={{ marginTop: '8px' }}
          >
            Already have an account? Log in
            <Link to="/login"> here</Link>
          </Typography>
        </form>
      </Grid>
      <Grid item sm />
    </FormGrid>
  );
};

Signup.propTypes = {
  navigate: PropTypes.func
};

Signup.defaultProps = {
  navigate: () => {}
};

export default Signup;
