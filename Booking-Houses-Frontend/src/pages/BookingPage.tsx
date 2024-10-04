import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { House } from "../interfaces/house.interface";
import { Glamping } from "../interfaces/glamping.interface";

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

// Определение StyledTextField
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

const StyledCard = styled(Card)({
  width: "350px",
  height: "500px",
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const StyledCardMedia = styled(CardMedia)({
  height: "200px",
  objectFit: "cover",
});

const StyledTitle = styled(Typography)({
  color: "#333333",
});

interface PropertyCardProps {
  property: House | Glamping;
  linkPrefix: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  linkPrefix,
}) => {
  return (
    <StyledCard>
      <Link
        to={`/${linkPrefix}/${property._id}`}
        style={{ textDecoration: "none" }}
      >
        <StyledCardMedia
          image={`${apiUrl}/public/${property.image}`}
          title={property.title}
        />
        <CardContent>
          <StyledTitle gutterBottom variant="h5">
            {property.title}
          </StyledTitle>
          <Typography variant="body2" color="text.secondary">
            {property.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Цена: {property.price} руб.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Вместимость: {property.capacity} чел.
          </Typography>
        </CardContent>
      </Link>
      <Button
        component={Link}
        to={`/${linkPrefix}/${property._id}`}
        variant="contained"
        sx={{
          backgroundColor: "#333333",
          color: "#f5f5f5",
          "&:hover": { backgroundColor: "#3d3d3d" },
        }}
        fullWidth
      >
        Забронировать
      </Button>
    </StyledCard>
  );
};

const BookingPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    checkIn: null as Dayjs | null,
    checkOut: null as Dayjs | null,
    guests: "",
    phone: "",
    agreement: false,
  });

  const [showListings, setShowListings] = useState(false);
  const [glampings, setGlampings] = useState<Glamping[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.agreement) {
      setSnackbarMessage("Вы должны согласиться с условиями бронирования.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const glampingResponse = await axios.get(`${apiUrl}/glampings`);
      const houseResponse = await axios.get(`${apiUrl}/houses`);
      setGlampings(glampingResponse.data);
      setHouses(houseResponse.data);
      setShowListings(true);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      setSnackbarMessage(
        "Ошибка при загрузке данных. Пожалуйста, попробуйте снова."
      );
      setSnackbarOpen(true);
    }
  };

  const handleCloseListings = () => {
    setShowListings(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <FormWrapper onSubmit={handleSearch}>
            <Typography variant="h4" gutterBottom style={{ color: "#333333" }}>
              Забронировать отдых в My House
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
            />
            <DatePicker
              label="Выезд"
              value={form.checkOut}
              onChange={(date) => handleDateChange(date, "checkOut")}
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
              inputProps={{
                pattern: "\\+7\\d{10}",
                placeholder: "+7XXXXXXXXXX",
              }}
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
              найти
            </Button>
          </FormWrapper>
        </Box>

        <Dialog
          open={showListings}
          onClose={handleCloseListings}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Доступные глэмпинги и коттеджи</DialogTitle>
          <DialogContent>
            <Grid container justifyContent="center" spacing={3}>
              {glampings.map((glamping) => (
                <Grid item key={glamping._id}>
                  <PropertyCard property={glamping} linkPrefix="glamping" />
                </Grid>
              ))}
              {houses.map((house) => (
                <Grid item key={house._id}>
                  <PropertyCard property={house} linkPrefix="cottages" />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>

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
      </Container>
    </LocalizationProvider>
  );
};

export default BookingPage;
