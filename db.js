const mongoose = require('mongoose');

const { MONGO_URL } = require('./common/config');

const connectDB = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection; // instance of connection

  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'Connection error: '));

  db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connection with DB has been established successfully.');
  });

  db.on('disconnected', () => {
    // eslint-disable-next-line no-console
    console.log('Disconnected.');
  });
};

module.exports = connectDB;
