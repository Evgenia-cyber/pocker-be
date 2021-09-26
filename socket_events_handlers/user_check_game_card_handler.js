const { userCheckGameCard } = require('../controllers/game');

const userCheckGameCardHandler = async (
  eventName,
  room,
  userId,
  issueId,
  cardId,
  cardValue,
  io
) => {
  const respCheckGameCard = await userCheckGameCard(
    eventName,
    room,
    userId,
    issueId,
    cardId,
    cardValue
  );
  console.log(eventName, respCheckGameCard);

  io.in(room).emit('update-voting-results', respCheckGameCard);
};

module.exports = userCheckGameCardHandler;
