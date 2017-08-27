const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
let config = require('config');
let User = require('../models/user');
let Client = require('../models/Client');

const generateAccessToken = obj => jsonwebtoken.sign(obj, config.get('secretKey'), { expiresIn: '15m' });

const generateRefreshToken = userId => {
  return `${userId.toString()}.${crypto.randomBytes(40).toString('hex')}`;
};

const createClient = userId => {
  const client = new Client({
    user: userId,
    refresh: {
      token: generateRefreshToken(user.get('id'))
    },
  });

  client.access = {
    token: generateAccessToken({
      userId: userId,
      clientId: client.get('id'),
    }),
  };

  return client.save()
};

let create = (req, res, next) => {
  const { email, password } = req.body;

  User.isNotExist(email)
    .then(() => {
      const user = new User({ email, password });

      return Promise.all([user.save(), createClient(user.get('id'))]);
    })
    .then(([user, client]) => {
      res.json({
        email: user.get('email'),
        tokens: {
          refresh: client.get('refresh.token'),
          access: client.get('access.token'),
        },
      });
    })
    .catch(e => next(e));
};

let login = (req, res, next) => {
  createClient(req.user.get('id'))
    .then((client) => {
      res.json({
        email: user.get('email'),
        tokens: {
          refresh: client.get('refresh.token'),
          access: client.get('access.token'),
        },
      });
    })
    .catch(e => next(e));
};

let logout = function (req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
};

let createNewTokens = (req, res, next) => {
  User.find(req.id)
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
  create,
  login,
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