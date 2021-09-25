const { STATUS_CODE } = require('../common/constants');
const Game = require('../models/Game');
const { createGame } = require('../repositories/game');

const startGame = async (eventName, room, settings, issues, cards) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!room || !settings || !issues || !cards) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, settings, issues, cards`;
    return response;
  }

  const newGame = await createGame(room, settings, issues, cards);

  response.code = STATUS_CODE.CREATED.CODE;
  response.data.game = Game.toResponse(newGame);

  return response;
};

module.exports = { startGame };
