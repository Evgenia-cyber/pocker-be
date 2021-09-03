const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');

const { PORT } = require('./common/config');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

http.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on http://localhost:${PORT}`);
});
