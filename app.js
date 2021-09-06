const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const socketIo = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');

const serverIsRunning = require('./middlewares/server_is_running');

// app.use(app.json());

app.use(cors());

app.use(logInfo);

socketIo.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('login', ({ name, room }, callback) => {
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
