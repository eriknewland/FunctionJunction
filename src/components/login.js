import React, { useRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={{ opacity: '0.75' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
            <Button disabled={loading} className="w-100" type="submit" style={{ marginTop: '1rem' }}>Log In</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?
        {' '}
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
