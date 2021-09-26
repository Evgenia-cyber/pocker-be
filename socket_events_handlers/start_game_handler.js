const { startGame } = require('../controllers/game');

const startGameHandler = async (
  eventName,
  room,
  settings,
  issues,
  cards,
  io
) => {
  const respGame = await startGame(eventName, room, settings, issues, cards);
  console.log(eventName, respGame);

  io.in(room).emit('game-is-starting', respGame);
};

module.exports = startGameHandler;
