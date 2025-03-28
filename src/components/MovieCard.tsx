import React, { useState } from "react";
import { MovieCardProps } from "../types/movie";
import { Box } from "@mui/material";
import CardComponent from "./CardComponent";
import SeatSelectionModal from "./SeatSelectionModal";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onBook }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBook = (seats: number[]) => {
    if (seats.length > 0) {
      onBook(movie.id, seats);
      handleClose();
    } else {
      alert("Please select at least one seat to book.");
    }
  };

  const availableSeats = Array.from(
    { length: movie.totalSeats },
    (_, i) => i + 1
  ).filter((seat) => !movie.bookedSeats.includes(seat));

  return (
    <Box sx={{ flex: "1 1 300px" }}>
      <CardComponent
        movie={movie}
        availableSeats={availableSeats.length}
        bookButtonLabel={"Book Now"}
        handleOpen={handleOpen}
      ></CardComponent>

      <SeatSelectionModal
        open={open}
        onClose={handleClose}
        title={`Select Seats for ${movie.title}`}
        totalSeats={movie.totalSeats}
        bookedSeats={movie.bookedSeats}
        onConfirm={handleBook}
        confirmButtonLabel="Book Seats"
        initialSelectedSeats={[]}
      />
    </Box>
  );
};

export default MovieCard;
