import { Card, styled } from "@mui/material";

export const CuztomizedCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  marginBottom: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
