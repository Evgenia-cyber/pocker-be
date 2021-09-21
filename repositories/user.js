const User = require('../models/User');

const createUser = async (user, room) => {
  const { userId, firstName, lastName, job, role } = user;

  const userModel = new User({
    _id: userId,
    firstName,
    lastName,
    job,
    role,
    room,
  });

  return userModel.save();
};

const deleteUser = async (userId) => User.findByIdAndRemove(userId);

const getAllUsersCount = async (room) => User.countDocuments({ room });

const getAllUsers = async (room) => User.find({ room });

module.exports = { createUser, deleteUser, getAllUsersCount, getAllUsers };