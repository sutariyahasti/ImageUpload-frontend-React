import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      history("/data");

      console.log(response.data); // Do something with the response (e.g., set user state, handle authentication)
    } catch (error) {
      console.error("Login failed:", error.response.data);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            login
          </Button>
          <div style={{ marginTop: 10 }}>
            create new?{" "}
            <Link style={{ color: "blue" }} to="/">
              Signup
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
