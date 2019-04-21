const socketIo = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const { Race } = require('./classes');
const { languages } = require('../../../../dist/compiledServer');
const { server } = require('../../../server');

const races = [];

const io = socketIo(server);
const racesNamespace = io.of('/races');

const findActiveRace = participant => (
  _.find(races, race => (
    _.some(race.participants, ({ id }) => id === participant)
  ))
);

racesNamespace
  .on('connect', (socket) => {
    const {
      tt_access: accessToken,
      tt_anonymous: anonymousToken,
    } = cookie.parse(socket.request.headers.cookie || '');

    if (accessToken) {
      try {
        const parsedToken = jwt.verify(accessToken, config.get('secretKey'));

        socket.participant = parsedToken.id;

        socket.type = 'user';

        socket.emit('registered');
      }
      catch (e) {
        let error = 'Forbidden';

        if (e.name === 'TokenExpiredError') {
          error = 'Token expired';
        }

        socket.emit('error', error);

        socket.disconnect(true);

        return;
      }
    }
    else if (anonymousToken) {
      socket.participant = anonymousToken;

      socket.type = 'anonymous';

      socket.emit('registered');
    }
    else {
      socket.disconnect(true);
    }

    socket
      .on('get active race', (fn) => {
        const race = findActiveRace(socket.participant);

        fn(race && race.id);
      })
      .on('get race', (id, fn) => {
        const race = _.find(races, { id });

        if (race) {
          let racer = race.getRacer(socket);

          if (!racer) {
            racer = race.addRacer(socket);
          }

          fn(race.getRacerData(racer));
        }
        else {
          fn('Race is not exist');
        }
      })
      .on('quick start', (language, fn) => {
        const activeRace = findActiveRace(socket.participant);

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

            const id = crypto.randomBytes(8).toString('hex');

            race = new Race({
              id,
              type: 'quick',
              language,
              text: _.sample(texts),
            });

            races.push(race);
          }

          race.addRacer(socket);

          fn(race.id);
        }
      });
  });
