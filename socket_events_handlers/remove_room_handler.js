const { removeRoom } = require('../controllers/result');

const removeRoomHandler = async (eventName, room, callback) => {
  const respResult = await removeRoom(eventName, room);

  console.log(eventName, respResult);

  callback(respResult);
};

module.exports = removeRoomHandler;
