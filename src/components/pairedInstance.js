/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './css/codemirror.css';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
// import logo from '../logo.svg';
import { dracula } from '@uiw/codemirror-theme-dracula';
import io from 'socket.io-client';
import {
  Card, Modal, Button, Alert, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Fireworks } from '@fireworks-js/react';
import NavHeaderNoToggle from './navHeaderNoToggle';
import ChatRoom from './chatroom';

export default function CodeMirrorHomePage() {
  const [srcDocValue, setSrcDocValue] = useState('//Create a function that adds two numbers together\nconst sumFunction = () => {};');
  const [testData, setTestData] = useState({
    funcName: 'sumFunction', funcSkeleton: 'const sumFunction = () => {};', funcTests: ['Testing sumFunction(5,5). Expecting 10: ', 'Testing sumFunction(-5,5). Expecting 0: ', 'Testing sumFunction(-5,-5). Expecting -10: '], funcParams: ['(5,5)', '(-5, 5)', '(-5, -5)'],
  });
  const [problemSolved, setProblemSolved] = useState(null);
  const [problemSolved2, setProblemSolved2] = useState(false);
  const [tracker, setTracker] = useState(0);
  const socket = io('http://localhost:8000');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('code-collab', (data) => {
      // console.log(data);
      setSrcDocValue(data);
    });
    socket.on('run-ide', (data) => {
      const regex = /<span>10<\/span>/;
      const match = data.match(regex);
      console.log(match);

      console.log(tracker);
      document.getElementById('myIframe').srcdoc = `${data}`;
      if (match) {
        setTimeout(() => {
          setProblemSolved(true);
        }, 500);
      }
      setProblemSolved(false);
      // match ? setProblemSolved(true) : setProblemSolved(false);
    });
    // socket.on('total-users-online', (data) => {
    //   console.log(`Total users online: ${data}`);
    //   // setTotalUsersOnline(data);
    // });
  }, []);

  const runIDE = () => {
    // const test = `${srcDocValue}sumFunction(5,5)`;
    const test1 = `${srcDocValue}${testData.funcName}${testData.funcParams[0]}`;
    const test2 = `${srcDocValue}${testData.funcName}${testData.funcParams[1]}`;
    const test3 = `${srcDocValue}${testData.funcName}${testData.funcParams[2]}`;
    const iframe = document.getElementById('myIframe');
    iframe.contentWindow.document.open();
    /* eslint-disable no-eval */
    // iframe.contentWindow.document.write(`Testing sumFunction(5,5):${eval(test)}`);
    iframe.contentWindow.document.write(`<div className="test">${testData.funcTests[0]}<span className="result">${eval(test1)}</span></div>`);
    iframe.contentWindow.document.write(`<p className="test">${testData.funcTests[1]}<span className="result">${eval(test2)}</span></p>`);
    iframe.contentWindow.document.write(`<p className="test">${testData.funcTests[2]}<span className="result">${eval(test3)}</span></p>`);
    const spans = iframe.contentWindow.document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i += 1) {
      spans[i].style.float = 'right';
    }
    /* eslint-disable no-unused-expressions */
    eval(test1) === 10 ? spans[0].style.color = 'green' : spans[0].style.color = 'red';
    eval(test2) === 0 ? spans[1].style.color = 'green' : spans[1].style.color = 'red';
    eval(test3) === -10 ? spans[2].style.color = 'green' : spans[2].style.color = 'red';
    /* DEMO DAY CODE */
    // eval(test1) === 10 ? setProblemSolved(true) : setProblemSolved(false);

    /* DEMO DAY CODE */
    iframe.contentWindow.document.body.style.fontFamily = 'monospace';
    iframe.contentWindow.document.close();
    socket.emit('run-ide', document.getElementById('myIframe').srcdoc = `<style>span { font-family: monospace; color: ${eval(`${srcDocValue}${testData.funcName}${testData.funcParams[0]}`) === 10 ? 'green' : 'red'}; float: right; } div { font-family: monospace; margin: 10px;}</style><div>Testing sumFunction(5,5). Expecting 10: <span>${eval(test1)}</span></div><div>Testing sumFunction(-5,5). Expecting 0: <span>${eval(test2)}</span></div><div>Testing sumFunction(-5,-5). Expecting -10: <span>${eval(test3)}</span></div>`);
  };

  const handleClose = () => navigate('/');

  return (
    <>
      <NavHeaderNoToggle />
      <Row>
        <Card style={{
          backgroundColor: 'rgba(251, 251, 251, 0.5)', marginTop: '5rem', minWidth: '600px', minHeight: '600px', borderRadius: '20px',
        }}
        >
          <Card.Body>
            <div style={{ display: 'flex' }}>
              <h2>Problem 001: SumFunction</h2>
              {problemSolved === false
   && (
   <Alert
     variant="danger"
     style={{
       width: '200px', height: '30px', margin: 'auto', padding: '0', textAlign: 'center',
     }}
   >
     Close! Please try again
   </Alert>
   )}
            </div>
            <CodeMirror
              value={srcDocValue}
              height="400px"
              width="600px"
              theme={dracula}
              extensions={[loadLanguage('javascript')]}
              onChange={(value) => {
                setSrcDocValue(value);
                socket.emit('code-collab', value);
              }}
            />
            <iframe
              title="idk"
              style={{
                height: '100px', width: '600px', border: '2px solid black', display: 'flex', margin: 'auto', background: 'whitesmoke', justifyContent: 'center', marginTop: '1rem', borderRadius: '20px',
              }}
              id="myIframe"
            />
            <button
              className="btn btn-warning"
              style={{
                flexDirection: 'column', display: 'flex', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', marginTop: '0.75rem',
              }}
              type="button"
              onClick={runIDE}
            >
              Click to run your function
            </button>
          </Card.Body>
        </Card>
        <div style={{
          position: 'absolute', top: '89px', width: '250px', left: '-5px', marginLeft: '2rem',
        }}
        >
          <ChatRoom />
        </div>
      </Row>
      <Modal show={problemSolved} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congrats! Awesome teamwork!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Return Home
          </Button>
          <div style={{}}>
            <Fireworks
              options={{
                rocketsPoint: {
                  min: 0,
                  max: 100,
                },
              }}
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: '#000',
                zIndex: '-1',
                opacity: '0.5',
              }}
            />
          </div>

        </Modal.Footer>
      </Modal>
    </>
  );
}
