import React, { useState, useEffect } from 'react';
import {
  Nav, Navbar, Modal, Button,
} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useNavigate } from 'react-router-dom';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/offers.css';
import annualTier from './background-images/annual-tier.jpeg';
import lifetimeTier from './background-images/lifetime-tier.jpeg';
import monthlyTier from './background-images/monthly-tier.webp';

library.add(faStar, faShoppingCart);

export default function Offers() {
  const [showlifeTime, setShowlifeTime] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const [showAnnual, setShowAnnual] = useState(false);

  const handleClose = () => {
    setShowlifeTime(false);
    setShowMonthly(false);
    setShowAnnual(false);
  };
  const handleShowLifetime = () => setShowlifeTime(true);
  const handleShowMonthly = () => setShowMonthly(true);
  const handleShowAnnual = () => setShowAnnual(true);
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
      <div className="header" style={{ background: '#F8F9FA', borderRadius: '5px', opacity: '0.8' }}>
        <h2 style={{ textAlign: 'center' }}>Membership Offers</h2>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="card" style={{ opacity: '0.8' }}>
            <div className="card-body" style={{ textAlign: 'center', background: '#F8F9FA' }}>
              <h5 className="card-title">Monthly</h5>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#CD7F32' }} size="lg" />
              </div>
              {/* <p className="card-text">$29.99</p> */}
              <img src={monthlyTier} className="card-img-top" alt="Product 1" />
              <Button variant="primary" onClick={handleShowMonthly}>
                $29.99
              </Button>
              <Modal show={showMonthly} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Monthly Tier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Access to 500 problems in 3 popular languages. Unlimited Usage.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Checkout
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{ opacity: '0.8' }}>
            <div className="card-body" style={{ textAlign: 'center', background: '#F8F9FA' }}>
              <h5 className="card-title">Annual</h5>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#C0C0C0' }} size="lg" />
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#C0C0C0' }} size="lg" />
              </div>
              {/* <p className="card-text">$299.99</p> */}
              <img src={annualTier} className="card-img-top" alt="Product 2" />
              <Button variant="primary" onClick={handleShowAnnual}>
                $299.99
              </Button>
              <Modal show={showAnnual} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Annual Tier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Access to 1000 problems in 10 popular languages. Unlimited Usage.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Checkout
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{ opacity: '0.8' }}>
            <div className="ribbon">Best Deal</div>
            <div
              className="card-body"
              style={{
                textAlign: 'center', background: '#F8F9FA',
              }}
            >
              <h5 className="card-title">Lifetime</h5>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#FFD700' }} size="lg" />
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#FFD700' }} size="lg" />
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#FFD700' }} size="lg" />
              </div>
              {/* <p className="card-text">$499.99</p> */}
              <div style={{ height: '135px', position: 'relative' }}>
                <img src={lifetimeTier} className="card-img-top" style={{ position: 'absolute', bottom: '10px', left: '0px' }} alt="Product 3" />
              </div>
              <Button variant="primary" onClick={handleShowLifetime}>
                $499.99
              </Button>

              <Modal show={showlifeTime} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Lifetime Tier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  20+ languages. New problems weekly. Access to Beta features
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Checkout
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
