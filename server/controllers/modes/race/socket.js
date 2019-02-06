const socketIo = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const { server } = require('../../../server');

const races = require('./races');

class Racer {
  constructor(options) {
    this.id = options.id;
    this.last = options.text;
    this.socket = options.socket;

    this.ongoing = true;

    this.socket.emit('some action')
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
}

class Race {
  constructor(options) {
    this.participants = [];
    this.language = options.language;
    this.type = options.type;
    this.status = 'waiting for participants';
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

    this.status = 'ongoing';
  }

  finish() {
    this.finishDate = Date.now();

    this.status = 'finished';
  }

  addParticipant(id, socket) {
    this.participants.push(
      new Racer({
        id,
        text: this.text,
        socket,
      })
    );
  }

  getParticipant(id) {
    return _.find(this.participants, { id });
  }
}

// create races logic here
const io = socketIo(server);

io
  .of('/races')
  .use((socket, next) => {
    let user;
    const { tt_access: token } = cookie.parse(socket.request.headers.cookie);

    if (token) {
      // todo: decode
      const parsedToken = jwt.verify(token, config.get('secretKey'))

      user = parsedToken.id
    }

    console.log('user', user);

    next();
  })
  .on('connect', (socket) => {


    socket.on('get', ({ raceId, token }, fn) => {

      // console.log(raceId, token);
      // console.log('token', jwt.verify(token, config.get('secretKey')));


    });


    socket.on('quick start', ({ token, language }, fn) => {
      let userId;

      if (token) {
        const JWTData = jwt.verify(token, config.get('secretKey'));

        if (JWTData.exp * 1000 < Date.now()) {
          fn('unauthorized');

          return;
        }

        userId = JWTData.id;
      }

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

      race.addParticipant(userId, socket);
    });
  });

// todo: we should return user current game and refrech it if new participants join

