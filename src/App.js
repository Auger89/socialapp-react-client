import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import './App.css';
import materialTheme from './theme';

const Container = styled.div`
  margin: 80px auto 0;
  max-width: 1200px;
`;

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Navbar />
        <Container>
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Signup path="/signup" />
          </Router>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
