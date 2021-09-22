const { saveMessage, getChat } = require('../controllers/chat');
const { kickUser } = require('../controllers/lobby');

const kickUserHandler = async (payload, io) => {
  const { userId, room, message } = payload;
  const respUser = await kickUser('kick-user', { userId, room });
  const { user: kickedUser } = respUser.data;
  console.log('kick-user1', respUser);

  if (kickedUser) {
    const { firstName, lastName, role } = kickedUser;
    const kickMessage = {
      userId,
      newMessage: message,
      firstName,
      lastName,
      role,
    };
    const type = 'kick';

    const respMessage = await saveMessage('kick-user', kickMessage, type, room);
    console.log('kick-user2', respMessage);

    const respChat = await getChat('kick-user', room);
    console.log('kick-user3', respChat);

    io.in(room).emit('get-message', respMessage);

    io.in(room).emit('update-chat', respChat);

    io.in(room).emit('delete-kicked-user', respUser);
  }
};

module.exports = kickUserHandler;
