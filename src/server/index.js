/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

const server = app.listen(8000);

const totalUsersOnline = [];
const rooms = {};
const names = {};
const allUsers = {};

const io = require('socket.io')(server, { cors: { origin: '*' } });

const findPeerForLoneSocket = function (socket) {
  // this is place for possibly some extensive logic
  // which can involve preventing two people pairing multiple times
  if (totalUsersOnline.length > 0) {
    // somebody is in queue, pair them!
    const peer = totalUsersOnline.pop();
    const room = `${socket.id}#${peer.id}`;
    // join them both
    peer.join(room);
    socket.join(room);
    // register rooms to their names
    rooms[peer.id] = room;
    rooms[socket.id] = room;
    // exchange names between the two of them and start the chat
    peer.emit('matched', { name: names[socket.id], room });
    socket.emit('matched', { name: names[peer.id], room });
  } else {
    // queue is empty, add our lone socket
    totalUsersOnline.push(socket);
  }
};

// Socket IO Connection
io.on('connection', (socket) => {
  // console.log(socket);
  // console.log(`User ${socket.id} connected`);
  // console.log(totalUsersOnline.length);

  socket.on('login', (data) => {
    names[socket.id] = data.username;
    allUsers[socket.id] = socket;
    // now check if sb is in queue
    findPeerForLoneSocket(socket);
  });
  socket.emit('total-users-online', totalUsersOnline.length);
  socket.on('code-collab', (data) => {
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('code-collab', data);
    console.log('room: ', room);
  });
  socket.on('run-ide', (data) => {
    console.log('run-ide data: ', data);
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('run-ide', data);
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
    console.log(data);
  });
  // handle disconnection/leaving
  socket.on('disconnect', () => {
    console.log('The server has disconnected!');
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('no-partner', 'alert(\'Your partner has left\')');
    if (room) {
      let peerID = room.split('#');
      peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
      // current socket left, add the other one to the queue
      findPeerForLoneSocket(allUsers[peerID]);
    }
  });
});

console.log('Server running on port 8000');
