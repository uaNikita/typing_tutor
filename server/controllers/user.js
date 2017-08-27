const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const User = require('../models/user');
const Client = require('../models/Client');

const generateAccessToken = obj => jwt.sign(obj, config.get('secretKey'), { expiresIn: '1d' });

const generateRefreshToken = clientId => {
  return `${clientId.toString()}.${crypto.randomBytes(40).toString('hex')}`;
};

const createClient = userId => {
  const client = new Client({
    user: userId,
  });

  client.refresh = {
    token: generateRefreshToken(client.get('id')),
  };

  client.access = {
    token: generateAccessToken({
      id: userId,
      clientId: client.get('id'),
    }),
  };

  return client.save();
};

const create = (req, res, next) => {
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

const login = (req, res, next) => {
  const { user } = req;

  createClient(user.get('id'))
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

let logout = function(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
};

const getTokens = (req, res, next) => {
  const { clientId } = req.user;

  console.log('clientId', clientId);

  Client
    .get(clientId)
    .then(client => {
      const userId = client.get('user');

      client.refresh.token = generateRefreshToken(userId);
      client.access.token = generateAccessToken({
        id: userId,
        clientId: client.get('id'),
      });

      return client.save();
    })
    .then(client => {
      
     
      res.json({
        refresh: client.get('refresh.token'),
        access: client.get('refresh.access'),
      });
    })
    .catch(e => next(e));
};

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

module.exports = {
  create,
  login,
  getTokens,
};