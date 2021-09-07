const app = require('express')();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const socketIo = require('socket.io')(httpServer);

const logInfo = require('./middlewares/logs_handling');
const {
  catchAndLogErrors,
  logError,
} = require('./middlewares/errors_handling');

const User = require('./models/User');

const serverIsRunning = require('./middlewares/server_is_running');

// app.use(app.json());

app.use(cors());

app.use(logInfo);

socketIo.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('login', ({ user, room }, callbackForError) => {
    const { firstName, lastName, job, role } = user;
    console.log(firstName, lastName, job, role);
    // check, if user with this firstName and lastTame and job and role exists in room
    const existingUser = User.findOne({
      firstName,
      lastName,
      job,
      role,
      room,
    });

    console.log('existingUser', existingUser);

    if (existingUser) {
      return callbackForError('Such user is already in the room!');
    }

    // add user to DB
    User.create({ firstName, lastName, job, role, room });
    // join user to room
    socket.join(room);
    // sent notification to all users in room
    socket
      .in(room)
      .emit('notification', `${firstName} ${lastName} just entered the room`);
    // get all users in room from DB
    const updatedUsersList = User.find({ room });
    // sent updated list of users in this room to the client side
    socketIo.in(room).emit('users', updatedUsersList);
    return callbackForError();
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
