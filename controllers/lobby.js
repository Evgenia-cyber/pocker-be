const { STATUS_CODE } = require('../common/constants');
const CustomError = require('../common/customError');
const Kick = require('../models/Kick');
const User = require('../models/User');
const { createKick, updateKick } = require('../repositories/kick');
const { updateChat } = require('../repositories/message');
const {
  deleteUser,
  getAllUsersCount,
  getAllUsers,
} = require('../repositories/user');

const getUsers = async (eventName, { room }, callback) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!room) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room`;
    return callback(response);
  }

  const allUsersInRoom = await getAllUsers(room);

  response.code = STATUS_CODE.OK.CODE;
  response.data.users = allUsersInRoom.map((user) => User.toResponse(user));

  return callback(response);
};

const kickUser = async ({ room, userId }, eventName) => {
  if (!room || !userId) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, userId`,
      eventName
    );
  }
  const kickedUser = await deleteUser(userId);

  if (!kickedUser) {
    throw new CustomError(
      STATUS_CODE.NOT_FOUND.CODE,
      `Such user ${userId} ${STATUS_CODE.NOT_FOUND.MESSAGE}`,
      eventName
    );
  } else {
    await updateChat(room, userId);
    return User.toResponse(kickedUser);
  }
};

const addNewKick = async ({ room, whoWillBeKickedUserId }, eventName) => {
  if (!room || !whoWillBeKickedUserId) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, whoWillBeKickedUserId`,
      eventName
    );
  }
  const newKick = await createKick(room, whoWillBeKickedUserId);

  return Kick.toResponse(newKick);
};

const addVoiceToKickUser = async ({ kickId }, eventName) => {
  if (!kickId) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      `${STATUS_CODE.BAD_REQUEST.MESSAGE} kickId`,
      eventName
    );
  }
  const updatedKick = await updateKick(kickId);

  return Kick.toResponse(updatedKick);
};

const getUsersCount = async (room, eventName) => {
  if (!room) {
    throw new CustomError(
      STATUS_CODE.BAD_REQUEST.CODE,
      `${STATUS_CODE.BAD_REQUEST.MESSAGE} room`,
      eventName
    );
  }

  return getAllUsersCount(room);
};

module.exports = {
  kickUser,
  addNewKick,
  addVoiceToKickUser,
  getUsersCount,
  getUsers,
};
