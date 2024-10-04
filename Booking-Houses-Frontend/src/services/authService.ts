import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    localStorage.setItem('token', response.data.access_token); // Сохраняем токен в localStorage
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw new Error('Failed to login');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
