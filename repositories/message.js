const Message = require('../models/Message');

const createMessage = async (
  room,
  userId,
  message,
  firstName,
  lastName,
  role
) => {
  const messageModel = new Message({
    room,
    userId,
    message,
    firstName,
    lastName,
    role,
  });

  return messageModel.save();
};

module.exports = { createMessage };
