const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
let httpStatus = require('http-status');
const User = require('../models/user');
const Client = require('../models/client');
const Access = require('../models/access');

const generateAccessToken = obj => jwt.sign(obj, config.get('secretKey'), { expiresIn: '1d' });

const generateRefreshToken = clientId => {
  return `${clientId.toString()}.${crypto.randomBytes(40).toString('hex')}`;
};

const createClient = userId => {
  const client = new Client({
    user: userId,
  });

  client.token = generateRefreshToken(client.get('id'));

  const access = new Access({
    client: client.get('id'),
  });

  access.token = generateAccessToken({
    id: userId,
    clientId: client.get('id'),
  });

  return [client.save(), access.save()];
};

const create = (req, res, next) => {
  const { email, password } = req.body;

  User.isNotExist(email)
    .then(() => {
      const user = new User({ email, password });

      return Promise.all([user.save(), ...createClient(user.get('id'))]);
    })
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const login = (req, res, next) =>
  createClient(req.user.get('id'))
    .then((client, access) => {
      res.json({
        refresh: client.get('token'),
        access: access.get('token'),
      });
    })
    .catch(e => next(e));

let logout = function(req, res, next) {
  const { clientId } = req.user;

  Promise
    .all([Client.get(clientId), Access.findByClient(clientId)])
    .then(([client, access]) => {
      if (!client) {
        throw new APIError({
          message: 'No such client exists',
          status: httpStatus.CONFLICT,
        });
      }

      return Promise.all([client.remove().exec(), access.remove().exec()]);
    })
    .then(() => {
      res.json(httpStatus[200]);
    })
    .catch(e => next(e));
};

const getTokens = (req, res, next) => {
  const token = req.get('Authorization').replace('Bearer ', '');

  Client
    .findByToken(token)
    .then(client => {
      client.token = generateRefreshToken(client.get('id'));

      return Promise.all([client.save(), Access.findByClient(client.get('id'))]);
    })
    .then(([client, access]) => {
      let newAccess = access;

      if (newAccess) {
        newAccess.token = generateAccessToken({
          id: client.get('user'),
          clientId: client.get('id'),
        });
      }
      else {
        newAccess = new Access({
          client: client.get('id'),
          token: generateAccessToken({
            id: client.get('user'),
            clientId: client.get('id'),
          }),
        });
      }

      return Promise.all([client, newAccess.save()]);
    })
    .then(([client, access]) => {
      res.json({
        refresh: client.get('token'),
        access: access.get('token'),
      });
    })
    .catch(e => next(e));
};

const checkEmail = (req, res, next) => {
  User.isNotExist(req.body.email)
    .then(() => {
      res.json(httpStatus[200]);
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
  logout,
  getTokens,
  checkEmail,
};