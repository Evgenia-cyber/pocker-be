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

module.exports = model('User', userSchema);
