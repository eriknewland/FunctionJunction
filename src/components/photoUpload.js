import React, { useEffect, useState } from 'react';
import { useAuth, upload } from '../contexts/authContext';
import './css/uploadpicture.css';

export default function PhotoUpload() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading)
      .then(() => setPhotoURL(currentUser.currentUser.photoURL));
  }

  useEffect(() => {
    console.log(currentUser);
    setPhotoURL(currentUser.currentUser.photoURL);
  }, [currentUser, loading]);

  return (
    <div className="fields">
      {/* <input type="file" onChange={handleChange} /> */}
      {/* <button disabled={loading || !photo} onClick={handleClick}>Upload</button> */}
      <img src={photoURL} alt="Avatar" className="avatar" />
    </div>

  );
}
