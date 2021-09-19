const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');
const {
  catchAndLogErrors,
  logError,
  catchError,
} = require('./middlewares/errors_handling');

const serverIsRunning = require('./middlewares/server_is_running');

const { login } = require('./controllers/login');
const { saveMessage, getChat } = require('./controllers/chat');
const {
  kickUser,
  addNewKick,
  addVoiceToKickUser,
  getUsersCount,
} = require('./controllers/lobby');
const { KICKED_BY_VOITING } = require('./common/constants');

app.use(cors());

app.use(logInfo);

io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('login', async (payload) => {

    await login(payload);

    // join user to room
    socket.join(payload.room);
  });

  // socket.on('send-message', async (payload) => {
  //   try {
  //     const response = await saveMessage(payload, 'send-message');
  //     io.emit('get-message', response);
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log('error', error);
  //     socket.emit('error', error);
  //   }
  // });

  socket.on('send-message', async (payload) => {
    catchError(socket, async () => {
      const response = await saveMessage(payload, 'send-message');
      io.emit('get-message', response);
    })();
  });

  socket.on('kick-user', async (payload) => {
    try {
      const { userId, room, message } = payload;
      const kickedUser = await kickUser({ userId, room }, 'kick-user');
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
        const newChat = await getChat(room, 'send-message');

        io.emit('get-message', newMessage);
        io.emit('update-chat', newChat);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      socket.emit('error', error);
    }
  });

  socket.on('user-want-voiting', async (payload) => {
    try {
      const { room, whoWillBeKicked } = payload;
      const { userId: whoWillBeKickedUserId } = whoWillBeKicked;
      const data = { room, whoWillBeKickedUserId };
      const answer = await addNewKick(data, 'user-want-voiting');
      const { kickId } = answer;
      const newPayload = { ...payload, kickId };
      socket.broadcast.emit('do-you-want-kick-user', newPayload);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      socket.emit('error', error);
    }
  });

  socket.on('kick-user-by-user', async (payload) => {
    try {
      const { room, whoWillBeKicked, kickId } = payload;

      const countUsersInRoom = await getUsersCount(room, 'kick-user-by-user');

      const { countUsersWantedToKick } = await addVoiceToKickUser(
        { kickId },
        'kick-user-by-user'
      );
      if (countUsersWantedToKick > Math.ceil(countUsersInRoom / 2)) {
        const kickPayload = {
          room,
          message: KICKED_BY_VOITING,
          userId: whoWillBeKicked.userId,
          firstName: whoWillBeKicked.firstName,
          lastName: whoWillBeKicked.lastName,
          role: whoWillBeKicked.role,
        };
        socket.emmit('kick-user', kickPayload);
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
