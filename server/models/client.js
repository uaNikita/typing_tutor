const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

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
  },
});

/**
 * Statics
 */
ClientSchema.statics = {
  findByToken(token) {
    return this.find({ token })
      .exec()
      .then(client => {
        if (client.length) {
          return client[0];
        }

        throw new APIError({
          message: httpStatus['401'],
          status: httpStatus.UNAUTHORIZED,
        });
      });
  }
};

module.exports = mongoose.model('Client', ClientSchema);