/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import './css/navbar.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faX);

export default function NavHeader({ qeued, setQeued }) {
  const [showAdvertisement, setShowAdvertisement] = useState(true);
  const navigate = useNavigate();

  // const matchMaker = () => {

  // };

  const closeAdvertisement = () => {
    document.getElementsByClassName('party')[0].classList.add('time');
    setTimeout(() => {
      // console.log(document.getElementsByClassName('party')[0].classList);
      setShowAdvertisement(false);
    }, 950);
  };
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" justify="true" style={{ opacity: '0.75' }}>
        <nav className="navbar navbar-light bg-light">
          <a style={{ textDecoration: 'none' }} href="/"><span className="navbar-brand mb-0 h1">Function Junction</span></a>
        </nav>
        <Nav className="ms-auto">
          <Nav.Link href="/offers">Go Pro Today!</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
          <BootstrapSwitchButton
            onstyle="outline-success"
            offstyle="outline-danger"
            offlabel="Idle"
            onlabel="Ready!"
            onChange={() => setQeued(!qeued)}
            width={100}
          />
        </Nav>
      </Navbar>
      {showAdvertisement
      && (
      <Navbar
        bg="success"
        className="party"
        expand="lg"
        fixed="top"
        justify="true"
        style={{
          opacity: '1', fontSize: '12px', textAlign: 'center', justifyContent: 'center',
        }}
      >
        <a href="/offers" style={{ color: 'black', textDecoration: 'none' }}><strong>&#127881;Upgrade today and save 30%&#127881;</strong></a>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          style={{
            position: 'absolute', right: '0px', top: '0px', border: 'none', background: 'none',
          }}
          onClick={closeAdvertisement}
        >
          <span aria-hidden="True"><FontAwesomeIcon icon="fa-solid fa-x" /></span>
        </button>
      </Navbar>
      )}
    </>
  );
}
