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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: '',
    },
    role: {
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
  const { userId, message, firstName, lastName, role } = response;
  return { userId, message, firstName, lastName, role };
};

module.exports = model('Message', messageSchema);
