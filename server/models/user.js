const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '{PATH} is not a valid'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [5, '`{PATH}` exceeds the minimum allowed length (5).'],
    maxlength: [20, '`{PATH} exceeds the maximum allowed length (20).']
  },
  active: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  this.generateHash(this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

/**
 * Methods
 */
UserSchema.methods.generateHash = password => {
  return bcrypt.hash(password, config.get('saltRounds'));
};

UserSchema.methods.validPassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.getLearningMode = (candidatePassword, cb) => {};

/**
 * Statics
 */
UserSchema.statics = {
  isNotExist(email) {
    return this.findOne({ email }).exec().then(user => {
      if (user) {
        const err = new APIError({
          errors: {
            email: 'Email is already taken'
          },
          status: httpStatus.CONFLICT
        });

        return Promise.reject(err);
      }
      else {
        return Promise.resolve();
      }
    });
  },

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }

        const err = new APIError({
          message: 'No such user exists!',
          status: httpStatus.CONFLICT,
        });

        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);