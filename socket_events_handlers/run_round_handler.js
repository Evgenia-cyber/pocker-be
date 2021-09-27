const runRoundHandler = async (eventName, room, issueIdSelected, io) => {
  console.log(
    eventName,
    `bring to client data: room: ${room}, issueIdSelected: ${issueIdSelected}`
  );

  io.in(room).emit('round-is-starting', issueIdSelected);
};

module.exports = runRoundHandler;
