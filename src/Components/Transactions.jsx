import React, { useState } from "react";
import Transaction from "./Transaction";
import {
  Box,
  Typography,
  TextField,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Header = styled(TableHead)`
  @media (max-width: 700px) {
    display: none;
  }
  background-color: #dcdcdc;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  text-align: center;
`;

const Transactions = ({ transactions, setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDateChange = (date) => setSelectedDate(date);

  const filteredTransactions = transactions.filter((transaction) => {
    const isMatchingSearchTerm = transaction.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isMatchingDate =
      selectedDate === null ||
      dayjs(transaction.date).isSame(selectedDate, "day");
    return isMatchingSearchTerm && isMatchingDate;
  });

  return (
    <Container>
      <Typography variant="h5">Transaction History</Typography>
      <FilterContainer>
        <TextField
          label="Search transactions"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Search date"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            maxDate={dayjs()}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </FilterContainer>

      <TableContainer component={Paper}>
        <Table>
          <Header>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </Header>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                setTransactions={setTransactions}
                transactions={transactions}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Transactions;
