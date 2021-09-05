const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const socketIo = require('socket.io')(httpServer);

const serverIsRunning = require('./middlewares/server_is_running');

// app.use(app.json());

app.use(cors());

socketIo.on('connection', (socket) => {
  socket.on('login', ({ name, room }, callback) => {
    console.log('A user connected');
    console.log(name, name);
    console.log(room, room);
    callback();
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/', serverIsRunning);

module.exports = httpServer;
