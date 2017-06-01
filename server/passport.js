let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

   app.use(passport.initialize());
   app.use(passport.session());

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser(function(id, done) {
      User.findById(id, (err, user) => {
         done(err, user);
      });
   });

   passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
   }, (email, password, done) => {
      
      User.findOne({ email })
         .exec()
         .then(user => {
            
            user.validPassword(password).then(valid => {

               if (valid) {
                  done(null, user);
               }
               else {
                  done(null, false, { message: 'Incorrect password.' });
               }

            });

         })
         .catch(() => {
            done(null, false, { message: 'Incorrect username.' });
         });

   }));

};