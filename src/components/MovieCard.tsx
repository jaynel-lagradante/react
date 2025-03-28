import React, { useState } from "react";
import { MovieCardProps } from "../types/movie";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ModalContainerBox } from "../layouts/ModalStyles";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onBook }) => {
  const [open, setOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedSeats([]);
  };

  const handleSeatChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    seatNumber: number
  ) => {
    if (event.target.checked) {
      setSelectedSeats((prev) => [...prev, seatNumber]);
    } else {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatNumber));
    }
  };

  const handleBook = () => {
    if (selectedSeats.length > 0) {
      onBook(movie.id, selectedSeats);
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
      <Card
        sx={{
          maxWidth: 350,
          mb: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
          <Typography variant="body2" color="text.secondary">
            Available Seats: {availableSeats.length} / {movie.totalSeats}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleOpen}
            disabled={availableSeats.length === 0}
          >
            Book Now
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainerBox>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Select Seats for {movie.title}
          </Typography>
          <Box className="listContent">
            <FormGroup>
              {Array.from({ length: movie.totalSeats }, (_, i) => i + 1).map(
                (seatNumber) => (
                  <FormControlLabel
                    key={seatNumber}
                    control={
                      <Checkbox
                        checked={selectedSeats.includes(seatNumber)}
                        onChange={(event) =>
                          handleSeatChange(event, seatNumber)
                        }
                        disabled={movie.bookedSeats.includes(seatNumber)}
                      />
                    }
                    label={`Seat ${seatNumber} ${
                      movie.bookedSeats.includes(seatNumber)
                        ? "(Booked)"
                        : "(Available)"
                    }`}
                  />
                )
              )}
            </FormGroup>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleBook}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Book Seats
            </Button>
          </Box>
        </ModalContainerBox>
      </Modal>
    </Box>
  );
};

export default MovieCard;
