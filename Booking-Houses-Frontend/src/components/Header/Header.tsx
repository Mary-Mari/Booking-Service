import React, { useState } from "react";
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
  Grid,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const messengerIcons = (
    <Box display="flex" justifyContent="center" mt={2}>
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
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#333333" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "#f5f5f5", textDecoration: "none" }}
          >
            My House .
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button sx={{ color: "#f5f5f5" }} component={Link} to="/booking">
              Забронировать
            </Button>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "#f5f5f5" }} />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List style={{ textTransform: "uppercase" }}>
          <ListItem
            button
            component={Link}
            to="/booking"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Забронировать" sx={{ color: "#333333" }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/cottages"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Коттеджи" sx={{ color: "#333333" }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/glamping"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Глэмпинг" sx={{ color: "#333333" }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/services"
            onClick={toggleDrawer(false)}
          >
            <ListItemText
              primary="Дополнительные услуги"
              sx={{ color: "#333333" }}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/contacts"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Контакты" sx={{ color: "#333333" }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/reviews"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Отзывы" sx={{ color: "#333333" }} />
          </ListItem>
          <ListItem>
            <Box mt={1}>{messengerIcons}</Box>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
