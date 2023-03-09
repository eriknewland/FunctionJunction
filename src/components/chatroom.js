/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import { useAuth } from '../contexts/authContext';

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  // const [socket, setSocket] = useState(null);

  const { currentUser, logout } = useAuth();

  const socket = socketIOClient('http://localhost:8000');
  // setSocket(socket);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('message', (data) => {
      setMessages([...messages, { user: currentUser.email, message: data }]);
    });
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', `${currentUser.email}:${message}`);
    setMessage('');
  };

  return (
    <Card>
      <Card.Body>
        {console.log(messages)}
        <div>
          <h1>Messages</h1>
          <h6>Brainstorm here!</h6>
          <br />
          {messages.map((message, index) => (
            <p key={index}>
              <strong style={{ fontSize: '14px' }}>
                {message.message.split(':')[0]}
              </strong>
              <p style={{ fontSize: '12px' }}>{message.message.split(':')[1]}</p>
            </p>
          ))}
          <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={handleChange} />
            <button type="submit">Send</button>
          </form>
        </div>
      </Card.Body>
    </Card>

  );
}
