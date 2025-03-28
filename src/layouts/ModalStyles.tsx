import { Box, styled } from "@mui/material";

export const ModalContainerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24px",
  backgroundColor: "white",
  padding: theme.spacing(4),
  "& .listContent": {
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "16px",
  },
}));
