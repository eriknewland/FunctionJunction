import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import './css/navbar.css';

export default function NavHeader() {
  return (
    <Navbar bg="light" expand="lg" fixed="top" justify="true" style={{ opacity: '0.5' }}>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Function Junction</span>
      </nav>
      <Nav className="ms-auto">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        <BootstrapSwitchButton
          onstyle="outline-success"
          offstyle="outline-danger"
          offlabel="Idle"
          onlabel="Ready!"
          width={100}
        />
      </Nav>
    </Navbar>
  );
}
