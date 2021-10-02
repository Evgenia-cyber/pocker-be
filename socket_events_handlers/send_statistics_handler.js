const { saveResult } = require('../controllers/result');

const sendStatisticsHandler = async (
  eventName,
  room,
  issueIdSelected,
  statisticsCards,
  callback
) => {
  const respResult = await saveResult(
    eventName,
    room,
    issueIdSelected,
    statisticsCards
  );

  console.log(eventName, respResult);

  callback(respResult);
};

module.exports = sendStatisticsHandler;
