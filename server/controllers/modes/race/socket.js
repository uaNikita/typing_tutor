const socketIo = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const { server } = require('../../../server');

const races = require('./races');

// create races logic here
const io = socketIo(server);
const racesNamespace = io.of('/races');

class Racer {
  constructor(options) {
    this.id = options.id;
    this.last = options.text;
    this.socket = options.socket;

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
}

class Race {
  constructor(options) {
    this.participants = [];
    this.language = options.language;
    this.type = options.type;
    this.status = 'waiting for participants';
    this.id = crypto.randomBytes(15).toString('hex');
    this.room = racesNamespace.to(this.id);

    this.text = 'options.text';

    if (this.type === 'quick') {
      // get some text here

    }
    else {

    }

    this.startDate = Date.now();

    setTimeout(() => {
      this.startFinalCountdown();
    }, 10000);
  }

  // todo: use room for broadcasting

  startFinalCountdown() {
    this.status = 'final countdown';

    let counter = 3;

    const go = () => {
      this.room.emit('change', {
        status: this.status,
        counter,
      });

      counter -= 1;

      if (counter > -1) {
        setTimeout(go, 1000);
      }
      else {
        this.start();
      }
    };
  }

  start() {
    this.status = 'ongoing';
  }

  finish() {
    this.finishDate = Date.now();

    this.status = 'finished';
  }

  addParticipant(id, socket) {
    this.addEvents(socket);

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

  addEvents(socket) {

    socket.on('type', {});

  }
}

const findActiveRaceByUserId = (userId) => {
  _.find(races, (race) => (
    _.some(race.participants, ({ id }) => id === userId)
  ));
};


racesNamespace
  .use((socket, next) => {
    const { tt_access: token } = cookie.parse(socket.request.headers.cookie);

    if (token) {
      let parsedToken;

      try {
        parsedToken = jwt.verify(token, config.get('secretKey'));

        socket.userId = parsedToken.id;
      } catch (e) {
        let error = 'Forbidden';

        if (e.name === 'TokenExpiredError') {
          error = 'Token expired';
        }

        return next(new Error(error));
      }
    }

    next();
  })
  .on('connect', (socket) => {
    socket.emit('registered');

    socket.on('get active race', (fn) => {
      const race = findActiveRaceByUserId(socket.userId);

      fn(race && race.id);
    });

    socket.on('get race', (id, fn) => {
      const race = findActiveRaceByUserId(socket.userId);

      fn(race && race.id);
    });


    socket.on('quick start', ({ token, language }, fn) => {
      const activeRace = findActiveRaceByUserId(socket.userId);

      if (activeRace) {
        fn('Already have active race');
      }
      else {
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

        race.addParticipant(socket);
      }
    });
  });

// todo: we should return user current game and refrech it if new participants join

