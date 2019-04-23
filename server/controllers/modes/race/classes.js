const _ = require('lodash');


class Racer {
  constructor(options) {
    /*
    Options list:
    • id
    • type
    • socket
    • text
    • race
     */

    _.defaults(this, options);

    this.typed = '';
    this.rest = this.text;
    this.status = 'ongoing';

    const { race } = this;

    this.socket
      .on('start', () => {
        if (race.status !== 'created') {
          return;
        }
        else if (race.racers.length < 2) {
          race.status = 'waiting at least one more racer';

          race.move();
        }
        else {
          race.waitRacers();
        }
      })
      .on('type', (string, callback) => {
        if (this.status === 'ongoing' && this.rest.indexOf(string) === 0) {
          this.type(string);
        }
        else {
          callback('Error');
        }
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

    this.racers = [];
    this.status = 'created';

    this.startDate = Date.now();
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
    this.racers.forEach(racer => {
      racer.socket.emit('move', {
        raceStatus: this.status,
        racerStatus: racer.status,
        ...opt,
      });
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

          setTimeout(go, 1000);
        }
      }
    };

    go();
  }

  end() {
    this.status = 'endend';

    // TODO: add logic race end
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

    if (this.racers.length > 1
      && this.status === 'waiting at least one more racer') {
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
