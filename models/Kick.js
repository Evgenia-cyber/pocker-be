const { Schema, model } = require('mongoose');

const kickSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    countWantedToKick: {
      type: Number,
      default: 0,
    },
    whoWillBeKickedUserId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'kicks',
  }
);

kickSchema.statics.toResponse = (response) => {
  const { countWantedToKick, _id } = response;
  const kickId = _id.toString();
  return { countWantedToKick, kickId };
};

module.exports = model('Kick', kickSchema);
