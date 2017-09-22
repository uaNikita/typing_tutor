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
    return this.findOne({ client })
      .exec();
  },

  findByToken(token) {
    return this.findOne({ token })
      .exec()
  },
};

module.exports = mongoose.model('Access', AccessSchema);