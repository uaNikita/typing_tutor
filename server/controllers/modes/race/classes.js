const _ = require('lodash');
const transports = require('../../../utils/transports');

/**
 Posible racer statuses:
 1. active
 2. finished
 */
class Racer {
  constructor(options) {
    // Options: id, type, socket, text, race
    _.defaults(this, options);

    this.typed = '';
    this.rest = this.text;

    const { race } = this;

    this.socket
      .on('start', race.waitMinimumRacers.bind(race))
      .on('type', this.type.bind(this));
  }

  type(string, callback) {
    const { race } = this;

    if (race.status !== 'ongoing') {
      callback('Race is not ongoing');
    }
    else if (!this.rest.length) {
      callback('All typed');
    }
    else {
      const neededString = string.length > this.rest.length
        ? string.slice(0, this.rest.length)
        : string;

      if (this.rest.indexOf(neededString) === 0) {
        const shifted = this.rest.slice(0, string.length);

        this.typed += shifted;

        this.rest = this.rest.slice(string.length);
      }
      else {
        callback('Wrong string');
      }
    }
  }
}

/**
 Posible race statuses:
 1. created
 1. waiting at least one more racer
 2. waiting for racers
 3. final countdown
 4. ongoing
 5. endend
 */
class Race {
  constructor(options) {
    _.defaults(this, options);

    this.racers = [];
    this.status = 'created';

    this.startDate = Date.now();

    this.updateLastActionDate();
  }

  updateLastActionDate() {
    clearTimeout(this.lastActionDateTimeout);

    this.lastActionDateTimeout = setTimeout(() => {
      this.end();
    }, 1000 * 60 * 60);
  }

  getRacer({ participant }) {
    const racer = _.find(this.racers, p => p.id === participant);

    return racer || null;
  }

  getRacerData(racer) {
    const result = {
      status: this.status,
      typed: racer.typed,
      rest: racer.rest,
      users: this.users,
    };

    if (['waiting for racers', 'final countdown'].includes(this.status)) {
      result.counter = this.counter;
    }

    return result;
  }

  move(opt) {
    this.updateLastActionDate();

    this.racers.forEach(racer => {
      racer.socket.emit('move', {
        status: this.status,
        ...opt,
      });
    });
  }

  waitMinimumRacers() {
    if (this.status !== 'created') {

    }
    else {
      this.status = 'waiting at least one more racer';

      if (this.racers.length < 2) {
        this.move();
      }
      else {
        this.waitRacers();
      }
    }
  }

  waitRacers() {
    if (this.status !== 'waiting at least one more racer') {
      return;
    }

    this.status = 'waiting for racers';

    this.counter = 2;

    const go = () => {
      this.move({ counter: this.counter });

      if (this.counter > 0) {
        this.counter -= 1;

        setTimeout(go, 1000);
      }
      else {
        this.finalCountdown();
      }
    };

    go();
  }

  finalCountdown() {
    if (this.status !== 'waiting for racers') {
      return;
    }

    this.status = 'final countdown';

    this.counter = 3;

    const go = () => {
      if (this.counter > -1) {
        this.move({ counter: this.counter });

        setTimeout(go, 1000);
      }
      else {
        this.start();
      }

      this.counter -= 1;
    };

    go();
  }

  start() {
    if (this.status !== 'final countdown') {
      return;
    }

    this.status = 'start';

    this.move();

    this.status = 'ongoing';
    this.progress = this.usersProgress;

    this.move();

    const go = () => {
      const newProgress = this.usersProgress;

      if (!_.isEqual(this.progress, newProgress)) {
        this.progress = newProgress;

        this.move({
          users: this.users,
        });
      }
      const allDone = newProgress.every(({ progress }) => progress === 1);

      if (allDone) {
        this.end();
      }
      else {
        setTimeout(go, 500);
      }
    };

    go();
  }

  end() {
    if (this.status === 'endend') {
      return;
    }

    // if all users finish race we should clear idle timeout
    clearTimeout(this.lastActionDateTimeout);

    this.status = 'endend';

    // todo: save race to database and forget

    this.move();
  }

  addRacer(socket) {
    const availableTransports = transports.filter(transport => (
      !_.find(this.racers, { transport })
    ));

    const racer = new Racer({
      id: socket.participant,
      type: socket.type,
      socket,
      text: this.text,
      race: this,
      transport: _.sample(availableTransports),
    });

    this.racers.push(racer);

    if (this.status === 'waiting at least one more racer'
      && this.racers.length > 1) {
      this.waitRacers();
    }

    console.log('move');

    this.move({
      users: this.users,
    });

    return racer;
  }

  getParticipant(id) {
    return _.find(this.racers, { id });
  }

  get users() {
    return this.racers.map(({ id, typed, transport }) => ({
      id,
      progress: typed.length / this.text.length,
      transport,
    }));
  }

  get usersProgress() {
    return this.racers.map(({ typed }) => (
      typed.length / this.text.length
    ));
  }
}

module.exports = {
  Racer,
  Race,
};
