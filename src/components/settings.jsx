// Change <ToggleButton> to <Form.Check>
import React from 'react';
import {
  Card, Button, Form, FormControl, Navbar, Nav,
} from 'react-bootstrap';
import './css/settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useNavigate } from 'react-router-dom';

library.add(faSadCry);

export default function Settings() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" justify="true" style={{ opacity: '0.75' }}>
        <nav className="navbar navbar-light bg-light">
          <a style={{ textDecoration: 'none' }} href="/"><span className="navbar-brand mb-0 h1">Function Junction</span></a>
        </nav>
        <Nav className="ms-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
          <BootstrapSwitchButton
            onstyle="outline-success"
            offstyle="outline-danger"
            offlabel="Idle"
            onlabel="Ready!"
            onChange={() => navigate('/dashboard')}
            width={100}
          />
        </Nav>
      </Navbar>
      <Card>
        <Card.Header>
          <h2>Settings</h2>
        </Card.Header>
        <div style={{ display: 'flex', margin: '1rem' }}>
          {/* <input style={{ display: 'flex', margin: 'auto' }} type="checkbox" />
        <p style={{ display: 'flex', margin: 'auto' }}>Disable Background MP4</p> */}
          <label style={{ margin: 'auto', marginRight: '1rem' }} htmlFor="cb01">Disable Background MP4</label>
          <input defaultChecked type="checkbox" id="cb01" />
        </div>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Block Users</Form.Label>
              <FormControl type="text" placeholder="Enter user name" />
              <Button variant="primary">Block</Button>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Ask a Question to Support</Form.Label>
              <FormControl as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Button variant="danger" className="mt-3">
            <span style={{ marginRight: '0.5rem' }}>Cancel Membership</span>
            <FontAwesomeIcon size="lg" icon="fa-solid fa-face-sad-cry" />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
