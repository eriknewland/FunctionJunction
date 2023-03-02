import React, { useRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');
  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{ marginTop: '1rem' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" style={{ marginTop: '1rem' }}>Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
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
