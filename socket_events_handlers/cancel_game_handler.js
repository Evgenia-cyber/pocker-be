const { removeRoom } = require('../controllers/result');

const cancelGameHandler = async (eventName, room, io) => {
  const respResult = await removeRoom(eventName, room);

  console.log(eventName, respResult);

  io.in(room).emit('game-end', respResult);
};

module.exports = cancelGameHandler;
