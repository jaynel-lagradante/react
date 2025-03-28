import React from "react";
import MovieCard from "../components/MovieCard";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const { movies, loadingMovies, bookSeats } = useBooking();
  const { user } = useAuth();

  const handleBook = (movieId: number, selectedSeats: number[]) => {
    if (user) {
      console.log(`Book seats ${selectedSeats} for movie ID: ${movieId}`);
      bookSeats(movieId, selectedSeats, user.username);
    }
  };

  if (loadingMovies) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Movies
      </Typography>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onBook={handleBook} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
