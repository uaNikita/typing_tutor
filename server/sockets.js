const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io
    .of('/races')
    .on('connection', (socket) => {
      console.log(socket);
    });
};
