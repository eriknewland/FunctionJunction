import React, { useRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection, addDoc, query, orderBy, onSnapshot,
} from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { db } from '../firebase';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await addDoc(collection(db, 'users'), {
        email: emailRef.current.value,
        username: passwordRef.current.value,
        wins: '0',
      });
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{ marginTop: '1rem' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" style={{ marginTop: '1rem' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" style={{ marginTop: '1rem' }}>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" style={{ marginTop: '1rem' }}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
        {' '}
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
