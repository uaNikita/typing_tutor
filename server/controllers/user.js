let passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
let config = require('config');
let User = require('../models/user');

let logout = function (req, res, next, id) {

  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));

};

const generateAccessToken = userId => {
  return jsonwebtoken.sign({
    id: userId
  }, config.get('secretKey'), {
    expiresIn: '15m'
  });
};

const generateRefreshToken = userId => {
  return `${userId.toString()}.${crypto.randomBytes(40).toString('hex')}`;
};

let create = (req, res, next) => {

  User.isNotExist(req.body.email)
    .then(() => {

      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      user.refreshToken = {
        token: generateRefreshToken(user.get('id')),
        created: new Date
      };

      return user.save();

    })
    .then(savedUser => {

      res.json({
        email: savedUser.get('email'),
        refreshToken: savedUser.get('refreshToken.token'),
        accessToken: generateAccessToken(savedUser.id)
      });

    })
    .catch(e => next(e));

};

let login = (req, res, next) => {
  // const user = req.user;
  //
  // user.email = req.body.email;
  // user.password = req.body.password;
  //
  // user.save()
  //   .then(savedUser => res.json(savedUser))
  //   .catch(e => next(e));
};

let createNewTokens = (req, res, next) => {

  User.get(req.id)
    .then(user => {

      if ('token' === user.get('refreshToken.token')) {
        const newRefreshToken = generateRefreshToken(user.get('id'));

        user.refreshToken = {
          token: newRefreshToken,
          created: new Date
        };

        res.json({
          refreshToken: newRefreshToken,
          accessToken: generateAccessToken(savedUser.id)
        });

      } else {
        const err = new APIError({
          message: 'Wrong refres token',
          status: httpStatus.CONFLICT
        });

        return Promise.reject(err);
      }

    })
    .catch(e => next(e));

}

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
  const {limit = 50, skip = 0} = req.query;
  User.list({limit, skip})
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
  create,
  update,
  createNewTokens,
  list,
  remove,
  getLearningMode,
  updateLearningMode,
  getTextMode,
  updateTextMode,
  getStatistic,
  updateStatistic
};