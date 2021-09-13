const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
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
  const { userId, firstName, lastName, role, job, room } = response;
  return { userId, firstName, lastName, role, job, room };
};

module.exports = model('User', userSchema);
