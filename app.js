const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');
const {
  catchAndLogErrors,
  logError,
} = require('./middlewares/errors_handling');

const serverIsRunning = require('./middlewares/server_is_running');

const { login } = require('./controllers/login');
const { saveMessage, getChat } = require('./controllers/chat');
const {
  // kickUser,
  addNewKick,
  addVoiceToKickUser,
  getUsersCount,
  getUsers,
} = require('./controllers/lobby');
const { KICKED_BY_VOITING } = require('./common/constants');
const kickUserHandler = require('./socket_events_handlers/kick_user_handler');

app.use(cors());

app.use(logInfo);

io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('login', async ({ user, room }, callback) => {
    // console.log('socket.id', socket.id); // qA3oNINM_eNf36ldAAAD

    const resp = await login('login', { user, room });

    console.log('login', resp);
    // console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD' }

    // join user to room
    socket.join(room);

    // console.log('socket.rooms', socket.rooms); // { 'qA3oNINM_eNf36ldAAAD', '123456789' }

    callback(resp);

    socket.broadcast.to(room).emit('add-member', resp);
  });

  socket.on('get-all-users-in-room', async ({ room }, callback) => {
    const resp = await getUsers('get-all-users-in-room', room);

    console.log('get-all-users-in-room', resp);
    callback(resp);
  });

  socket.on('get-all-chat', async (room, callback) => {
    const resp = await getChat('get-all-chat', room);
    console.log('get-all-chat', resp);
    callback(resp);
  });

  socket.on('send-message', async (message, room, callback) => {
    const type = 'chat';
    const resp = await saveMessage('send-message', message, type, room);
    console.log('send-message', resp);

    callback(resp);
    socket.broadcast.to(room).emit('get-message', resp);
  });

  socket.on('kick-user', async (payload) => {
    await kickUserHandler(payload, io);
  });

  socket.on('user-want-voiting', async (payload) => {
    const { room, whoWillBeKicked } = payload;
    const { userId: whoWillBeKickedUserId } = whoWillBeKicked;
    const respKick = await addNewKick(
      'user-want-voiting',
      room,
      whoWillBeKickedUserId
    );
    console.log('user-want-voiting', respKick);

    const { kickId } = respKick.data.kick;
    respKick.data.kick = { ...payload, kickId };

    socket.broadcast.to(room).emit('do-you-want-kick-user', respKick);
  });

  socket.on('kick-user-by-user', async (payload) => {
    const { room, whoWillBeKicked, kickId } = payload;

    const respCount = await getUsersCount('kick-user-by-user', room);
    console.log('kick-user-by-user1', respCount);

    const { count: countUsersInRoom } = respCount.data;

    const respCountKick = await addVoiceToKickUser('kick-user-by-user', kickId);
    console.log('kick-user-by-user2', respCountKick);

    const { kick: countUsersWantedToKick } = respCountKick.data;
    // { countWantedToKick: 3, kickId: '614da2fd874b83fab6e84f5e' }

    console.log('countUsersWantedToKick', countUsersWantedToKick);
    console.log('countUsersInRoom', countUsersInRoom);
    console.log('halfRoom', Math.ceil(countUsersInRoom / 2));
    console.log(
      'isVoitedInafToKick',
      countUsersWantedToKick > Math.ceil(countUsersInRoom / 2)
    );

    if (
      countUsersWantedToKick.countWantedToKick >= Math.ceil(countUsersInRoom / 2)
    ) {
      const kickPayload = {
        room,
        message: KICKED_BY_VOITING,
        userId: whoWillBeKicked.userId,
        firstName: whoWillBeKicked.firstName,
        lastName: whoWillBeKicked.lastName,
        role: whoWillBeKicked.role,
      };

      await kickUserHandler(kickPayload, io);
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
