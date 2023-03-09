/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, Button, Alert, Nav, Navbar,
} from 'react-bootstrap';
import { useAuth, upload } from '../contexts/authContext';
import './css/uploadpicture.css';

import noAvatar from './background-images/no-avatar.png';

export default function PhotoUpdate() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(noAvatar);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading, setPhotoURL)
      .then(() => console.log(currentUser.currentUser.photoURL));
    // .then(() => setPhotoURL(currentUser.currentUser.photoURL));
  }

  useEffect(() => {
    setPhotoURL(currentUser.currentUser.photoURL);
  }, []);

  return (
    <>
      <h5 style={{ textAlign: 'center', marginTop: '2rem' }}>Update Profile Photo</h5>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '300px', margin: '0px',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0px',
        }}
        >
          <input
            type="file"
            onChange={handleChange}
            style={{
              width: '100px', marginLeft: '3rem', marginRight: '1rem',
            }}
          />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', marginRight: '3rem', marginLeft: '1rem', marginTop: '1rem', marginBottom: '1rem',
        }}
        >
          <img src={photoURL} alt="Avatar" className="avatar" />
        </div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '0px' }}>
        <button type="button" disabled={loading || !photo} onClick={handleClick}>Upload</button>
      </div>
    </>
  );
}
