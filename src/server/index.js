const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

const server = app.listen(8000);

const io = require('socket.io')(server, { cors: { origin: '*' } });

// Socket IO Connection
io.on('connect', (socket) => {
  socket.on('code-collab', (data) => {
    console.log(data);
    socket.broadcast.emit('code-collab', data);
  });
  socket.on('run-ide', (data) => {
    console.log(data);
    socket.broadcast.emit('run-ide', data);
  });
});

// Express Routes
app.get('/', (req, res) => {
  res.send('Hello Server');
});

console.log('Server running on port 8000');
