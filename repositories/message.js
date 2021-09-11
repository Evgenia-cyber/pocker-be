const Message = require('../models/Message');

const createMessage = async (room, userId, message) => {
  const messageModel = new Message({ room, userId, message });

  return messageModel.save();
};

module.exports = { createMessage };
