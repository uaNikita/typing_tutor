let mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  refresh: {
    token: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
      expires: '20s',
    },
  },
  access: {
    token: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
      expires: '20s',
    },
  },
  time: {
    type: Date,
    default: Date.now,
    expires: '1s',
  },
});

/**
 * Statics
 */
ClientSchema.statics = {
  get (id) {
    return this.findById(id)
      .exec()
      .then(client => {
        if (client) {
          return client;
        }

        throw new APIError({
          message: 'No such client exists',
          status: httpStatus.CONFLICT,
        });
      });
  }
};

module.exports = mongoose.model('Client', ClientSchema);