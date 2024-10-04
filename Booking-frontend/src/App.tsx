import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HouseDetailsPage from './pages/HouseDetailsPage';
import BookingPage from './pages/BookingPage';
import GlampingPage from './pages/GlampingPage';
import GlampingDetailsPage from './pages/GlampingDetailsPage';
import ServicesPage from './pages/ServicesPage';
import CottagesPage from './pages/CottagesPage';
import ContactsPage from './pages/ContactsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { Box } from '@mui/material';
import ReviewsPage  from './pages/ReviewsPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Box sx={{ pt: 8, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/* Добавляем отступ сверху и растягиваем содержимое */}
          <Box sx={{ flexGrow: 1 }}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/login/dashboard" component={AdminDashboardPage} />
          <Route path="/cottages" component={CottagesPage} />
          <Route path="/houses/:id" component={HouseDetailsPage} />
          <Route path="/glamping" component={GlampingPage} />
          <Route path="/glampings/:id" component={GlampingDetailsPage} />
          <Route path="/booking" component={BookingPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/reviews" component={ReviewsPage} />
        </Switch>
        </Box>
        <Footer />
        </Box>
      </div>
    </Router>
  );
}

export default App;
