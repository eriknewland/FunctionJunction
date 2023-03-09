import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './css/dashboard.css';
import Tooltip from 'react-tooltip';
import { Modal, Button } from 'react-bootstrap';

export default function DashboardCalendar() {
  const [showModal, setShowModal] = useState(false);
  const [probsSolved, setProbsSolved] = useState(0);
  const today = new Date();

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomValues = getRange(200).map((index) => ({
    date: shiftDate(today, -index),
    count:
     getRandomInt(1, 3),
  }));

  return (
    <>
      <div>
        <p>Activity Log</p>
        <CalendarHeatmap
          startDate={shiftDate(today, -150)}
          endDate={today}
          values={randomValues}
          onClick={(value) => {
            setProbsSolved(value.count);
            setShowModal(true);
          }}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => ({ 'data-tip': `${value.count ? value.count : '0'} function${value.count !== 1 ? 's' : ''} junctioned on ${value.date ? value.date.toString().slice(0, 10) : 'my day off!'}` })}
        />
        <Tooltip />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {probsSolved}
            {' '}
            problems solved
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.from(Array(probsSolved).keys()).map((i) => (
            <p key={i}>
              Problem
              {' '}
              {i + 1}
              :
              {' '}
              <span style={{ fontSize: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
