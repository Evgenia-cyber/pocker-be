const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    _id: {
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
    job: {
      type: String,
      default: '',
    },
    role: {
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
    collection: 'users',
  }
);

userSchema.statics.toResponse = (response) => {
  const { _id, firstName, lastName, role, job, room, socketId } = response;
  const userId = _id.toString();
  return { userId, firstName, lastName, role, job, room, socketId };
};

module.exports = model('User', userSchema);
