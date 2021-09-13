const User = require('../models/User');

const createUser = async (user, room) => {
  const { firstName, lastName, job, role } = user;

  const userModel = new User({ firstName, lastName, job, role, room });

  return userModel.save();
};

const deleteUser = async (userId) => User.findByIdAndRemove(userId);

module.exports = { createUser, deleteUser };
