import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import './App.css';
import materialTheme from './utils/theme';
import { UserProvider } from './contexts/userContext';

const Container = styled.div`
  margin: 80px auto 0;
  max-width: 1200px;
`;

const App = () => (
  <div className="App">
    <ThemeProvider theme={materialTheme}>
      <UserProvider>
        <CssBaseline />
        <Navbar />
        <AppContent />
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
    </Router>
  </Container>
);

export default App;
