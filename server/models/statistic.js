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
  transform(doc, ret) {
    const retParam = ret;

    delete retParam._id;
    delete retParam.__v;
    delete retParam.user;
  },
});

module.exports = mongoose.model('Statistic', StatisticSchema);
