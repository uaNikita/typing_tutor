const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  keyboard: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
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
