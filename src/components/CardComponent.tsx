import React from "react";
import { Movie } from "../types/movie";
import { CardContent, Typography, Button, CardActions } from "@mui/material";
import { Booking } from "../types/booking";
import { CuztomizedCard } from "../layouts/CardStyles";

interface CardProps {
  movie: Movie;
  booking?: Booking;
  availableSeats?: number;
  bookButtonLabel: string;
  handleOpen: () => void;
  handleCancel?: () => void;
}

const CardComponent: React.FC<CardProps> = ({
  movie,
  booking,
  bookButtonLabel,
  availableSeats,
  handleOpen,
  handleCancel,
}) => {
  return (
    <CuztomizedCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Showtime: {new Date(movie.showtime).toLocaleString()}
        </Typography>
        {booking && (
          <>
            <Typography variant="body2" color="text.secondary">
              Seats: {booking.seatNumbers.join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booking ID: {booking.id}
            </Typography>
          </>
        )}

        {availableSeats && (
          <Typography variant="body2" color="text.secondary">
            Available Seats: {availableSeats} / {movie.totalSeats}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleOpen}
          disabled={availableSeats === 0}
        >
          {bookButtonLabel}
        </Button>
        {handleCancel && (
          <Button size="small" color="secondary" onClick={handleCancel}>
            Cancel Booking
          </Button>
        )}
      </CardActions>
    </CuztomizedCard>
  );
};

export default CardComponent;
