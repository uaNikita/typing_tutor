const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const ClientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d',
    required: true,
  },
});

/**
 * Statics
 */
ClientSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec();
  },

  findByToken(token) {
    return this.findOne({ token })
      .exec()
      .then(client => {
        if (client) {
          return client;
        }

        throw new APIError({
          message: httpStatus['401'],
          status: httpStatus.UNAUTHORIZED,
        });
      });
  },
};

module.exports = mongoose.model('Client', ClientSchema);