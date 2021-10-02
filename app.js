const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(httpServer);

const { logError } = require('./middlewares/errors_handling');

const serverIsRunning = require('./middlewares/server_is_running');

const { saveMessage, getChat } = require('./controllers/chat');

const {
  addNewKick,
  addVoiceToKickUser,
  getUsersCount,
  getUsers,
} = require('./controllers/lobby');

const { KICKED_BY_VOITING } = require('./common/constants');

const kickUserHandler = require('./socket_events_handlers/kick_user_handler');
const userExitHandler = require('./socket_events_handlers/user_exit_handler');
const startGameHandler = require('./socket_events_handlers/start_game_handler');
const userCheckGameCardHandler = require('./socket_events_handlers/user_check_game_card_handler');
const runRoundHandler = require('./socket_events_handlers/run_round_handler');
const sendStatisticsHandler = require('./socket_events_handlers/send_statistics_handler');
const showResultsHandler = require('./socket_events_handlers/show_results_handler');
const removeRoomHandler = require('./socket_events_handlers/remove_room_handler');
const loginHandler = require('./socket_events_handlers/login_handler');

app.use(cors());

io.on('connection', async (socket) => {
  console.log('A user connected');

  socket.on('login', async ({ user, room }, callback) => {
    await loginHandler('login', room, user, callback, socket);
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

  socket.on('user-exit', async (userId, room) => {
    await userExitHandler(userId, room, io);
  });

  socket.on('start-game', async (room, settings, issues, cards) => {
    await startGameHandler('start-game', room, settings, issues, cards, io);
  });

  socket.on(
    'user-check-game-card',
    async (room, userId, issueId, cardId, cardValue) => {
      await userCheckGameCardHandler(
        'user-check-game-card',
        room,
        userId,
        issueId,
        cardId,
        cardValue,
        io
      );
    }
  );

  socket.on('run-round', async (room, issueIdSelected) => {
    await runRoundHandler('run-round', room, issueIdSelected, io);
  });

  socket.on(
    'send-statistics',
    async (room, issueIdSelected, statisticsCards, callback) => {
      await sendStatisticsHandler(
        'send-statistics',
        room,
        issueIdSelected,
        statisticsCards,
        callback
      );
    }
  );

  socket.on('show-results', async (room) => {
    await showResultsHandler('show-results', room, io);
  });

  socket.on('delete-room', async (room, callback) => {
    await removeRoomHandler('delete-room', room, callback);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/', serverIsRunning);

process.on('uncaughtException', (err, origin) => {
  logError(`Uncaught exception: ${err}. Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

module.exports = httpServer;
