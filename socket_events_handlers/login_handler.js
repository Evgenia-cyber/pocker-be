const { login } = require('../controllers/login');

const loginHandler = async (eventName, room, user, callback, socket) => {
  const resp = await login(eventName, user, room);

  console.log('login', resp);

  const { error } = resp;

  if (!error) {
    // join user to room
    socket.join(room);

    callback(resp);

    socket.broadcast.to(room).emit('add-member', resp);
  } else {
    callback(resp);
  }
};

module.exports = loginHandler;
