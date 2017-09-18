const _ = require('lodash');
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

const getUserDataById = id =>
  User.get(id)
    .then(({ email, name }) => {
      let response = { email };

      if (name) {
        response = {
          ...response,
          name,
        };
      }

      return response;
    });

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

const login = (req, res, next) => {
  const userId = req.user.get('id');

  Promise.all([...createClient(userId), getUserDataById(userId)])
    .then(([client, access, user]) => {
      res.json({
        refresh: client.get('token'),
        access: access.get('token'),
        ...user,
      });
    })
    .catch(e => next(e));
};

let logout = (req, res, next) => {
  const { clientId } = req.user;

  Client.get(clientId)
    .then(client => client.remove().exec())
    .then(() => Access.findByClient(clientId))
    .then(access => access.remove().exec())
    .then(() => res.json(httpStatus[200]))
    .catch(e => next(e));
};

const getTokens = (req, res, next) => {
  const token = req.get('Authorization').replace('Bearer ', '');

  Client
    .findByToken(token)
    .then(client => {
      client.token = generateRefreshToken(client.get('id'));

      return client.save()
        .then(client => Access.findByClient(client.get('id')))
        .then(access => {
          access.token = generateAccessToken({
            id: client.get('user'),
            clientId: client.get('id'),
          });

          return access;
        })
        .catch(() => new Access({
          client: client.get('id'),
          token: generateAccessToken({
            id: client.get('user'),
            clientId: client.get('id'),
          }),
        }))
        .then(access => access.save())
        .then(access => {
          res.json({
            refresh: client.get('token'),
            access: access.get('token'),
          });
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

const getUserByRefreshToken = (req, res, next) =>
  Client
    .findByToken(req.body.token)
    .then(client => getUserDataById(client.get('user'))
      .then(user => Access.findByClient(client.get('id'))
        .then(() => res.json(user))
        .catch(() => new Access({
            client: client.get('id'),
            token: generateAccessToken({
              id: client.get('user'),
              clientId: client.get('id'),
            }),
          })
          .save()
          .then(access => res.json({
            ...user,
            access
          }))
        )))
    .catch(e => next(e));

module.exports = {
  create,
  login,
  logout,
  getTokens,
  checkEmail,
  getUserByRefreshToken,
};