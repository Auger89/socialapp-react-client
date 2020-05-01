import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Navbar from './components/layout/Navbar';
import AuthRoute from './utils/AuthRoute';
import './App.css';
import materialTheme from './utils/theme';
import { UserProvider } from './contexts/userContext';
import { ScreamsProvider } from './contexts/screamsContext';

const Container = styled.div`
  margin: 80px auto 0;
  max-width: 1200px;
`;

const App = () => (
  <div className="App">
    <ThemeProvider theme={materialTheme}>
      <UserProvider>
        <ScreamsProvider>
          <CssBaseline />
          <Navbar />
          <AppContent />
        </ScreamsProvider>
      </UserProvider>
    </ThemeProvider>
  </div>
);

const AppContent = () => (
  <Container>
    <Router>
      <Home path="/" />
      <AuthRoute use={Login} path="/login" />
      <AuthRoute use={Signup} path="/signup" />
      <User path="/users/:handle" />
      <User path="/users/:handle/scream/:screamId" />
    </Router>
  </Container>
);

export default App;
