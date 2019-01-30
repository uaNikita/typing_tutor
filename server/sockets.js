const socketIo = require('socket.io');
const crypto = require('crypto');
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

  get last() {
    return this.last;
  }

  set text(text) {
    this.last = text;
  }

  set place(place) {
    this.place = place;
  }
}

class Race {
  constructor(options) {
    this.participants = [];
    this.language = options.language;
    this.type = options.type;
    this.status = 'waiting for participants'
    this.id = crypto.randomBytes(15).toString('hex');

    if (this.type === 'quick') {
      // get some text here

    }
    else {
      this.text = options.text;
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

  addParticipant(id) {
    this.participants.add({
      id,
      racer: new Racer({
        text: this.text,
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
