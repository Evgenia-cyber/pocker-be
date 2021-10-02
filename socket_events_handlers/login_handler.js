const { login } = require('../controllers/login');

const loginHandler = async (eventName, room, user, callback, socket) => {
  const resp = await login(eventName, user, room);

  console.log('login', resp);

  const { error, data } = resp;

  const { isLate } = data;

  if (!error) {
    // join user to room
    socket.join(room);

    callback(resp);
    if (isLate) {
      socket.broadcast.to(room).emit('late-user-logged-in', resp);
    } else {
      socket.broadcast.to(room).emit('add-member', resp);
    }
  } else {
    callback(resp);
  }
};

module.exports = loginHandler;
