import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { House } from "../interfaces/house.interface";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import BookingForm from "../pages/BookingForm"; // Импортируем форму бронирования


const apiUrl = process.env.REACT_APP_API_URL;

const PageContainer = styled(Container)({
  marginTop: "20px",
  marginBottom: "20px",
});

const StyledDescription = styled(Typography)({
  fontSize: "1.4rem",
  lineHeight: 1.6,
});

const StyledImage = styled("img")({
  maxHeight: "450px",
  objectFit: "cover",
  width: "100%",
});

const HouseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = React.useState<House | null>(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false); // Состояние для управления модальным окном
  const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]); // Состояние для хранения недоступных дат

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/houses/${id}`);
        setHouse(response.data);
      } catch (error) {
        console.error("Error fetching house:", error);
      }
    };

    fetchHouseData();
  }, [id]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/bookings/unavailable-dates`
        );
        setUnavailableDates(response.data.map((date: string) => dayjs(date)));
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const handleBookingClick = () => {
    setIsBookingFormOpen(true);
  };

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
  };

  const handleUpdateUnavailableDates = (newBookingDates: Dayjs[]) => {
    setUnavailableDates((prevDates) => {
      const combinedDates = [...prevDates, ...newBookingDates];
      return Array.from(
        new Set(combinedDates.map((date) => date.toISOString()))
      ).map((date) => dayjs(date));
    });
  };

  if (!house) {
    return <Typography variant="h4">Дом не найден</Typography>;
  }

  return (
    <PageContainer maxWidth="md">
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flexGrow={1}>
          <IconButton component={Link} to="/cottages" aria-label="Назад">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" gutterBottom>
            {house.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                {house.image && (
                  <StyledImage
                    src={`${apiUrl}/public/${house.image}`}
                    alt={house.title}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <StyledDescription variant="body1" gutterBottom>
                  {house.description}
                </StyledDescription>
                <Typography
                  variant="body2"
                  sx={{ marginTop: "30px" }}
                  gutterBottom
                >
                  <strong>Цена за ночь:</strong> {house.price} рублей
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Вместимость:</strong> {house.capacity} человек
                </Typography>
                {house.amenities && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Удобства:</strong> {house.amenities.join(", ")}
                  </Typography>
                )}
                <Box sx={{ marginTop: "40px" }}>
                  <Button
                    onClick={handleBookingClick}
                    color="primary"
                    type="submit"
                    sx={{
                      backgroundColor: "#333333",
                      color: "#f5f5f5",
                      "&:hover": { backgroundColor: "#3d3d3d" },
                    }}
                  >
                    Забронировать
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Модальное окно с формой бронирования */}
      <Dialog
        open={isBookingFormOpen}
        onClose={handleCloseBookingForm}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Бронирование</DialogTitle>
        <DialogContent>
          <BookingForm
            onClose={handleCloseBookingForm}
            glampingId={id!}
            cottageId={id!}
            unavailableDates={unavailableDates} // Передаем недоступные даты в BookingForm
            onUpdateUnavailableDates={handleUpdateUnavailableDates} // Передаем функцию для обновления недоступных дат
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingForm} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default HouseDetailsPage;
