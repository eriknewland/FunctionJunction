/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from 'react';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';
import { auth } from '../firebase';

const AuthContext = React.createContext();
const storage = getStorage();

export function useAuth() {
  return useContext(AuthContext);
}

export async function upload(file, currentUser, setLoading, setPhotoURL) {
  const fileRef = ref(storage, `${currentUser.currentUser.uid}.png`);

  setLoading(true);
  // const metadata = {
  //   contentType: 'image/png',
  // };

  // eslint-disable-next-line no-unused-vars
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  console.log(photoURL);

  updateProfile(currentUser.currentUser, { photoURL });

  setPhotoURL(photoURL);

  setLoading(false);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function emailChange(email) {
    return updateEmail(currentUser, email);
  }

  function passwordChange(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    emailChange,
    passwordChange,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  );
}
