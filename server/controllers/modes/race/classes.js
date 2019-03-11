const _ = require('lodash');

class Racer {
  constructor(options) {
    _.defaults(this, options);

    this.typed = '';
    this.lastArray = this.text.split(' ');
    this.status = 'ongoing';

    this.socket
      .on('start', () => this.race.startWaitingParticipants())
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

class Race {
  constructor(options) {
    _.defaults(this, options);

    this.participants = [];
    this.status = 'waiting two or more';

    this.startDate = Date.now();

    // strange fix to prevent not caught first emit
    this.room.emit('first room emit');
  }

  getDataForRacer = (id) => {
    const racer = _.find(this.participants, (p) => p.id === id);
    let result = null;

    if (racer) {
      result = {
        status: this.status,
        typed: racer.typed,
        lastArray: racer.lastArray,
        users: this.getUsersProgress(),
      };
    }

    return result;
  };

  move(opt) {
    this.room.emit('move', {
      status: this.status,
      ...opt,
    });

    console.log('move', {
      status: this.status,
      ...opt,
    });
  }

  startWaitingParticipants() {
    console.log('startWaitingParticipants', this.status);
    if (this.status === 'waiting two or more') {
      this.status = 'waiting for participants';

      let counter = 30;

      const go = () => {
        console.log('move', counter);

        this.move({ counter });

        if (counter > 0) {
          counter -= 1;

          setTimeout(go, 1000);
        }
        else {
          this.startFinalCountdown();
        }
      };

      go();
    }
  }

  startFinalCountdown() {
    this.status = 'final countdown';

    let counter = 3;

    const go = () => {
      this.move({ counter });

      counter -= 1;

      if (counter > -1) {
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

  addParticipant(socket) {
    const racer = new Racer({
      id: socket.participant,
      type: socket.type,
      socket,
      text: this.text,
      race: this,
    });

    this.participants.push(racer);

    if (this.participants.length > 1
      && this.status === 'waiting two or more') {
      this.startWaitingParticipants();
    }
  }

  getParticipant(id) {
    return _.find(this.participants, { id });
  }
}

module.exports = {
  Racer,
  Race,
};
