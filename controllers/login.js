const { STATUS_CODE } = require('../common/constants');
const User = require('../models/User');
const { findGame } = require('../repositories/game');
const { createUser, findRoom } = require('../repositories/user');

const login = async (eventName, user, room) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  const { firstName, role, userId } = user;

  if (!firstName || !role || !room || !userId) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} firstName, role, room, userId`;
    return response;
  }

  if (role !== 'admin') {
    const findRoomResp = await findRoom(room);

    if (!findRoomResp) {
      response.code = STATUS_CODE.NOT_FOUND.CODE;
      response.error = `room ${room} ${STATUS_CODE.NOT_FOUND.MESSAGE}`;
      return response;
    }

    const game = await findGame(room);

    if (game) {
      response.data.isLate = true;
    } else {
      response.data.isLate = false;
    }
  }

  const newUser = await createUser(user, room);

  response.code = STATUS_CODE.CREATED.CODE;
  response.data.user = User.toResponse(newUser);

  return response;
};

module.exports = { login };
