import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loginMock } = useAuth();
  const [isMockLogin, setIsMockLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    if (isMockLogin) {
      loginMock();
    } else {
      const success = await login(username, password);
      if (success) {
        navigate("/home");
      } else {
        console.log("Login failed");
      }
    }
  };

  const handleRegister = () => {
    console.log("Register clicked");
  };

  const handleToggleLoginType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsMockLogin(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isMockLogin}
                onChange={handleToggleLoginType}
              />
            }
            label="Use Mock Login"
          />

          {!isMockLogin && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleRegister}
            sx={{ mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
