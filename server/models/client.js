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
      expires: '30d',
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
      expires: '15m',
    },
  },
});

/**
 * Statics
 */
ClientSchema.statics = {
  get(id) {
    return this.find(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError({
          message: 'No such user exists!',
          status: httpStatus.CONFLICT,
        });
        return Promise.reject(err);
      });
  }
};

module.exports = mongoose.model('Client', ClientSchema);