const Result = require('../models/Result');

const createResult = async (room, issueId, results) => {
  const resultModel = new Result({
    room,
    issueId,
    results,
  });

  return resultModel.save();
};

const updateResult = async (room, issueId, results) => Result
  .findOneAndUpdate({ room, issueId }, { results }, { new: true });

const findResult = async (room, issueId) => Result.findOne({ room, issueId });

const getAllResults = async (room) => Result.find({ room });

const removeAllResults = async (room) => Result.deleteMany({ room });

module.exports = {
  findResult,
  getAllResults,
  createResult,
  updateResult,
  removeAllResults,
};
