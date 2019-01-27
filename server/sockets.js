const socketIo = require('socket.io');
const http = require('http');

// create races logic here
module.exports = (server) => {
  // const server = http.createServer(app);
  const io = socketIo(server);

  // middleware
  // io.use((socket, next) => {
  //   if (socket.handshake.query.token) {
  //     return next();
  //   }
  //
  //   return next(new Error('authentication error'));
  // });

  io
    // .of('/races')
    .on('connect', (socket) => {
      socket.on('quick start', function(msg){
        io.emit('quick start', msg);
      });

      console.log('connect');
    });
};
