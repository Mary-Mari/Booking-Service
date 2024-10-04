import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#333333",
        color: "#f5f5f5",
        top: "auto",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">
              Отдел продаж <br />
              eжедневно с 9:00 до 21:00
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" style={{ marginLeft: "8px" }}>
              Ленинградская область, д.Ягодное
            </Typography>
            <IconButton
              color="inherit"
              href="https://wa.me/номер-телефона"
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://telegram.me/ваш-аккаунт"
              target="_blank"
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://vk.com/ваш-аккаунт"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
