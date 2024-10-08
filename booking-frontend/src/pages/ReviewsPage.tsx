import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    id: 1,
    name: "Алексей Иванов",
    text: "Отличное место для отдыха! Великолепная природа, тишина и уютный домик.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Мария Петрова",
    text: "Очень понравилось! Обязательно вернемся снова.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Иван Смирнов",
    text: "Хорошее место, но хотелось бы больше удобств в домике.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 3,
  },
  {
    id: 4,
    name: "Екатерина Кузнецова",
    text: "Прекрасное место для семейного отдыха. Рекомендую!",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Дмитрий Соколов",
    text: "Отдых удался на славу! Все было отлично.",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 4,
  },

  {
    id: 6,
    name: "Дмитрий Харламов",
    text: "Отдых удался на славу! Все было отлично.",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    rating: 4,
  },
];

const PageContainer = styled(Box)({
  backgroundColor: "#e6dfd6", // Устанавливаем фоновый цвет страницы
  minHeight: "100vh", // Высота страницы должна занимать весь экран
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "32px",
  paddingBottom: "32px",
});

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  marginBottom: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  marginRight: "16px",
});

const StarRating = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
  color: "#FFD700",
});

const ReviewsPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginBottom: "32px",
            textAlign: "center",
            color: "#333333",
          }}
        >
          Отзывы гостей
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {reviews.map((review) => (
            <Grid item key={review.id} xs={12} sm={8} md={6}>
              <StyledCard>
                <StyledAvatar alt={review.name} src={review.avatar} />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ color: "#333333" }}
                  >
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.text}
                  </Typography>
                  <StarRating>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <StarIcon key={index} />
                    ))}
                  </StarRating>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default ReviewsPage;
