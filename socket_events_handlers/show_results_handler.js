const { getStatistics } = require('../controllers/result');

const showResultsHandler = async (
  eventName,
  room,
  io
) => {
  const respStatistics = await getStatistics(eventName, room);
  console.log(eventName, respStatistics);

  io.in(room).emit('get-statistics', respStatistics);
};

module.exports = showResultsHandler;
