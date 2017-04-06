let passport = require('passport');
let User = require('../models/user');

function logout(req, res, next, id) {

   User.get(id)
      .then((user) => {
         req.user = user;
         return next();
      })
      .catch(e => next(e));

}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {

   User.get(id)
      .then((user) => {
         req.user = user;
         return next();
      })
      .catch(e => next(e));

}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {

   let r = 'none';

   if (req.user) {
      r = req.user;
   }

   return res.json(r);

}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
let create = (req, res, next) => {

   User.isNotExist(req.body.email)
      .then(() => {

         const user = new User({
            username: req.body.email,
            password: req.body.password
         });

         return user.save();

      })
      .then(savedUser => {

         req.login(savedUser, function(err) {

            if (err) return;

            res.json('OK');

         });

      })
      .catch(e => next(e));

};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
let update = (req, res, next) => {
   const user = req.user;

   user.email = req.body.email;
   user.password = req.body.password;

   user.save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
let list = (req, res, next) => {
   const { limit = 50, skip = 0 } = req.query;
   User.list({ limit, skip })
      .then(users => res.json(users))
      .catch(e => next(e));
};

/**
 * Delete user.
 * @returns {User}
 */
let remove = (req, res, next) => {
   const user = req.user;
   user.remove()
      .then(deletedUser => res.json(deletedUser))
      .catch(e => next(e));
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let getLearningMode = (req, res, next) => {};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let updateLearningMode = (req, res, next) => {};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let getTextMode = (req, res, next) => {};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let updateTextMode = (req, res, next) => {};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let getStatistic = (req, res, next) => {};

/**
 *
 * @param req
 * @param res
 * @param next
 */
let updateStatistic = (req, res, next) => {};

module.exports = {
   load,
   get,
   create,
   update,
   list,
   remove,
   getLearningMode,
   updateLearningMode,
   getTextMode,
   updateTextMode,
   getStatistic,
   updateStatistic
};