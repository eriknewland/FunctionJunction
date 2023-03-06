import React, { useState, useEffect } from 'react';
import {
  collection, addDoc, query, orderBy, onSnapshot,
} from 'firebase/firestore';
import { getApps } from 'firebase/app';
import { db } from '../firebase';

// import { useAuth } from '../contexts/authContext';
// const { currentUser } = useAuth();

export default function FavoriteColor() {
  const [favoriteColor, setFavoriteColor] = useState('');

  useEffect(() => {
    // console.log(getApps());
    const q = query(collection(db, 'users'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('this is query snapshot', doc.data());
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'testing'), {
        color: favoriteColor,
      });
      console.log('Document written with ID: ', 'y no hit');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Favorite Color"
        value={favoriteColor}
        onChange={(e) => setFavoriteColor(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
