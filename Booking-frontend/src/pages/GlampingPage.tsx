import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { Glamping } from "../interfaces/glamping.interface";

const apiUrl = process.env.REACT_APP_API_URL;

const StyledContainer = styled(Container)({
  marginTop: "50px",
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

const GlampingPage: React.FC = () => {
  const [glampings, setGlampings] = useState<Glamping[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGlampings = async () => {
      setLoading(true);

      //отображение глэмпингов на главной странице для пользователя
      try {
        const response = await axios.get(`${apiUrl}/glampings`);
        setGlampings(response.data);
      } catch (error) {
        console.error("Error fetching glampings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlampings();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom align="center">
        Наши места для глэмпинга
      </Typography>
      {loading ? (
        <Typography align="center">Загрузка...</Typography>
      ) : (
        <Grid container justifyContent="center" spacing={3}>
          {glampings.map((glamping) => (
            <Grid item key={glamping._id}>
              <StyledCard>
                <Link
                  to={`/glamping/${glamping._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <StyledCardMedia
                    image={`${apiUrl}/public/${glamping.image}`}
                    title={glamping.title}
                  />
                  <CardContent>
                    <StyledTitle gutterBottom variant="h5">
                      {glamping.title}
                    </StyledTitle>
                    <Typography variant="body2" color="text.secondary">
                      {glamping.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Цена: {glamping.price} руб.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Вместимость: {glamping.capacity} чел.
                    </Typography>
                  </CardContent>
                </Link>
                <Button
                  component={Link}
                  to={`/glampings/${glamping._id}`}
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
            </Grid>
          ))}
        </Grid>
      )}
    </StyledContainer>
  );
};

export default GlampingPage;
