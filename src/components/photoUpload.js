/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuth, upload } from '../contexts/authContext';
import {
  Card, Button, Alert, Nav, Navbar,
} from 'react-bootstrap';
import './css/uploadpicture.css';
import axios from 'axios';
import noAvatar from './background-images/no-avatar.png';

export default function PhotoUpload() {
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
    upload(photo, currentUser, setLoading)
      .then(() => setPhotoURL(currentUser.currentUser.photoURL));
  }

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'false', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '44459f35fdmsh06e87ca64c5a14bp196835jsnc2468000a707',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      useQueryString: true,
    },
    data: '{"language_id":62,"source_code":"public class Main { public static void main(String[] args) {  System.out.println(2 + 2); } };","stdout":"SnVkZ2Uw"}',
  };

  const options2 = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/a2fd8daa-8381-4885-abb0-be4ebcebf1d2', // update the token here
    params: {
      base64_encoded: 'false',
      fields: '*',
    },
    headers: {
      'X-RapidAPI-Key': '44459f35fdmsh06e87ca64c5a14bp196835jsnc2468000a707',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
  };
  useEffect(() => {
    console.log(currentUser);
    setPhotoURL(currentUser.currentUser.photoURL);
    // axios.request(options).then((response) => {
    //   console.log(response.data.token);
    //   // alert(response.data.stdout);
    //   axios.request({ ...options2, url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}` }).then((response) => {
    //     console.log(response.data.stdout);
    //   });
    // }).catch((error) => {
    //   console.error(error);
    // });
  }, [currentUser, loading]);

  return (
    <div className="fields">
      {/* <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button> */}
      <img src={photoURL} alt="Avatar" className="avatar" />
    </div>
  );
}
