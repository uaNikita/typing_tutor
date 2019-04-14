const _ = require('lodash');

class Racer {
  constructor(options) {
    _.defaults(this, options);

    this.typed = '';
    this.lastArray = this.text.split(' ');
    this.status = 'ongoing';

    const { race } = this;

    this.socket
      .on('start', () => {
        if (race.status !== 'created') {
          return;
        }
        else if (race.participants.length < 2) {
          race.status = 'waiting at least one more racer';

          race.move();
        }
        else {
          race.waitRacers();
        }
      })
      .on('type', (string, callback) => {
        if (this.status === 'ongoing' && string === this.lastArray[0]) {
          this.type();
        }
        else {
          callback('Wrong');
        }
      });

    this.ongoing = true;
  }

  type() {
    const shifted = this.lastArray.shift();

    this.typed += shifted;

    if (this.lastArray.length) {
      this.typed += ' ';
    }
    else {
      this.finish();
    }
  }

  finish() {
    this.endDate = Date.now();

    this.status = 'finished';
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

    this.participants = [];
    this.status = 'created';

    this.startDate = Date.now();

    // strange fix to prevent not caught first emit
    this.room.emit('first room emit');
  }

  getRacer({ participant }) {
    const racer = _.find(this.participants, (p) => p.id === participant);

    return racer || null;
  };

  getRacerData(racer) {
    const result = {
      status: this.status,
      typed: racer.typed,
      lastArray: racer.lastArray,
      users: this.getUsersProgress(),
    };

    if (['waiting for racers', 'final countdown'].includes(this.status)) {
      result.counter = this.counter;
    }

    return result;
  };

  move(opt) {
    this.room.emit('move', {
      status: this.status,
      ...opt,
    });
  }

  waitRacers() {
    this.status = 'waiting for racers';

    this.counter = 10;

    const go = () => {
      this.move({ counter: this.counter });

      if (this.counter > 0) {
        this.counter -= 1;

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

    this.counter = 3;

    const go = () => {
      this.move({ counter: this.counter });

      this.counter -= 1;

      if (this.counter > -1) {
        setTimeout(go, 1000);
      }
      else {
        this.start();
      }
    };

    go();
  }

  getUsersProgress() {
    return this.participants.map(({ id, typed }) => ({
      id,
      progress: typed.length / this.text.length,
    }));
  }

  start() {
    this.status = 'ongoing';
    this.progress = this.getUsersProgress();

    const go = () => {
      const allDone = this.participants.every(({ status }) => ['finished', 'disconnected'].includes(status));

      const newProgress = this.getUsersProgress();

      if (allDone) {
        this.progress = newProgress;

        this.move({
          progress: this.progress,
        });

        this.end();
      }
      else {
        const newProgress = this.getUsersProgress();

        if (!_.isEqual(this.progress, newProgress)) {
          this.progress = newProgress;

          this.move({
            progress: this.progress,
          });

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

  addRacer(socket) {
    const racer = new Racer({
      id: socket.participant,
      type: socket.type,
      socket,
      text: this.text,
      race: this,
    });

    this.participants.push(racer);

    if (this.participants.length > 1
      && this.status === 'waiting at least one more racer') {
      this.waitRacers();
    }

    return racer;
  }

  getParticipant(id) {
    return _.find(this.participants, { id });
  }
}

module.exports = {
  Racer,
  Race,
};
