const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    settings: {
      isAdminBePlayerInGame: Boolean,
      isNeededTimer: Boolean,
      storyTypeShort: String,
      roundTime: Number,
    },
    issues: [
      {
        id: String,
        title: String,
        desc: String,
      },
    ],
    cards: [
      {
        id: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'games',
  }
);

gameSchema.statics.toResponse = (response) => {
  const { settings, issues: issuesResp, cards: cardsResp } = response;

  const issues = issuesResp.map((issue) => ({
    id: issue.id,
    title: issue.title,
    desc: issue.desc,
  }));

  const cards = cardsResp.map((card) => ({ id: card.id, value: card.value }));

  return { settings, issues, cards };
};

module.exports = model('Game', gameSchema);
