const dotenv = require('dotenv');
const path = require('path');
const DEFAULT_PORT = require('./constants');

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

module.exports = {
  PORT: process.env.PORT || DEFAULT_PORT,
  MONGO_URL: process.env.MONGO_URL,
};
