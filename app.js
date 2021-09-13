const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');
const {
  catchAndLogErrors,
  logError,
  // catchError,
} = require('./middlewares/errors_handling');

const serverIsRunning = require('./middlewares/server_is_running');

const { login } = require('./controllers/login');
const { saveMessage } = require('./controllers/chat');
const { kickUser } = require('./controllers/lobby');

app.use(cors());

app.use(logInfo);

io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('login', async ({ user, room }, callback) => {
    // console.log('socket.id', socket.id); // qA3oNINM_eNf36ldAAAD

    await login({ user, room }, callback);

    // console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD' }
    // join user to room
    socket.join(room);
    // console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD', '123456789' }
  });

  socket.on('send-message', async (payload) => {
    try {
      const response = await saveMessage(payload, 'send-message');
      io.emit('get-message', response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      socket.emit('error', error);
    }
  });

  // socket.on('send-message', async (payload) => {
  //   catchError(socket, async () => {
  //     const response = await saveMessage(payload, 'send-message');
  //     io.emit('get-message', response);
  //   });
  // });

  socket.on('kick-user-by-admin', async (payload) => {
    try {
      const { userId, room, message } = payload;
      const kickedUser = await kickUser({ userId, room }, 'kick-user-by-admin');
      if (kickedUser) {
        const { firstName, lastName, role } = kickedUser;
        const kickMessage = {
          room,
          userId,
          message,
          firstName,
          lastName,
          role,
          type: 'kick',
        };
        const newMessage = await saveMessage(kickMessage, 'send-message');
        io.emit('get-message', newMessage);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      socket.emit('error', error);
    }
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
