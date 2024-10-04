import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getToken, isAuthenticated, logout } from "../services/authService";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddHouseForm from "../pages/AddHouseForm";
import { House } from "../interfaces/house.interface";
import { Glamping } from "../interfaces/glamping.interface";
import AddGlampingForm from "../pages/AddGlampingForm";

interface DashboardData {
  message: string;
}

const AdminDashboardPage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [glampings, setGlampings] = useState<Glamping[]>([]);
  const history = useHistory();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHouses = async () => {
      const fetchedToken = getToken();
      setToken(fetchedToken);

      // отображение списка домов
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/houses`, {
          headers: {
            Authorization: `Bearer ${fetchedToken}`,
          },
        });
        setHouses(response.data);
      } finally {
        setLoading(false);
      }
    };

    // отображение списка глэмп
    const fetchGlampings = async () => {
      const fetchedToken = getToken();
      setToken(fetchedToken);

      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/glampings`, {
          headers: {
            Authorization: `Bearer ${fetchedToken}`,
          },
        });
        setGlampings(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchGlampings();
    fetchHouses();
  }, []);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  // добавление дома
  const handleAddHouse = async (formData: FormData) => {
    try {
      const response = await axios.post(`${apiUrl}/houses/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const newHouse: House = response.data; // Проверьте, что response.data содержит нужные данные
      setHouses((prevHouses) => [...prevHouses, newHouse]);

      setSnackbarMessage("Дом успешно добавлен");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Ошибка при добавлении дома:", err);
      setSnackbarMessage("Произошла ошибка при добавлении дома");
      setSnackbarOpen(true);
    }
  };

  // добавление глэмпинга
  const handleAddGlamping = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/glampings/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newGlamping: Glamping = response.data;
      setGlampings((prevGlampings) => [...prevGlampings, newGlamping]);

      setSnackbarMessage("Глэмпинг успешно добавлен");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Ошибка при добавлении глэмпинга:", err);
      setSnackbarMessage("Произошла ошибка при добавлении глэмпинга");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteHouse = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/houses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHouses((prevHouses) => prevHouses.filter((house) => house._id !== id));

      setSnackbarMessage("Дом успешно удален");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Ошибка при удалении дома:", err);
      setSnackbarMessage("Произошла ошибка при удалении дома");
      setSnackbarOpen(true);
    }
  };

  //удаление глэмп
  const handleDeleteGlamping = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/glampings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGlampings((prevGlampings) =>
        prevGlampings.filter((glamping) => glamping._id !== id)
      );

      setSnackbarMessage("Глэмпинг успешно удален");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Ошибка при удалении глэмпинга:", err);
      setSnackbarMessage("Произошла ошибка при удалении глэмпинга");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!isAuthenticated()) {
    history.push("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Административная панель
      </Typography>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        sx={{ marginBottom: "20px" }}
      >
        Выйти
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Внесите данные для нового дома
          </Typography>
          <AddHouseForm onSubmit={handleAddHouse} token={token} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Внесите данные для нового глэмпинга
          </Typography>
          <AddGlampingForm onSubmit={handleAddGlamping} token={token} />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        Дома
      </Typography>
      {loading ? (
        <Typography>Загрузка...</Typography>
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(houses) &&
            houses.map((house) => (
              <Grid item key={house._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    src={`${apiUrl}/public/${house.image}`}
                    alt={house.title}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {house.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {house.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Цена: {house.price} руб.
                    </Typography>
                  </CardContent>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteHouse(house._id || "")}
                    sx={{ top: "5px", right: "5px", color: "#333333" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}

      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        Глэмпинги
      </Typography>
      {loading ? (
        <Typography>Загрузка...</Typography>
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(glampings) &&
            glampings.map((glamping) => (
              <Grid item key={glamping._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    src={`${apiUrl}/public/${glamping.image}`}
                    alt={glamping.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {glamping.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {glamping.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Цена: {glamping.price} руб.
                    </Typography>
                  </CardContent>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteGlamping(glamping._id || "")}
                    sx={{ top: "5px", right: "5px", color: "#333333" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        key={snackbarMessage}
      />
    </Container>
  );
};

export default AdminDashboardPage;
