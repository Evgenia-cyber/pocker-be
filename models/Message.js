const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'messages',
  }
);

messageSchema.statics.toResponse = (response) => {
  const { room, userId, message } = response;
  return { room, userId, message };
};

module.exports = model('Message', messageSchema);
