import React, { useState, useEffect } from 'react';
import {
  collection, addDoc, query, orderBy, onSnapshot, where,
} from 'firebase/firestore';
import { db } from '../firebase';

import { useAuth } from '../contexts/authContext';

export default function FavoriteColor() {
  const [favoriteColor, setFavoriteColor] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'users'), where('email', '==', currentUser.email));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('this is query snapshot', doc.data());
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        email: '123@mail.com',
        username: 'erik93',
        wins: '5',
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
