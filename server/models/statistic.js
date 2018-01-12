const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => moment().startOf('day').toDate(),
    required: true,
  },
  modes: {
    text: Array,
    learning: Array,
  },
});

/**
 * Statics
 */
StatisticSchema.statics = {
  findByUser(client) {
    return this.findOne({ client })
      .exec();
  },

  findByToken(token) {
    return this.findOne({ token })
      .exec()
  },
};

module.exports = mongoose.model('Statistic', StatisticSchema);
