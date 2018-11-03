const mongoose = require('mongoose');
const config = require('config');

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
    expires: config.get('refreshTokenLiveTime'),
    required: true,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
