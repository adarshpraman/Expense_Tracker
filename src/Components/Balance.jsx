import React from "react";
import { Box, Typography, styled } from "@mui/material";

const BalanceContainer = styled(Box)({
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

const BalanceText = styled(Typography)({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
});

const BalanceAmount = styled(Typography)({
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1976d2",
  marginTop: "8px",
});

const Balance = ({ transactions }) => {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((amount, item) => (amount += item), 0).toFixed(2);

  return (
    <BalanceContainer>
      <BalanceText>Current Balance</BalanceText>
      <BalanceAmount>₹{total}</BalanceAmount>
    </BalanceContainer>
  );
};

export default Balance;
