const stopRoundHandler = async (eventName, room, socket) => {
  console.log(
    eventName,
    `send to all users in room: ${room} that the game is over`
  );

  const resp = 'game is over';

  socket.broadcast.to(room).emit('round-is-stoping', resp);
};

module.exports = stopRoundHandler;
