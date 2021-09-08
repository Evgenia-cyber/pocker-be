const { Schema, model } = require('mongoose');

const roomSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'rooms',
  }
);

module.exports = model('Room', roomSchema);
