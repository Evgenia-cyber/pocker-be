const { STATUS_CODE } = require('../common/constants');
const Kick = require('../models/Kick');
const User = require('../models/User');
const { createKick, updateKick } = require('../repositories/kick');
const { updateChat } = require('../repositories/message');
const {
  deleteUser,
  getAllUsersCount,
  getAllUsers,
} = require('../repositories/user');

const getUsers = async (eventName, room) => {
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

  const allUsersInRoom = await getAllUsers(room);

  response.code = STATUS_CODE.OK.CODE;
  response.data.users = allUsersInRoom.map((user) => User.toResponse(user));

  return response;
};

const kickUser = async (eventName, { room, userId }) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };
  if (!room || !userId) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, userId`;
    return response;
  }
  const kickedUser = await deleteUser(userId);

  if (!kickedUser) {
    response.code = STATUS_CODE.NOT_FOUND.CODE;
    response.error = `Such user ${userId} ${STATUS_CODE.NOT_FOUND.MESSAGE}`;
    return response;
  }
  await updateChat(room, userId);

  response.code = STATUS_CODE.OK.CODE;
  response.data.user = User.toResponse(kickedUser);
  return response;
};

const addNewKick = async (eventName, room, whoWillBeKickedUserId) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!room || !whoWillBeKickedUserId) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE}  room, whoWillBeKickedUserId`;
    return response;
  }
  const newKick = await createKick(room, whoWillBeKickedUserId);

  response.code = STATUS_CODE.CREATED.CODE;
  response.data.kick = Kick.toResponse(newKick);

  return response;
};

const addVoiceToKickUser = async (eventName, kickId) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!kickId) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} kickId`;
    return response;
  }

  const updatedKick = await updateKick(kickId);

  response.code = STATUS_CODE.OK.CODE;
  response.data.kick = Kick.toResponse(updatedKick);

  return response;
};

const getUsersCount = async (eventName, room) => {
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

  const count = await getAllUsersCount(room);

  response.code = STATUS_CODE.OK.CODE;
  response.data.count = count;

  return response;
};

module.exports = {
  kickUser,
  addNewKick,
  addVoiceToKickUser,
  getUsersCount,
  getUsers,
};
