const Kick = require('../models/Kick');

const createKick = async (room, whoWillBeKickedUserId) => {
  const kickModel = new Kick({
    room,
    whoWillBeKickedUserId,
  });

  return kickModel.save();
};

// const updateKick = async (kickId) => Kick.findOneAndUpdate(
//   { _id: kickId },
//   { $inc: { countWantedToKick: 1 } },
//   { new: true }
// );

const updateKick = async (kickId) => Kick.findByIdAndUpdate(
  kickId,
  { $inc: { countWantedToKick: 1 } },
  { new: true }
);

module.exports = { createKick, updateKick };
