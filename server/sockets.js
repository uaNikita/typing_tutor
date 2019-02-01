const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const races = [];

class Racer {
  constructor(options) {
    this.last = options.text;

    this.ongoing = true;
  }

  type(string) {
    if (this.ongoing && string === this.last[0]) {
      this.last.shift();

      if (!this.last.length) {
        this.finish();
      }
    }
  }

  finish() {
    this.ongoing = false;
  }

  set text(text) {
    this.last = text;
  }

  set place(place) {
    this.place = place;
  }
}

class Cat {
  constructor() {
    this.test = 1;
  }
}

var c = new Cat()

class Race {
  constructor(options) {
    this.participants = [];
    this.language = options.language;
    this.type = options.type;
    this.status = 'waiting for participants'
    this.id = crypto.randomBytes(15).toString('hex');

    this.text = 'options.text';

    if (this.type === 'quick') {
      // get some text here

    }
    else {

    }
  }

  start() {
    this.startDate = Date.now();

    this.status = 'ongoing'
  }

  finish() {
    this.finishDate = Date.now();

    this.status = 'finished'
  }

  addParticipant(id, socket) {
    this.participants.push({
      id,
      racer: new Racer({
        text: this.text,
        socket,
      })
    })
  }

  getParticipant(id) {
    _.find(this.participants, {
      id,
    })
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

      socket.on('quick start', ({ token, language }, fn) => {
        const JWTData = jwt.verify(token, config.get('secretKey'));

        if (JWTData.exp * 1000 < Date.now()) {
          // sent refresh token or logout
        }

        fn('woot');

        let race = _.find(races, {
          language,
          type: 'quick',
          status: 'waiting for participants',
        });

        if (!race) {
          race = new Race({
            type: 'quick',
            language,
          });
        }

        race.addParticipant('test test test', socket);
      });
    })

};
