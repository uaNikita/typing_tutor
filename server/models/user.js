let Promise = require('bluebird');
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let config = require('config');
let httpStatus = require('http-status');
let APIError = require('../helpers/APIError');

/**
 * User Schema
 */
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
   refreshToken: {
      token:  String,
      created: Date
   },
   statistic: Array,
   mod1: {
      mod1val1: {
         type: String
      },
      mod1val2: {
         type: Number
      }
   },
   mod2: {
      mod2val1: {
         type: String
      },
      mod2val2: {
         type: Number
      }
   }
   // mobileNumber: {
   //    type: String,
   //    match: [ /^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.' ]
   // },
   // createdAt: {
   //    type: Date,
   //    default: Date.now
   // }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function(next) {
   var user = this;

   // only hash the password if it has been modified (or is new)
   if (!user.isModified('password')) return next();

   user.generateHash(user.password)
      .then(hash => {
         user.password = hash;
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
   return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.getLearningMode = (candidatePassword, cb) => {};

/**
 * Statics
 */
UserSchema.statics = {

   isNotExist(email) {
      return this.findOne({ email })
         .exec()
         .then(user => {

            if (user) {
               const err = new APIError({
                  message: 'That email is already taken',
                  errors: {
                     email: 'Email is already taken'
                  },
                  status: httpStatus.CONFLICT
               });
               return Promise.reject(err);
            } else {
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
            const err = new APIError('No such user exists!', httpStatus.CONFLICT);
            return Promise.reject(err);
         });
   }

};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);