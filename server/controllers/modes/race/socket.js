const socketIo = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const { languages } = require('../../../../dist/compiledServer');
const { server } = require('../../../server');

const races = require('./races');

const io = socketIo(server);
const racesNamespace = io.of('/races');

class Racer {
  constructor(options) {
    _.defaults(this, options);

    this.lastText = this.text;
    this.lastTextArray = this.text.split(' ');
    this.status = 'ongoing';

    this.socket.on('type', (string, callback) => {
      if (this.status === 'ongoing' && string === this.last[0]) {
        this.type();
      }
      else {
        callback('Wrong')
      }
    });

    this.ongoing = true;
  }

  type() {
    this.last.shift();

    this.lastTextArray = this.last.join('');

    if (!this.last.length) {
      this.finish();
    }
  }

  finish() {
    this.endDate = Date.now();

    this.status = 'finished';
  }
}

class Race {
  constructor(options) {
    _.defaults(this, options);

    this.participants = [];
    this.status = 'waiting for participants';
    this.id = crypto.randomBytes(15).toString('hex');
    this.room = racesNamespace.to(this.id);

    if (this.type === 'quick') {
      // get some text here

    }
    else {
      this.text = options.text;
    }

    this.startDate = Date.now();

    let waitingCounter = 0

    const go = () => {
      this.room.emit('waiting for participants', waitingCounter);

      if (waitingCounter < 10) {
        waitingCounter += 1;

        setTimeout(go, 1000);
      }
      else {
        this.startFinalCountdown();
      }
    };

    go();
  }

  startFinalCountdown() {
    this.status = 'final countdown';

    let counter = 3;

    const go = () => {
      this.room.emit('countdown', counter);

      counter -= 1;

      if (counter > -1) {
        setTimeout(go, 1000);
      }
      else {
        this.room.emit('start');

        this.start();
      }
    };

    go();
  }

  getProgress() {
    return this.participants.map(({ id, lastText }) => {
      const index = this.text.indexOf(lastText);
      const progress = index / this.text.length;

      return {
        id,
        progress,
      }
    })
  }

  start() {
    this.status = 'ongoing';
    this.progress = this.getProgress();

    const go = () => {
      const allDone = this.participants.every(({ status }) => ['finished', 'disconnected'].includes(status));

      const newProgress = this.getProgress();

      if (allDone) {
        this.progress = newProgress;

        this.room.emit('move', this.progress);

        this.end();
      }
      else {
        const newProgress = this.getProgress();

        if (!_.isEqual(this.progress, newProgress)) {
          this.progress = newProgress;

          this.room.emit('move', this.progress);

          setTimeout(go, 1000);
        }
      }
    };

    go();
  }

  end() {
    this.status = 'endend';

    this.room.emit('end');
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

    socket.on('quick start', (language, fn) => {
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
          const texts = _.find(languages.languages, { name: language }).racesTexts;

          race = new Race({
            type: 'quick',
            language,
            text: _.sample(texts),
          });

          races.push(race);
        }

        const id = socket.userId || `anonymous-${race.participants.length}`;

        race.addParticipant(id, socket);

        console.log(race.id);

        fn(race.id);
      }
    });
  });
