let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');
let httpStatus = require('http-status');
let APIError = require('./helpers/APIError');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, (email, password, done) => {
    User.findOne({ email })
      .exec()
      .then(user => {
        user.validPassword(password).then(valid => {
          if (valid) {
            done(null, user);
          }
          else {
            done(new APIError({
              message: 'Incorrect password',
              status: httpStatus.BAD_REQUEST
            }));
          }
        });

      })
      .catch(() => {
        done(new APIError({
          message: 'Incorrect username',
          status: httpStatus.BAD_REQUEST
        }));
      });

  }));
};