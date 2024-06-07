import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  & > h5,
  & > div,
  & > button {
    margin-top: 20px;
  }
`;

const RowContainer = styled(Box)`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 8px;
    background-color: #f7f7f7;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #e0e0e0;
  }

  & .MuiInputLabel-root {
    color: #888;
  }
`;

const StyledButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #1976d2;
  color: #ffffff;

  &:hover {
    background-color: #1565c0;
  }
`;

const NewTransaction = ({ setTransactions }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [transactionType, setTransactionType] = useState("expense");

  const addTransaction = () => {
    if (!text || !amount || !transactionType) {
      return;
    }
    const transaction = {
      id: Math.floor(Math.random() * 10000000),
      text: text,
      amount:
        transactionType === "expense" ? -Math.abs(amount) : +Math.abs(amount),
      date: new Date().toLocaleString(),
    };
    setTransactions((prevState) => [transaction, ...prevState]);
    setText("");
    setAmount("");
    setSelectedDate(dayjs());
    setTransactionType("expense");
  };

  return (
    <Container>
      <Typography variant="h5" style={{ marginTop: "0px" }}>
        New Transaction
      </Typography>
      <StyledTextField
        label="Enter expense"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <StyledTextField
        label="Enter amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />
      <RowContainer>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              format="DD/MM/YYYY"
              maxDate={dayjs()}
            />
          </LocalizationProvider>
        </FormControl>
      </RowContainer>

      <StyledButton variant="contained" onClick={addTransaction}>
        Add Transaction
      </StyledButton>
    </Container>
  );
};

export default NewTransaction;
