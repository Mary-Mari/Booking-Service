import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { login } from "../services/authService";

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "100%",
  backgroundColor: "#333333",
  color: "#f5f5f5",
  "&:hover": {
    backgroundColor: "#555555",
  },
});

const ErrorText = styled(Typography)({
  color: "red",
  marginBottom: "10px",
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password); // Здесь происходит вызов функции login из authService
      history.push("/login/dashboard"); // Переход на страницу администратора после успешного входа
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Неправильный mail или пароль");
      } else {
        setError("Ошибка входа");
      }
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleLogin}>
        <Typography
          variant="h5"
          style={{ color: "#333333", marginBottom: "20px" }}
        >
          Вход для администратора
        </Typography>
        <StyledTextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledTextField
          type="password"
          id="password"
          label="Пароль"
          variant="outlined"
          color="primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorText variant="body1">{error}</ErrorText>}
        <StyledButton type="submit" variant="contained">
          Войти
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginPage;
