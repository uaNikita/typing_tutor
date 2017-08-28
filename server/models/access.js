const mongoose = require('mongoose');

const AccessSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1d',
  },
});

/**
 * Statics
 */
AccessSchema.statics = {
  findByClient(client) {
    return this.find({ client })
      .exec()
      .then(access => {
        let result = Promise.resolve();

        if (access.length) {
          result = access[0];
        }

        return result;
      })
      .catch(() => {
        return Promise.resolve();
      });
  }
};

module.exports = mongoose.model('Access', AccessSchema);