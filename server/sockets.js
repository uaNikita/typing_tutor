const socketIo = require('socket.io');
const _ = require('lodash');

const races = [
  {
    type: 'quick',
    language: 'some',
    text: 'some',
    status: 'waiting for participants',
    participants: []
  }
];

class Race {
  constructor(options) {
    this.participants = [];
    this.language = options.language;
    this.type = options.type;
    this.status = 'waiting for participants'

    if (this.type === 'quick') {
      // get some text here

    }
    else {
      this.text = options.text;
    }
  }

  start() {
    this.startDate = Date.now();
  }

  finish() {
    // save to statistic
  }
}

// create races logic here
module.exports = (server) => {
  const io = socketIo(server);

  // middleware
  // io.use((socket, next) => {
  //   if (socket.handshake.query.token) {
  //     return next();
  //   }
  //
  //   return next(new Error('authentication error'));
  // });

  // todo: read about https://github.com/auth0-community/socketio-jwt

  io
    .of('/races')
    .on('connect', (socket) => {
      socket.on('quick start', (language) => {
        // let race = _.find(races, {
        //   language,
        //   status: 'waiting for participants',
        // });
        //
        // if (race) {
        //
        //
        // }


        console.log('quick start', language);

        // io.emit('quick start', msg);
      });
    });
};
