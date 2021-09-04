const serverIsRunning = (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Server is up and running...');
    return;
  }
  next();
};

module.exports = serverIsRunning;
