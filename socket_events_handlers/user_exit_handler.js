const { getChat } = require('../controllers/chat');
const { kickUser } = require('../controllers/lobby');

const userExitHandler = async (userId, room, io) => {
  const respUser = await kickUser('user-exit', { userId, room });
  const { user: kickedUser } = respUser.data;
  console.log('user-exit1', respUser);

  if (kickedUser) {
    const respChat = await getChat('user-exit', room);
    console.log('user-exit2', respChat);

    io.in(room).emit('update-chat', respChat);

    io.in(room).emit('delete-kicked-user', respUser);
  }
};

module.exports = userExitHandler;
