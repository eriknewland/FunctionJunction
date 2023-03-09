import React, { useRef, useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import PhotoUpdate from './photoUpdate';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, emailChange, passwordChange } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    const promises = [];
    setError('');
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(emailChange(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(passwordChange(passwordRef.current.value));
    }
    Promise.all(promises).then(() => {
      navigate('/');
    }).catch(() => {
      setError('Failed to update account');
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{ marginTop: '1rem' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id="password" style={{ marginTop: '1rem' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required placeholder="Leave blank to keep the same" />
            </Form.Group>
            <Form.Group id="password-confirm" style={{ marginTop: '1rem' }}>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Leave blank to keep the same" />
            </Form.Group>
            <PhotoUpdate />
            <Button disabled={loading} className="w-100" type="submit" style={{ marginTop: '1rem' }}>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
