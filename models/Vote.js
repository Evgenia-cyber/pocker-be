const { Schema, model } = require('mongoose');

const voteSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    issueId: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    cardValue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'votes',
  }
);

voteSchema.statics.toResponse = (response) => {
  const { userId, issueId, cardId, cardValue } = response;
  return { userId, issueId, cardId, cardValue };
};

module.exports = model('Vote', voteSchema);
