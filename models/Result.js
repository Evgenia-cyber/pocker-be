const { Schema, model } = require('mongoose');

const resultSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    issueId: {
      type: String,
      required: true,
    },
    results: [
      {
        id: String,
        value: String,
        scoreInPercent: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'results',
  }
);

resultSchema.statics.toResponse = (response) => {
  const { issueId, results: resultsResp } = response;

  const results = resultsResp.map((result) => ({
    id: result.id,
    value: result.value,
    scoreInPercent: result.scoreInPercent,
  }));

  return { issueId, results };
};

module.exports = model('Result', resultSchema);
