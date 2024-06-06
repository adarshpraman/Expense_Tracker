import { useState, useEffect } from "react";

import "./App.css";
import { Box, Typography, styled } from "@mui/material";

import Balance from "./Components/Balance";
import ExpenseCard from "./Components/ExpenseCard";
import NewTransaction from "./Components/NewTransaction";
import Transactions from "./Components/Transactions";

const Header = styled(Typography)`
  margin: 20px 0 0 0;
  font-size: 36px;
  color: #166abd;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`;

const Component = styled(Box)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 75%;
  margin: 10px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 1050px) {
    flex-direction: row;
  }

  & > div {
    padding: 20px;
    width: 100%;

    @media (min-width: 1050px) {
      width: 100%;
    }
  }

  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [
          {
            id: 1,
            text: "Momos",
            amount: -20,
            date: "03/01/2024, 04:36:36 pm",
          },
          {
            id: 2,
            text: "Salary",
            amount: 3000,
            date: "03/02/2024, 04:36:36 pm",
          },
          {
            id: 3,
            text: "Book",
            amount: -100,
            date: "03/02/2024, 04:36:36 pm",
          },
          {
            id: 4,
            text: "Bonus",
            amount: 1500,
            date: "03/06/2024, 04:36:36 pm",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Box className="App">
      <Header>Expense Tracker</Header>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <NewTransaction setTransactions={setTransactions} />
        </Box>
        <Box>
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </Box>
      </Component>
    </Box>
  );
}

export default App;
