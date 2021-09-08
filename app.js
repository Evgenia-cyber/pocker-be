const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const socketIo = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');
const {
  catchAndLogErrors,
  logError,
} = require('./middlewares/errors_handling');

const serverIsRunning = require('./middlewares/server_is_running');

const { login } = require('./controllers/login');

app.use(cors());

app.use(logInfo);

socketIo.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('login', async ({ user, room }, callback) => {
    console.log('socket.id', socket.id); // qA3oNINM_eNf36ldAAAD

    await login({ user, room }, callback);

    console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD' }
    // join user to room
    socket.join(room);
    console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD', '123456789' }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/', serverIsRunning);

app.use(catchAndLogErrors);

process.on('uncaughtException', (err, origin) => {
  logError(`Uncaught exception: ${err}. Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

module.exports = httpServer;
