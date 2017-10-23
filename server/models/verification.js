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

/**
 * Statics
 */
VerificationSchema.statics = {
  findByToken(token) {
    return this.findOne({ token })
      .exec()
      .then(verification => {
        if (verification) {
          return verification;
        }

        throw new APIError({
          message: httpStatus['404'],
          status: httpStatus.NOT_FOUND,
        });
      });
  },
};

module.exports = mongoose.model('Verification', VerificationSchema);
