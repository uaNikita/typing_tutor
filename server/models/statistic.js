const mongoose = require('mongoose');
const moment = require('moment');

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

module.exports = mongoose.model('Statistic', StatisticSchema);
