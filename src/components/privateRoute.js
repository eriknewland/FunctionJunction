/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return (
    currentUser ? <div className="w-100" style={{ maxWidth: '400px' }}>{children}</div> : <Navigate to="/login" />
  );
}

{ /* <div className="w-100" style={{ maxWidth: '400px' }}></div> */ }
