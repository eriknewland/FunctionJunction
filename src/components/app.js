import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import SlideRoutes from 'react-slide-routes';
import Signup from './signup';
import { AuthProvider } from '../contexts/authContext';
import Dashboard from './dashboard';
import Login from './login';
import PrivateRoute from './privateRoute';
import ForgotPassword from './forgotPassword';
import BeepBoop from './background-images/login-background.mp4';
import './css/style.css';
import UpdateProfile from './updateProfile';
import HomePage from './homePage';
import Settings from './settings';
import PrivateHomePage from './privateHomePage';
import Offers from './offers';
import PairedInstance from './pairedInstance';

export default function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <video
        autoPlay
        muted
        loop
        id="video"
        style={{
          zIndex: '-1', position: 'fixed', top: 0, left: 0, width: 'auto', height: 'auto',
        }}
      >
        <source src={BeepBoop} type="video/mp4" />
      </video>
      <div>
        <Router>
          <AuthProvider>
            <SlideRoutes timing="ease" duration={350}>
              <Route
                path="/dashboard"
                element={(
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/update-profile"
                element={(
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/"
                element={(
                  <PrivateHomePage>
                    <HomePage />
                  </PrivateHomePage>
                )}
              />
              <Route
                path="/paired-instance"
                element={(
                  <PrivateHomePage>
                    <PairedInstance />
                  </PrivateHomePage>
                )}
              />
              <Route
                path="/offers"
                element={(
                  <PrivateHomePage>
                    <Offers />
                  </PrivateHomePage>
                )}
              />
              <Route
                path="/settings"
                element={(
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                )}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </SlideRoutes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
