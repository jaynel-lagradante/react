// src/pages/LogoutPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggingOut(true);
      const logoutDelay = 2000;

      const logoutTimeout = setTimeout(async () => {
        await logout();
        navigate("/");
      }, logoutDelay);

      return () => clearTimeout(logoutTimeout);
    } else {
      navigate("/");
    }
  }, [navigate, logout, isAuthenticated]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Logging Out...
      </Typography>
      <Typography variant="body1" paragraph>
        Please wait a moment.
      </Typography>
      {isLoggingOut && <CircularProgress sx={{ mt: 2 }} />}
      {isAuthenticated && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              setIsLoggingOut(true);
              await logout();
              navigate("/");
            }}
            disabled={isLoggingOut}
          >
            Logout Now
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LogoutPage;
