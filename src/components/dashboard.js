import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../contexts/authContext';
import DashboardCalendar from './calendar';

library.add(faMedal, faArrowTrendUp);

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  async function closeDashboard() {
    setError('');

    try {
      navigate('/');
    } catch {
      setError('Failed to close Dashboard');
    }
  }

  return (
    <>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <DashboardCalendar />
          <img
            src="https://avatarfiles.alphacoders.com/228/thumb-228939.png"
            alt="Avatar"
            className="img-fluid my-5"
            style={{
              width: '70px', marginRight: '2rem', borderRadius: '50%', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }}
          />
          <strong>Email: </strong>
          {currentUser.email}
          <div className="text-center mt-2">
            <strong>Ranking: </strong>
            Rookie
            <FontAwesomeIcon icon="fa-solid fa-medal" size="lg" style={{ color: '#CD7F32' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Last 7 Days</strong>
              <strong>All Time</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                5
                <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" style={{ color: '#00FF00' }} />
              </p>
              <p>250</p>
            </div>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
      <div className="w-100 text-center mt-2">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Button variant="link" onClick={closeDashboard}>Close Dashboard</Button>
      </div>

    </>
  );
}

// TO DO //
// Nav Bar
// Home page that is simple codeMirror + iFrame
// Card & Route to configure settings
// Integrate a shared codeMirror/socket.io instance
// Integrate MongoDB with user profiles
// collaborative whiteboard (use excalidraw?)
// load user profile picture
// payment info
//
