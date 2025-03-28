import React, { useEffect, useState } from "react";
import { BookingItemProps } from "../types/booking";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useBooking } from "../context/BookingContext";
import { ModalContainerBox } from "../layouts/ModalStyles";
import CardComponent from "./CardComponent";

const BookingItem: React.FC<BookingItemProps> = ({ booking, movie }) => {
  const { cancelBooking, updateBookingSeats } = useBooking();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>(
    booking.seatNumbers
  );

  const handleCancel = () => {
    cancelBooking(booking.id);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSeats(booking.seatNumbers);
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

  const handleUpdateBooking = () => {
    if (movie) {
      console.log("Updating booking:", booking.id, "to seats:", selectedSeats);
      updateBookingSeats(booking.id, selectedSeats);
      handleCloseUpdateModal();
    } else {
      alert("Movie details not found.");
    }
  };

  useEffect(() => {
    setSelectedSeats(booking.seatNumbers);
  }, [booking.seatNumbers]);

  if (!movie) {
    return (
      <Card sx={{ maxWidth: 345, mb: 2 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Booking ID: {booking.id}
          </Typography>
          <Typography color="error">Movie details not found.</Typography>
        </CardContent>
      </Card>
    );
  }

  const allSeats = Array.from({ length: movie.totalSeats }, (_, i) => i + 1);
  const bookedSeatsForOtherBookings = movie.bookedSeats.filter(
    (seat) => !booking.seatNumbers.includes(seat)
  );

  return (
    <Box sx={{ flex: "1 1 300px" }}>
      <CardComponent
        movie={movie}
        booking={booking}
        bookButtonLabel={"Update Booking"}
        handleOpen={handleOpenUpdateModal}
        handleCancel={handleCancel}
      ></CardComponent>

      <Modal
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-update-booking-title"
        aria-describedby="modal-update-booking-description"
      >
        <ModalContainerBox>
          <Typography
            id="modal-update-booking-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Update Seats for {movie.title} (Booking ID: {booking.id})
          </Typography>
          <Box className="listContent">
            <FormGroup>
              {allSeats.map((seatNumber) => (
                <FormControlLabel
                  key={seatNumber}
                  control={
                    <Checkbox
                      checked={selectedSeats.includes(seatNumber)}
                      onChange={(event) => handleSeatChange(event, seatNumber)}
                      disabled={bookedSeatsForOtherBookings.includes(
                        seatNumber
                      )}
                    />
                  }
                  label={`Seat ${seatNumber} ${
                    bookedSeatsForOtherBookings.includes(seatNumber)
                      ? "(Booked)"
                      : "(Available)"
                  }`}
                />
              ))}
            </FormGroup>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseUpdateModal}>Cancel</Button>
            <Button
              onClick={handleUpdateBooking}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Update Seats
            </Button>
          </Box>
        </ModalContainerBox>
      </Modal>
    </Box>
  );
};

export default BookingItem;
