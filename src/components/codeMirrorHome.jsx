/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './css/codemirror.css';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
// import logo from '../logo.svg';
import { dracula } from '@uiw/codemirror-theme-dracula';
import io from 'socket.io-client';
import {
  Card, Modal, Button, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  collection, addDoc, query, orderBy, onSnapshot, where,
} from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { db } from '../firebase';

export default function CodeMirrorHomePage({ qeued, setQeued }) {
  // STATES
  const { currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [srcDocValue, setSrcDocValue] = useState(`Hello ${username}\n\nWelcome to Function Junction\n\nQueue up to find a coding partner\n\nOr play around in the sandbox`);
  const [testData, setTestData] = useState({
    funcName: 'sumFunction', funcSkeleton: 'const sumFunction = () => {};', funcTests: ['Testing sumFunction(5,5). Expecting 10: ', 'Testing sumFunction(-5,5). Expecting 0: ', 'Testing sumFunction(-5,-5). Expecting -10: '], funcParams: ['(5,5)', '(-5, 5)', '(-5, -5)'],
  });
  const [show, setShow] = useState(false);
  const [totalUsersOnline, setTotalUsersOnline] = useState(0);
  const [pyOutput, setPyOutput] = useState(null);
  const [pythonAPI, setPythonAPI] = useState(null);
  const [langSelect, setLangSelect] = useState('javascript');
  const [langID, setLangID] = useState(null);

  // SERVER/NAVIGATION

  const navigate = useNavigate();
  const socket = io('http://localhost:8000');

  const strLiteral = btoa('public class Main { public static void main(String[] args) { System.out.println(Math.random() * 100);} };');

  const strLiteral2 = btoa(srcDocValue); // working

  // AXIOS OPTIONS FOR JUDGE0 API
  const judgeOptionsPost = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '44459f35fdmsh06e87ca64c5a14bp196835jsnc2468000a707',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      useQueryString: true,
    },
    data: `{"language_id":${langID},"source_code": "${strLiteral2}","stdout":"SnVkZ2Uw"}`, // 54 is c++. THIS THING WORKS OMG
  };

  // sample JAVA code...
  // public class Main { public static void main(String[] args) {  System.out.println(2 + 2); } };

  const judgeOptionsGet = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/a2fd8daa-8381-4885-abb0-be4ebcebf1d2', // update the token here
    params: {
      base64_encoded: 'false',
      fields: '*',
    },
    headers: {
      'X-RapidAPI-Key': '44459f35fdmsh06e87ca64c5a14bp196835jsnc2468000a707',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
  };

  // CONTEXT

  useEffect(() => {
    const q = query(collection(db, 'users'), where('email', '==', currentUser.email));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('this is query snapshot', doc.data());
        console.log(doc.data().username);
        setSrcDocValue(`Hello ${doc.data().username}\n\nWelcome to Function Junction\n\nQueue up to find a coding partner\n\nOr play around in the sandbox`);
      });
    });
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('code-collab', (data) => {
      // console.log(data);
      setSrcDocValue(data); // consider removing this line
    });
    socket.on('run-ide', (data) => {
      console.log(data);
      document.getElementById('myIframe').srcdoc = `${data}`;
    });
    socket.on('total-users-online', (data) => {
      console.log(`Total users online: ${data}`);
      setTotalUsersOnline(data);
    });
    setTimeout(() => {
      if (totalUsersOnline >= 2 && qeued) {
        setShow(true);
      }
    }, 2000);
    // INITIALIZE PYTHON PARSER
    const run = async () => {
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
      });
      setPythonAPI(pyodide);
    };
    // RUN JAVA CODE
    // axios.request(options).then((response) => {
    //   console.log(response.data.token);
    //   // alert(response.data.stdout);
    //   axios.request({ ...options2, url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}` }).then((response) => {
    //     console.log(response.data.stdout);
    //     const iframe = document.getElementById('myIframe');
    //     iframe.contentWindow.document.open();
    //     iframe.contentWindow.document.write(response.data.stdout);
    //     iframe.contentWindow.document.close();
    //   });
    // }).catch((error) => {
    //   console.error(error);
    // });
    if (pythonAPI === null) run();
    // if (langSelect === 'python') {
    //   setSrcDocValue('# Play around in the sandbox between problems');
    // } else {
    //   setSrcDocValue('//Play in the sandbox between problems!');
    // }
  }, [qeued, langSelect]);

  // RUN PYTHON SCRIPT
  const runPythonScript = async (code) => {
    const compiledPython = await pythonAPI.runPythonAsync(srcDocValue);
    console.log(srcDocValue);
    setPyOutput(compiledPython);
    const iframe = document.getElementById('myIframe');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(compiledPython);
    iframe.contentWindow.document.close();
  };

  // RUN JAVA
  const runJava = () => {
    axios.request(judgeOptionsPost).then((response) => {
      console.log(response.data.token);
      // alert(response.data.stdout);
      axios.request({ ...judgeOptionsGet, url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}` }).then((response) => {
        console.log(response.data.stdout);
        const iframe = document.getElementById('myIframe');
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(response.data.stdout);
        iframe.contentWindow.document.close();
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  // CLOSE NEW MATCH MODAL
  const handleClose = () => setShow(false);

  // ACCEPT NEW MATCH MODAL
  const handleYes = () => {
    setShow(false);
    navigate('/paired-instance');
  };

  // RUN CODEMIRROR - DEFAULT TO JAVASCRIPT

  const runIDE = () => {
    if (langSelect === 'javascript') {
      const iframe = document.getElementById('myIframe');
      iframe.contentWindow.document.open();
      /* eslint-disable no-eval */
      iframe.contentWindow.document.write(eval(srcDocValue));
      iframe.contentWindow.document.close();
    } else if (langSelect === 'python') {
      runPythonScript();
    } else if (langSelect === 'java') {
      runJava();
    } else if (langSelect === 'C++') {
      runJava();
    } else {
      runJava();
    }
  };

  const handleLangSelect = (eventKey) => {
    setLangSelect(eventKey);
    if (eventKey === 'C++') {
      console.log('hi');
      setLangID(54);
    }
    if (eventKey === 'java') {
      setLangID(62);
    }
    if (eventKey === 'ruby') {
      setLangID(72);
    }
    if (eventKey === 'swift') {
      setLangID(83);
    }
  };

  return (
    <>
      <Card style={{
        backgroundColor: 'rgba(251, 251, 251, 0.5)', marginTop: '5rem', minWidth: '600px', minHeight: '600px',
      }}
      >
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Sandbox</h2>
            <DropdownButton
              title={langSelect}
              onSelect={handleLangSelect}
              id="dropdown-basic-button"
            >
              <Dropdown.Item eventKey="javascript">Javascript</Dropdown.Item>
              <Dropdown.Item eventKey="C++">C++</Dropdown.Item>
              <Dropdown.Item eventKey="java">Java</Dropdown.Item>
              <Dropdown.Item eventKey="python">Python</Dropdown.Item>
              <Dropdown.Item eventKey="ruby">Ruby</Dropdown.Item>
              <Dropdown.Item eventKey="swift">Swift</Dropdown.Item>
            </DropdownButton>
          </div>
          <CodeMirror
            value={srcDocValue}
            height="400px"
            width="600px"
            theme={dracula}
            extensions={[loadLanguage(langSelect === 'C++' ? 'cpp' : langSelect)]}
            onChange={(value) => {
              setSrcDocValue(value);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Partner found! Ready to Code?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
