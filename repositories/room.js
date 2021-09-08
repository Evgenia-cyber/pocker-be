const Room = require('../models/Room');

const createRoom = async (room, userId) => {
  const roomModel = new Room({ room, userId });

  return roomModel.save();
};

module.exports = { createRoom };
