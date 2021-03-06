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
    this.start = Date.now();

    const { race } = this;

    this.socket
      .on('start', race.waitMinimumRacers.bind(race))
      .on('type', this.type.bind(this));
  }

  setSocket(socket) {
    this.socket = socket;

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

        if (!this.rest.length) {
          this.end = Date.now();
        }
      }
      else {
        callback('Wrong string');
      }
    }
  }
}

module.exports = Racer;
