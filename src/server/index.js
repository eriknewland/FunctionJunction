const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

const server = app.listen(8000);

const totalUsersOnline = [];

const io = require('socket.io')(server, { cors: { origin: '*' } });

// Socket IO Connection
io.on('connect', (socket) => {
  // console.log(socket);
  totalUsersOnline.push(socket);
  socket.emit('total-users-online', totalUsersOnline.length);
  socket.on('code-collab', (data) => {
    // console.log(data);
    socket.broadcast.emit('code-collab', data);
    // socket.emit('total-users-online', totalUsersOnline.length);
  });
  socket.on('run-ide', (data) => {
    // console.log(data);
    socket.broadcast.emit('run-ide', data);
    // socket.emit('total-users-online', totalUsersOnline.length);
  });
});

// Express Routes
app.get('/', (req, res) => {
  res.send('Hello Server');
});

console.log('Server running on port 8000');
