import React from "react";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  & > div {
    flex: 1;
    margin: 5px;
    width: 100%;
  }
`;

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Amount = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 700;
`;

const IncomeAmount = styled(Amount)`
  color: green;
`;

const ExpenseAmount = styled(Amount)`
  color: red;
`;

const ExpenseCard = ({ transactions }) => {
  const amount = transactions.map((transaction) => transaction.amount);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <Container>
      <StyledCard>
        <StyledCardContent>
          <Title>Income</Title>
          <IncomeAmount>₹{income}</IncomeAmount>
        </StyledCardContent>
      </StyledCard>
      <StyledCard>
        <StyledCardContent>
          <Title>Expense</Title>
          <ExpenseAmount>₹{expense}</ExpenseAmount>
        </StyledCardContent>
      </StyledCard>
    </Container>
  );
};

export default ExpenseCard;
