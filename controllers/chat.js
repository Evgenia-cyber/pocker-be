const { STATUS_CODE } = require('../common/constants');
const CustomError = require('../common/customError');
const Message = require('../models/Message');
const { createMessage } = require('../repositories/message');

const saveMessage = async (
  { room, userId, message, firstName, lastName, role, type },
  eventName
) => {
  if (!room || !userId || !message || !firstName || !role) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, userId, message, firstName, role`,
      eventName
    );
  }

  const newMessage = await createMessage(
    room,
    userId,
    message,
    firstName,
    lastName,
    role,
    type
  );

  return Message.toResponse(newMessage);
};

module.exports = { saveMessage };
