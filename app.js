const express = require('express');
const cors = require('cors');

const serverIsRunning = require('./middlewares/server_is_running');

const app = express();

app.use(cors());

app.use('/', serverIsRunning);

module.exports = app;
