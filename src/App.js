import React from "react";
import { Link, Router } from "@reach/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
      </Router>
    </div>
  );
}

export default App;
