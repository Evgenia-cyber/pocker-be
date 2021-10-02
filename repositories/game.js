const Game = require('../models/Game');

const createGame = async (room, settings, issues, cards) => {
  const gameModel = new Game({
    room,
    settings,
    issues,
    cards,
  });

  return gameModel.save();
};

const removeAllGames = async (room) => Game.deleteMany({ room });

module.exports = { createGame, removeAllGames };
