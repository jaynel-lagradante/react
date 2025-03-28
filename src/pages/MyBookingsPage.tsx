import React from "react";
import { useBooking } from "../context/BookingContext";
import BookingItem from "../components/BookingItem";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const MyBookingsPage: React.FC = () => {
  const { bookings, movies } = useBooking();
  const { user } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
        {bookings
          .filter((booking) => booking.username === user?.username)
          .map((booking) => {
            const movie = movies.find((m) => m.id === booking.movieId);
            return (
              <BookingItem key={booking.id} booking={booking} movie={movie} />
            );
          })}
        {bookings.filter((booking) => booking.username === user?.username)
          .length === 0 && (
          <Typography variant="subtitle1">
            No bookings yet for {user?.username}.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default MyBookingsPage;
