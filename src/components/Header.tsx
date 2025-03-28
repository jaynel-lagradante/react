import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie Booking App
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/my-bookings">
                My Bookings
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              {user && (
                <Typography variant="subtitle1" color="inherit" sx={{ ml: 2 }}>
                  Welcome, {user.username}!
                </Typography>
              )}
            </>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Login/Register
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
