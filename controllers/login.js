const { STATUS_CODE } = require('../common/constants');
const User = require('../models/User');
const { createUser } = require('../repositories/user');

const login = async (eventName, { user, room }) => {
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

  const newUser = await createUser(user, room);

  response.code = STATUS_CODE.CREATED.CODE;
  response.data.user = User.toResponse(newUser);

  return response;
};

module.exports = { login };
