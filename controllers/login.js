const { STATUS_CODE } = require('../common/constants');
const { createRoom } = require('../repositories/room');
const { createUser } = require('../repositories/user');

const login = async ({ user, room }, callback) => {
  const response = {
    code: 0,
    error: '',
    data: {},
  };
  const newUser = await createUser(user, room);
  console.log('newUser', newUser);
  console.log('newUser.id', newUser.id);

  const newRoom = await createRoom(room, newUser.id);
  console.log('newRoom', newRoom);

  response.data.room = newRoom;
  response.data.user = newUser;
  response.code = STATUS_CODE.CREATED.CODE;

  callback(response);
};

module.exports = { login };
