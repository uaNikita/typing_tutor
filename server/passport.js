let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  app.use(passport.initialize());

  // passport.serializeUser((user, done) => {
  //    console.log('serializeUser');
  //
  //    done(null, user.id);
  // });
  //
  // passport.deserializeUser(function(id, done) {
  //    console.log('deserializeUser');
  //    User.findById(id, (err, user) => {
  //       done(err, user);
  //    });
  // });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email })
      .exec()
      .then(user => user.validPassword(password))
      .then(valid => {
        if (valid) {
          done(null, user);
        }
        else {
          console.log(12);
          Promise.reject('Incorrect password.');
        }
      })
      .catch((error, ...rest) => {
        console.log(error, rest);

        if (error) {
          done(null, false, { message: error });
        }
        else {
          done(null, false, { message: 'Incorrect username.' });
        }
      });
  }));

};