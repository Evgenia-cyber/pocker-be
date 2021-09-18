const User = require('../models/User');

const createUser = async (user) => {

  const userModel = new User(user);
  return userModel.save();
};

const deleteUser = async (userId) => User.findByIdAndRemove(userId);

const getAllUsersCount = async (room) => User.countDocuments({ room });

module.exports = { createUser, deleteUser, getAllUsersCount };
