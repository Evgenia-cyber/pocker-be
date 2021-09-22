const { STATUS_CODE } = require('../common/constants');
const Message = require('../models/Message');
const { createMessage, getAll } = require('../repositories/message');

const saveMessage = async (eventName, message, type, room) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  const {
    userId,
    newMessage: newMessageFromClient,
    firstName,
    lastName,
    role,
  } = message;

  if (!room || !userId || !newMessageFromClient || !firstName || !role) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, userId, newMessage, firstName, role`;
    return response;
  }

  const newMessage = await createMessage(
    room,
    userId,
    newMessageFromClient,
    firstName,
    lastName,
    role,
    type
  );

  response.code = STATUS_CODE.CREATED.CODE;
  response.data.message = Message.toResponse(newMessage);

  return response;
};

const getChat = async (eventName, room) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!room) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room`;
    return response;
  }

  const allMessages = await getAll(room);

  response.code = STATUS_CODE.OK.CODE;
  response.data.messages = allMessages.map((message) => Message.toResponse(message));

  return response;
};

module.exports = { saveMessage, getChat };
