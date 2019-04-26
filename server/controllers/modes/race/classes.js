const _ = require('lodash');

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
    this.status = 'active';

    const { race } = this;

    this.socket
      .on('start', () => {
        if (race.status !== 'created') {
          return;
        }

        race.waitMinimumRacers();
      })
      .on('type', (string, callback) => {
        let error;

        if (this.status !== 'active') {
          error = 'Not active';
        }
        else if (this.rest.indexOf(string) !== 0) {
          error = 'Wrong string';
        }

        if (error) {
          callback('Error');
        }
        else {
          this.type(string);
        }
      })
      .on('disconnect', () => {
        this.status = 'ended';

        race.move();
      });

    this.ongoing = true;
  }

  type(string) {
    const shifted = this.rest.slice(0, string.length);

    this.typed += shifted;

    this.rest = this.rest.slice(string.length);

    if (!this.rest) {
      this.finish();
    }
  }

  finish() {
    this.status = 'finished';

    race.move();
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

    this.updatelastActionDate();
  }

  updatelastActionDate() {
    clearTimeout(this.lastActionDateTimeout);

    this.lastActionDateTimeout = setTimeout(() => {
      this.end();
    }, 1000 * 60 * 60);
  }

  getRacer({ participant }) {
    const racer = _.find(this.racers, (p) => p.id === participant);

    return racer || null;
  };

  getRacerData(racer) {
    const result = {
      raceStatus: this.status,
      racerStatus: racer.status,
      typed: racer.typed,
      rest: racer.rest,
      users: this.usersProgress,
    };

    if (['waiting for racers', 'final countdown'].includes(this.status)) {
      result.counter = this.counter;
    }

    return result;
  };

  move(opt) {
    this.updatelastActionDate();

    this.racers.forEach(racer => {
      racer.socket.emit('move', {
        raceStatus: this.status,
        racerStatus: racer.status,
        ...opt,
      });
    });
  }

  waitMinimumRacers() {
    if (this.status !== 'created') {
      return;
    }
    else if (this.racers.length < 2) {
      this.status = 'waiting at least one more racer';

      this.move();
    }
    else {
      this.waitRacers();
    }
  }

  waitRacers() {
    if (this.status !== 'waiting at least one more racer') {
      return;
    }

    this.status = 'waiting for racers';

    this.counter = 10;

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
      const allDone = this.racers.every(({ status }) => (
        ['finished', 'disconnected'].includes(status)
      ));

      const newProgress = this.usersProgress;

      if (allDone) {
        this.progress = newProgress;

        this.move({
          progress: this.progress,
        });

        this.end();
      }
      else {
        const newProgress = this.usersProgress;

        if (!_.isEqual(this.progress, newProgress)) {
          this.progress = newProgress;

          this.move({
            progress: this.progress,
          });

          setTimeout(go, 500);
        }
      }
    };

    go();
  }

  end() {
    if (this.status === 'endend') {
      return;
    }

    // if all users finish race we should clear timeout because of idle
    clearTimeout(this.lastActionDateTimeout);

    this.status = 'endend';

    // save it to data base

    this.move();
  }

  addRacer(socket) {
    const racer = new Racer({
      id: socket.participant,
      type: socket.type,
      socket,
      text: this.text,
      race: this,
    });

    this.racers.push(racer);

    if (this.status === 'waiting at least one more racer'
      && this.racers.length > 1) {
      this.waitRacers();
    }

    return racer;
  }

  getParticipant(id) {
    return _.find(this.racers, { id });
  }

  get usersProgress() {
    return this.racers.map(({ id, typed }) => ({
      id,
      progress: typed.length / this.text.length,
    }));
  }
}

module.exports = {
  Racer,
  Race,
};
