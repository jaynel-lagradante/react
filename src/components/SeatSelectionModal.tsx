import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ModalContainerBox } from "../layouts/ModalStyles";

interface SeatSelectionModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  totalSeats: number;
  bookedSeats: number[];
  initialSelectedSeats?: number[];
  onConfirm: (seats: number[]) => void;
  confirmButtonLabel: string;
}

const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  open,
  onClose,
  title,
  totalSeats,
  bookedSeats,
  initialSelectedSeats = [],
  onConfirm,
  confirmButtonLabel,
}) => {
  const [selectedSeats, setSelectedSeats] =
    useState<number[]>(initialSelectedSeats);

  useEffect(() => {
    setSelectedSeats(initialSelectedSeats);
  }, [initialSelectedSeats]);

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

  const handleConfirm = () => {
    onConfirm(selectedSeats);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          {title}
        </Typography>
        <Box className="listContent">
          <FormGroup>
            {Array.from({ length: totalSeats }, (_, i) => i + 1).map(
              (seatNumber) => (
                <FormControlLabel
                  key={seatNumber}
                  control={
                    <Checkbox
                      checked={selectedSeats.includes(seatNumber)}
                      onChange={(event) => handleSeatChange(event, seatNumber)}
                      disabled={bookedSeats.includes(seatNumber)}
                    />
                  }
                  label={`Seat ${seatNumber} ${
                    bookedSeats.includes(seatNumber)
                      ? "(Booked)"
                      : "(Available)"
                  }`}
                />
              )
            )}
          </FormGroup>
        </Box>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
            disabled={selectedSeats.length === 0}
          >
            {confirmButtonLabel}
          </Button>
        </Box>
      </ModalContainerBox>
    </Modal>
  );
};

export default SeatSelectionModal;
