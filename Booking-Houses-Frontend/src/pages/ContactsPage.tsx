import React, { NewLifecycle, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const primaryColor = "#333333";
const secondaryColor = "#e6dfd6";
const hoverColor = "#555555";

const StyledContainer = styled(Container)({
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: secondaryColor,
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const Title = styled(Typography)({
  color: primaryColor,
  marginBottom: "20px",
  fontWeight: "bold",
});

const InfoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  color: primaryColor,
  padding: "10px",
});

const IconBox = styled(Box)({
  marginRight: "10px",
  color: primaryColor,
});

const InfoText = styled(Typography)({
  color: primaryColor,
});

const ContactForm = styled("form")({
  marginTop: "20px",
  padding: "20px",
  backgroundColor: secondaryColor,
  borderRadius: "8px",
});

const SubmitButton = styled(Button)({
  backgroundColor: primaryColor,
  color: secondaryColor,
  "&:hover": {
    backgroundColor: hoverColor,
  },
  marginTop: "10px",
});

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/contacts`, formData);
      if (response.status === 201) {
        setOpenSnackbar(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <StyledContainer maxWidth="md">
      <Title variant="h4" align="center">
        Контакты
      </Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoBox>
            <IconBox>
              <LocationOnIcon />
            </IconBox>
            <InfoText variant="body1">
              Адрес: Ленинградская область, деревня Ягодное
            </InfoText>
          </InfoBox>
          <InfoBox>
            <IconBox>
              <PhoneIcon />
            </IconBox>
            <InfoText variant="body1">Телефон: +7 (999) 000-00-00</InfoText>
          </InfoBox>
          <InfoBox>
            <IconBox>
              <EmailIcon />
            </IconBox>
            <InfoText variant="body1">Email: info@my-house.com</InfoText>
          </InfoBox>
          <InfoBox>
            <IconBox>
              <AccessTimeIcon />
            </IconBox>
            <InfoText variant="body1">
              Время работы: Пн-Вс: 09:00 - 21:00
            </InfoText>
          </InfoBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              align="center"
              color={primaryColor}
              gutterBottom
            >
              Обратная связь
            </Typography>
            <TextField
              fullWidth
              label="Ваше имя"
              variant="outlined"
              margin="dense"
              color="primary"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Ваш email"
              variant="outlined"
              margin="dense"
              color="primary"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Сообщение"
              variant="outlined"
              margin="dense"
              multiline
              rows={4}
              color="primary"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton variant="contained" fullWidth type="submit">
              Отправить
            </SubmitButton>
          </ContactForm>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Сообщение успешно отправлено"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </StyledContainer>
  );
};

export default ContactsPage;
