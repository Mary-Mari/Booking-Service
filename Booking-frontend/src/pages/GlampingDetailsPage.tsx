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
import { Glamping } from "../interfaces/glamping.interface";
import BookingForm from "../pages/BookingForm";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

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

const GlampingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [glamping, setGlamping] = useState<Glamping | null>(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);

  useEffect(() => {
    const fetchGlampingDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/glampings/${id}`);
        const data = await response.json();
        setGlamping(data);
      } catch (error) {
        console.error("Error fetching glamping:", error);
      }
    };
    fetchGlampingDetails();
  }, [id]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await fetch(`${apiUrl}/bookings/unavailable-dates`);
        const data = await response.json();
        setUnavailableDates(data.map((date: string) => dayjs(date)));
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
      const uniqueDates = Array.from(
        new Set(combinedDates.map((date) => date.toISOString()))
      ).map((date) => dayjs(date));

      // Проверяем, изменилось ли количество уникальных дат, прежде чем обновлять состояние
      if (uniqueDates.length !== prevDates.length) {
        return uniqueDates;
      }
      return prevDates;
    });
  };

  if (!glamping) {
    return <Typography variant="h4">Глэмпинг не найден</Typography>;
  }

  return (
    <PageContainer maxWidth="md">
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flexGrow={1}>
          <IconButton component={Link} to="/glamping" aria-label="Назад">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" gutterBottom>
            {glamping.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                {glamping.image && (
                  <StyledImage
                    src={`${apiUrl}/public/${glamping.image}`}
                    alt={glamping.title}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <StyledDescription variant="body1" gutterBottom>
                  {glamping.description}
                </StyledDescription>
                <Typography
                  variant="body2"
                  sx={{ marginTop: "30px" }}
                  gutterBottom
                >
                  <strong>Цена за ночь:</strong> {glamping.price} рублей
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Вместимость:</strong> {glamping.capacity} человек
                </Typography>
                {glamping.amenities && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Удобства:</strong> {glamping.amenities.join(", ")}
                  </Typography>
                )}
                <Box sx={{ marginTop: "40px" }}>
                  <Button
                    onClick={handleBookingClick}
                    color="primary"
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
            unavailableDates={unavailableDates}
            onUpdateUnavailableDates={handleUpdateUnavailableDates}
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

export default GlampingDetailsPage;
