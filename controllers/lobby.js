const { STATUS_CODE } = require('../common/constants');
const CustomError = require('../common/customError');
const User = require('../models/User');
const { deleteUser } = require('../repositories/user');

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
    return User.toResponse(kickedUser);
  }
};

module.exports = { kickUser };
