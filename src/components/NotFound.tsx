import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" paragraph>
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        paragraph
      >
        The page you are looking for could not be found. Please check the URL or
        go back to the home page.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button component={Link} to="/home" variant="contained" color="primary">
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
