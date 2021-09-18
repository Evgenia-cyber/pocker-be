const { STATUS_CODE } = require('../common/constants');
const { createUser } = require('../repositories/user');

const login = async (payload) => {
  const response = {
    code: 0,
    error: '',
    data: {},
  };

  const user = payload;
  const { firstName, role , room } = payload;

  if (!firstName || !role  || !room) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = STATUS_CODE.BAD_REQUEST.MESSAGE;
    return response;
  }

  const newUser = await createUser(user);
  response.data.user = newUser;
  response.code = STATUS_CODE.CREATED.CODE;

  return response;
};

module.exports = { login };
