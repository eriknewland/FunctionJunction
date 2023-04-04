
# Function Junction

A collaborative in-browser IDE that pairs users to solve algorithm and data-structure problems built over a 3-day hackathon.


<p align="center">
  <img src="demo-gif.gif" alt="Collaboration gif">
</p>

## Tech Stack
<p align="center">
  <b>Client</b><br>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=React&color=222222&logo=React&logoColor=61DAFB&label=" alt="React" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=React+Router&color=CA4245&logo=React+Router&logoColor=FFFFFF&label=" alt="React Router" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=CodeMirror&color=D30707&logo=CodeMirror&logoColor=FFFFFF&label=" alt="CodeMirror" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Bootstrap&color=7952B3&logo=Bootstrap&logoColor=FFFFFF&label=" alt="Bootstrap" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Judge0+API&color=222222&logo=json&logoColor=22e4ac&label=" 
  alt="Judge0 API" />
</p>

<p align="center">
  <b>Server</b><br>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=" alt="Node.js" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Express&color=000000&logo=Express&logoColor=FFFFFF&label=" alt="Express" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Socket.io&color=010101&logo=Socket.io&logoColor=FFFFFF&label=" alt="Socket.io" />
</p>

<p align="center">
  <b>Database</b><br>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Firebase&color=222222&logo=Firebase&logoColor=FFCA28&label=" alt="Firebase" />
</p>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_FIREBASE_API_KEY`
`REACT_APP_FIREBASE_AUTH_DOMAIN`
`REACT_APP_FIREBASE_DATABASE_URL`
`REACT_APP_FIREBASE_PROJECT_ID`
`REACT_APP_FIREBASE_STORAGE_BUCKET`
`REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
`REACT_APP_FIREBASE_APP_ID`
`REACT_APP_JUDGE0_API_KEY`

You will need to setup a Firebase Account for the first 7 keys.
You will need to setup a RapidAPI account and subscription to Judge0 API for the final key.

## Features

- Firebase Authorization
- Cloud Firestore CRUD functionality
- Private and Public routes
- Password reset
- Codemirror in-browser IDE
- Compile and execute 20+ languages with judge0 API
- Bootstrap component styling
- Socket.io implementation to create a collaborative IDE and code compilation/execution


## Installation

Fork, clone and navigate into the root directory. Install dependencies:

```bash
  npm i
```
Start the development server on port 3000

```bash
  npm run start
```
In a separate terminal window, navigate into /src/server and run 'nodemon index.js' to start the socket server on port 8000.

```bash
  nodemon index.js
```


## Roadmap

- Tech Debt/Clean up

- Improve random matching functionality

- Create database of problems that each paired instance will reference

- Add payment rails

- Add different modes (i.e. competitive, CSS/styling challenges)


## Demo (Youtube)

[![Function-Junction-Screenshot](https://user-images.githubusercontent.com/114263701/229918214-0c951921-ba66-4007-98b3-1846dacd3f06.png)](https://youtu.be/BIyzn8brDMw)
