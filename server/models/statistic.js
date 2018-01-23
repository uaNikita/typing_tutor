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
}, {
  strict: false,
});

StatisticSchema.set('toObject', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.user;
  }
});

module.exports = mongoose.model('Statistic', StatisticSchema);
