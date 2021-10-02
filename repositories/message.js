const { KICKED_ID } = require('../common/constants');
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

const updateChat = async (room, kickedUserId) => Message.updateMany(
  { room, userId: kickedUserId },
  { userId: KICKED_ID }
);

const getAll = async (room) => Message.find({ room });

const removeAllMessages = async (room) => Message.deleteMany({ room });

module.exports = { createMessage, updateChat, getAll, removeAllMessages };
