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

      console.log(111);

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