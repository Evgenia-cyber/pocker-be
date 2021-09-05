const server = require('./app');
const { PORT } = require('./common/config');
const connectDB = require('./db');

const startServer = () => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`);
  });
};

const start = async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error: ', error);
  }
};

start();
