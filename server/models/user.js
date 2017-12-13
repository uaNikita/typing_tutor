const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const defaults = require('../dist/compiledServer');

const {
  text: {
    selectedId,
    entities,
  }
} = defaults;


const UserSchema = new mongoose.Schema({
  profile: {
    name: String,
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
    },
  },
  newPassword: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  modes: {
    text: {
      selectedId: {
        type: Number,
        default: selectedId,
      },

      entities: {
        type: Array,
        default: entities,
      }
    },
    learning: {},
  }
});

UserSchema.set('toObject', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.active;
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('profile.password')) return next();

  this.generateHash(this.profile.password)
    .then(hash => {
      this.profile.password = hash;
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

UserSchema.methods.validPassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.profile.password);
};

UserSchema.methods.getLearningMode = (candidatePassword, cb) => {};

/**
 * Statics
 */
UserSchema.statics = {
  isNotExist(email) {
    return this.findOne({ profile: { email } })
      .exec()
      .then(user => {
        if (user) {
          throw new APIError({
            errors: {
              email: 'Email is already taken'
            },
            status: httpStatus.CONFLICT
          });
        }
      });
  },

  findByEmail(email) {
    return this.findOne({ 'profile.email': email })
      .exec()
      .then(user => {
        if (user) {
          return user;
        }

        throw new APIError({
          message: httpStatus['404'],
          status: httpStatus.NOT_FOUND,
        });
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
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);