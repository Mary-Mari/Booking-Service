import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const FormWrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  backgroundColor: "#e6dfd6",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
});

const StyledCheckbox = styled(Checkbox)({
  color: "#333333",
  "&.Mui-checked": {
    color: "#333333",
  },
});

const StyledTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "4px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333333",
      borderRadius: "4px",
    },
  },
});

interface BookingFormProps {
  onClose: () => void;
  glampingId: string;
  cottageId: string;
  unavailableDates: Dayjs[];
  onUpdateUnavailableDates: (newBookingDates: Dayjs[]) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onClose,
  glampingId,
  cottageId,
  unavailableDates,
  onUpdateUnavailableDates,
}) => {
  const [form, setForm] = useState({
    name: "",
    checkIn: null as Dayjs | null,
    checkOut: null as Dayjs | null,
    guests: "",
    phone: "",
    agreement: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (
    date: Dayjs | null,
    field: "checkIn" | "checkOut"
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.agreement) {
      setSnackbarMessage("Вы должны согласиться с условиями бронирования.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/bookings`, {
        name: form.name,
        checkIn: form.checkIn ? form.checkIn.toISOString() : null,
        checkOut: form.checkOut ? form.checkOut.toISOString() : null,
        guests: form.guests,
        phone: form.phone,
        glampingId,
        cottageId,
      });

      if (response.status === 201) {
        setSnackbarMessage("Бронирование успешно создано!");
        setSnackbarOpen(true);
        onClose(); // Закрыть форму после успешной отправки
      }
    } catch (error) {
      console.error("Ошибка при бронировании:", error);
      setSnackbarMessage(
        "Ошибка при бронировании. Пожалуйста, попробуйте снова."
      );
      setSnackbarOpen(true);
    }
  };

  const isDateUnavailable = (date: Dayjs) => {
    // Проверка на прошедшую дату
    if (date.isBefore(dayjs(), "day")) {
      return true;
    }
    // Проверка на наличие в списке недоступных дат
    return unavailableDates.some((d) => d.isSame(date, "day"));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormWrapper onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom style={{ color: "#333333" }}>
          Бронирование
        </Typography>
        <StyledTextField
          label="Ваше Имя"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <DatePicker
          label="Заезд"
          value={form.checkIn}
          onChange={(date) => handleDateChange(date, "checkIn")}
          shouldDisableDate={isDateUnavailable}
        />
        <DatePicker
          label="Выезд"
          value={form.checkOut}
          onChange={(date) => handleDateChange(date, "checkOut")}
          shouldDisableDate={isDateUnavailable}
        />
        <StyledTextField
          label="Количество гостей"
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          required
        />
        <StyledTextField
          label="Телефон"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          inputProps={{ pattern: "\\+7\\d{10}", placeholder: "+7XXXXXXXXXX" }}
          required
        />
        <FormControlLabel
          control={
            <StyledCheckbox
              name="agreement"
              checked={form.agreement}
              onChange={handleChange}
            />
          }
          label={
            <Typography style={{ color: "#333333" }}>
              Согласен с условиями бронирования
            </Typography>
          }
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            backgroundColor: "#333333",
            color: "#f5f5f5",
            "&:hover": { backgroundColor: "#3d3d3d" },
          }}
        >
          Отправить
        </Button>
      </FormWrapper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Snackbar закрывается через 4 секунды
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Ошибка") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default BookingForm;
