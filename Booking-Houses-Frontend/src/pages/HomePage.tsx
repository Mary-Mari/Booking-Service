import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled(Box)({
  height: "100vh",
  backgroundImage: "url(/house.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
});

const Content = styled(Container)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "20px",
  borderRadius: "8px",
});

function HomePage() {
  return (
    <Root>
      <Content>
        <Typography variant="h2" gutterBottom>
          Добро пожаловать на сайт бронирования домов!
        </Typography>
        <Typography variant="h5">
          Найдите и забронируйте дом своей мечты
        </Typography>
      </Content>
    </Root>
  );
}

export default HomePage;
