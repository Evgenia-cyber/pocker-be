const Message = require('../models/Message');

const createMessage = async (
  room,
  userId,
  message,
  firstName,
  lastName,
  role,
  type
) => {
  const messageModel = new Message({
    room,
    userId,
    message,
    firstName,
    lastName,
    role,
    type,
  });

  return messageModel.save();
};

module.exports = { createMessage };
