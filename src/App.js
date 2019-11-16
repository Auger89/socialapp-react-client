import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import jwtDecode from 'jwt-decode';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import './App.css';
import materialTheme from './utils/theme';
import { FIREBASE_ID_TOKEN } from './utils/constants';

const Container = styled.div`
  margin: 80px auto 0;
  max-width: 1200px;
`;

// TODO move this to a Context
let authenticated = false;
const token = localStorage.getItem(FIREBASE_ID_TOKEN);
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const App = () => (
  <div className="App">
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Navbar />
      <Container>
        <Router>
          <Home path="/" />
          <AuthRoute use={Login} auth={authenticated} path="/login" />
          <AuthRoute use={Signup} auth={authenticated} path="/signup" />
        </Router>
      </Container>
    </ThemeProvider>
  </div>
);

export default App;
