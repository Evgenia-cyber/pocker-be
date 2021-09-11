const { STATUS_CODE } = require('../common/constants');
const CustomError = require('../common/customError');
const Message = require('../models/Message');
const { createMessage } = require('../repositories/message');

const saveMessage = async ({ room, userId, message }) => {
  if (!room || !userId || !message) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      STATUS_CODE.BAD_REQUEST.MESSAGE
    );
  }

  const newMessage = await createMessage(room, userId, message);
  console.log('newMessage', newMessage);

  return Message.toResponse(newMessage);
};

module.exports = { saveMessage };
