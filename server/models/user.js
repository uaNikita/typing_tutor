const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const { defaults } = require('../../dist/compiledServer');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    match: [
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '{PATH} is not a valid',
    ],
  },
  bio: String,
  password: {
    type: String,
    required: true,
  },
  newPassword: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  // current mode
  mode: {
    type: String,
    default: 'learning',
  },
  keyboard: {
    type: String,
    default: 'english',
  },
  metronome: {
    on: {
      type: Boolean,
      default: defaults.user.metronome.on,
    },
    interval: {
      type: Number,
      default: defaults.user.metronome.interval,
    },
  },
  modes: {
    text: {
      selectedId: {
        type: Number,
        default: defaults.text.selectedId,
      },
      entities: {
        type: Array,
        default: defaults.text.entities,
      },
    },
    learning: {
      mode: {
        type: String,
        default: 'fingers',
      },
    },
  },
});

UserSchema.set('toObject', {
  transform(doc, ret) {
    const retParam = ret;

    delete retParam._id;
    delete retParam.__v;
    delete retParam.password;
    delete retParam.active;
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function save(next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.generateHash(this.password)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  }
  else {
    next();
  }
});

/**
 * Methods
 */
UserSchema.methods.generateHash = password => bcrypt.hash(password, config.get('saltRounds'));

UserSchema.methods.validPassword = function validPassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// UserSchema.methods.getLearningMode = (candidatePassword, cb) => {};

/**
 * Statics
 */
UserSchema.statics = {
  isNotExist(email) {
    return this.findOne({ profile: { email } })
      .exec()
      .then((user) => {
        if (user) {
          throw new APIError({
            errors: {
              email: 'Email is already taken',
            },
            status: httpStatus.CONFLICT,
          });
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

        throw new APIError({
          message: 'No such user exists!',
          status: httpStatus.CONFLICT,
        });
      });
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
