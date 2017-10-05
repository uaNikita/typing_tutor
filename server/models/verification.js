const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Verification', VerificationSchema);
