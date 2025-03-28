import React, { useEffect, useState } from "react";
import { BookingItemProps } from "../types/booking";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBooking } from "../context/BookingContext";
import CardComponent from "./CardComponent";
import SeatSelectionModal from "./SeatSelectionModal";

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
  };

  const handleUpdateBooking = (seats: number[]) => {
    if (movie) {
      console.log("Updating booking:", booking.id, "to seats:", seats);
      updateBookingSeats(booking.id, seats);
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

      <SeatSelectionModal
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title={`Update Seats for ${movie.title} (Booking ID: ${booking.id})`}
        totalSeats={movie.totalSeats}
        bookedSeats={bookedSeatsForOtherBookings}
        initialSelectedSeats={selectedSeats}
        onConfirm={handleUpdateBooking}
        confirmButtonLabel="Update Seats"
      />
    </Box>
  );
};

export default BookingItem;
