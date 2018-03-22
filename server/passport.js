const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const httpStatus = require('http-status');
const APIError = require('./utils/APIError');

module.exports = app => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, (email, password, done) => {
    User.findOne({ 'profile.email': email })
      .exec()
      .then(user => {
        user.validPassword(password)
          .then(valid => {
            if (valid) {
              done(null, user);
            }
            else {
              done(new APIError({
                errors: {
                  password: 'Incorrect password',
                },
                status: httpStatus.BAD_REQUEST,
              }));
            }
          });
      })
      .catch(() => {
        done(new APIError({
          errors: {
            email: 'Incorrect email',
          },
          status: httpStatus.BAD_REQUEST,
        }));
      });
  }));
};
