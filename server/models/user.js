const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

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
        default: 0
      },

      entities: {
        type: Array,
        default: [
          {
            id: 1,
            typed: 'Dolphins are a widely distributed and diverse group of fully aqua',
            last: 'tTtTtttTTTtic marine mammals. They are an informal grouping within the order Cetacea, excluding whales and porpoises, so to zoologists the grouping is paraphyletic. The dolphins comprise the extant families Delphinidae (the oceanic dolphins), Platanistidae (the Indian river dolphins), Iniidae (the new world river dolphins), and Pontoporiidae (the brackish dolphins). There are 40 extant species of dolphins. Dolphins, alongside other cetaceans, belong to the clade Cetartiodactyla with even-toed ungulates, and their closest living relatives are the hippopotamuses, having diverged about 40 million years ago. ',
          },
          {
            id: 2,
            typed: '',
            last: 'Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
          },
          {
            id: 3,
            typed: 'Bears are mammals of the fa',
            last: 'mily Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia. Common characteristics of modern bears include large bodies with stocky legs, long snouts, shaggy hair, plantigrade paws with five nonretractile claws, and short tails. While the polar bear is mostly carnivorous, and the giant panda feeds almost entirely on bamboo, the remaining six species are omnivorous with varied diets.',
          },
        ],
      }
    },
    learning: {}
  }
});

UserSchema.set('toObject', {
  transform: function (doc, ret) {
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

UserSchema.pre('save', function (next) {
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

UserSchema.methods.validPassword = function (candidatePassword) {
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