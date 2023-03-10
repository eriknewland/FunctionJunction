/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  Card, Button, Alert, Nav, Navbar,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import {
  collection, query, onSnapshot, where,
} from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import DashboardCalendar from './calendar';
import PhotoUpload from './photoUpload';
import { db } from '../firebase';

library.add(faMedal, faArrowTrendUp);

export default function Dashboard() {
  const [totalWinCount, setTotalWinCount] = useState(0);
  const [lastSevenDays, setLastSevenDays] = useState(0);
  const [username, setUsername] = useState('');
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

  // eslint-disable-next-line no-unused-vars
  async function closeDashboard() {
    setError('');

    try {
      navigate('/');
    } catch {
      setError('Failed to close Dashboard');
    }
  }

  useEffect(() => {
    const nameQuery = query(collection(db, 'users'), where('email', '==', currentUser.email));
    onSnapshot(nameQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUsername(doc.data().username);
      });
    });
    const winsQuery = query(collection(db, 'users'), where('email', '==', currentUser.email));
    onSnapshot(winsQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setLastSevenDays(doc.data().wins);
        setTotalWinCount(doc.data().total_wins);
      });
    });
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" justify="true" style={{ opacity: '0.75' }}>
        <nav className="navbar navbar-light bg-light">
          <a style={{ textDecoration: 'none' }} href="/"><span className="navbar-brand mb-0 h1">Function Junction</span></a>
        </nav>
        <Nav className="ms-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
          <BootstrapSwitchButton
            onstyle="outline-success"
            offstyle="outline-danger"
            offlabel="Idle"
            onlabel="Ready!"
            onChange={() => navigate('/dashboard')}
            width={100}
          />
        </Nav>
      </Navbar>
      <Card style={{ marginTop: '6rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <DashboardCalendar />
          <div style={{ display: 'flex' }}>
            <PhotoUpload />
            <div style={{ margin: 'auto', marginLeft: '1rem' }}>
              <strong>Username: </strong>

              {username}
            </div>

          </div>
          <div className="text-center mt-2">
            <strong>Ranking: </strong>
            Rookie
            <FontAwesomeIcon icon="fa-solid fa-medal" size="lg" style={{ color: '#CD7F32' }} />
            <p>
              <span style={{ fontWeight: 'bold' }}>Membership: </span>
              Free
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Last 7 Days</strong>
              <strong>All Time</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                {lastSevenDays}
                {' '}
                {lastSevenDays > 4 && <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" style={{ color: '#00FF00' }} />}
              </p>
              <p>{totalWinCount}</p>
            </div>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <div className="w-100 text-center mt-2">
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Button className="btn btn-primary w-100 mt-3" onClick={handleLogout}>Log Out</Button>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        {/* <Button variant="link" onClick={closeDashboard}>Close Dashboard</Button> */}
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
