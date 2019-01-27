const socketIo = require('socket.io');

// create races logic here
module.exports = (server) => {
  const io = socketIo(server);

  io
    .of('/races')
    .on('connect', (socket) => {


      socket.on('quick start', function(msg){
        io.emit('chat message', msg);
      });

      console.log(socket);
    });
};
