const { STATUS_CODE } = require('../common/constants');
const { createUser } = require('../repositories/user');

const login = async ({ user, room }, callback) => {
  const response = {
    code: 0,
    error: '',
    data: {},
  };

  const { firstName, role } = user;
  if (!firstName || !role || !room) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = STATUS_CODE.BAD_REQUEST.MESSAGE;
    return callback(response);
  }

  const newUser = await createUser(user, room);
  response.data.user = newUser;
  response.code = STATUS_CODE.CREATED.CODE;

  return callback(response);
};

module.exports = { login };
