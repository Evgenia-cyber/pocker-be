const Vote = require('../models/Vote');

const createVote = async (room, userId, issueId, cardId, cardValue) => {
  const voteModel = new Vote({
    room,
    userId,
    issueId,
    cardId,
    cardValue,
  });

  return voteModel.save();
};

const removeAllVotes = async (room) => Vote.deleteMany({ room });

module.exports = { createVote, removeAllVotes };
