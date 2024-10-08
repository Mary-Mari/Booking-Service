import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { House } from '../interfaces/house.interface';
import { Style } from '@mui/icons-material';


const apiUrl = process.env.REACT_APP_API_URL;

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const StyledCard = styled(Card)({
  width: '350px',
  height: '500px',
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardMedia = styled(CardMedia)({
  height: '200px',
  objectFit: 'cover',
});

const StyledTitle = styled(Typography)({
  color: '#333333',
});



const CottagePage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
        
      //отображение домов на главной странице для пользователя 
      try {
        const response = await axios.get(`${apiUrl}/houses`);
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom align="center">
        Наши коттеджи
      </Typography>
      {loading ? (
        <Typography align="center">Загрузка...</Typography>
      ) : (
        <Grid container justifyContent="center" spacing={3}>
          {houses.map((house) => (
            <Grid item key={house._id}>
              <StyledCard>
                <Link to={`/cottages/${house._id}`} style={{ textDecoration: 'none' }}>
                <StyledCardMedia
                    image={`${apiUrl}/public/${house.image}`}
                    title={house.title}
                  />
                  <CardContent>
                     <StyledTitle gutterBottom variant="h5">
                      {house.title}
                    </ StyledTitle>
                    <Typography variant="body2" color="text.secondary">
                      {house.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }} >
                      Цена: {house.price} руб.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Вместимость: {house.capacity} чел.
                    </Typography>
                  </CardContent>
                </Link>
                <Button
                  component={Link}
                  to={`/houses/${house._id}`}
                  variant="contained"
                  sx={{ backgroundColor: '#333333', color: '#f5f5f5', '&:hover': { backgroundColor: '#3d3d3d' } }}
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

export default CottagePage;
