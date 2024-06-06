import React from "react";
import { TableRow, TableCell, IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Container = styled(TableRow)`
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #dcdcdc;
  }
`;

const Transaction = ({ transaction, setTransactions, transactions }) => {
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <Container>
      <TableCell>{transaction.text}</TableCell>
      <TableCell style={{ color: transaction.amount > 0 ? "green" : "red" }}>
        {transaction.amount}
      </TableCell>
      <TableCell>
        {new Date(transaction.date).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => deleteTransaction(transaction.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </Container>
  );
};

export default Transaction;
