const http = require('http');
const app = require('./app');

const { PORT } = require('./common/config');

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on http://localhost:${PORT}`);
});
