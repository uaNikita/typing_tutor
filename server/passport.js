const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const config = require('config');
const httpStatus = require('http-status');

const User = require('./models/user');
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
    User.findOne({ 'email': email })
      .exec()
      .then(user => {
        if (user) {
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
        }
        else {
          done(new APIError({
            errors: {
              email: 'Incorrect email',
            },
            status: httpStatus.BAD_REQUEST,
          }));
        }
      });
  }));

  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('secretKey')
    },
    (payload, cb) => {
      User.get(payload.id)
        .then(user => {
          if (user) {
            cb(null, user);
          }
          else {
            cb(new APIError({
              errors: {
                password: 'Incorrect password',
              },
              status: httpStatus.BAD_REQUEST,
            }));
          }
        })
        .catch(e => cb(e));
    }
  ));

};
