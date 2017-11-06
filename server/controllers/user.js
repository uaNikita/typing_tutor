const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const httpStatus = require('http-status');

const emailTemplates = require('../email-templates');
const transporter = require('../utils/transporter');
const getRandomPassword = require('../utils/getRandomPassword');

const APIError = require('../utils/APIError');
const User = require('../models/user');
const Verification = require('../models/verification');
const Client = require('../models/client');
const Access = require('../models/access');

const generateAccessToken = obj => jwt.sign(obj, config.get('secretKey'), { expiresIn: '1d' });

const generateTokenWithId = clientId => {
  return clientId.toString() + crypto.randomBytes(40).toString('hex');
};

const createClient = userId => {
  const client = new Client({
    user: userId,
  });

  client.token = generateTokenWithId(client.get('id'));

  const access = new Access({
    client: client.get('id'),
  });

  access.token = generateAccessToken({
    id: userId,
    clientId: client.get('id'),
  });

  return [client.save(), access.save()];
};

const register = (req, res, next) => {
  const { email } = req.body;

  User.isNotExist(email)
    .then(() => {
      const password = getRandomPassword();

      const user = new User({
        email,
        password,
      });

      const verification = new Verification({
        user,
        type: 'email',
      });

      verification.token = verification.get('id') + crypto.randomBytes(40).toString('hex');

      return Promise.all([user.save(), verification.save()])
        .then(([user, verification]) => {
          const mailOptions = {
            from: config.get('mail.from'),
            to: email,
            subject: 'Acoount registration',
            html: emailTemplates.registrationFn({
              origin: req.get('origin'),
              token: verification.get('token'),
              password,
            }),
          };

          transporter.sendMail(mailOptions, error => {
            if (error) {
              throw new APIError({
                message: 'We can not verify your email now. Please try again later.',
                status: httpStatus.SERVICE_UNAVAILABLE,
              });
            }

            res.json(httpStatus[200]);
          });
        });
    })

    .catch(e => next(e));
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  User.findByEmail(email)
    .then(user => {
      const verification = new Verification({
        user: user.get('id'),
        type: 'email',
      });

      verification.token = verification.get('id') + crypto.randomBytes(40).toString('hex');

      return verification.save()
        .then(verification => {
          const mailOptions = {
            from: config.get('mail.from'),
            to: email,
            subject: 'Email verification',
            html: emailTemplates.verifyEmailFn({
              origin: req.get('origin'),
              token: verification.get('token'),
            }),
          };

          transporter.sendMail(mailOptions, error => {
            if (error) {
              throw new APIError({
                message: 'We can not verify your email now. Please try again later.',
                status: httpStatus.SERVICE_UNAVAILABLE,
              });
            }

            res.json(httpStatus[200]);
          });
        });
    })

    .catch(e => next(e));
};

const restoreAccess = (req, res, next) => {
  const { email } = req.body;

  User.findByEmail(email)
    .then(user => {
      const password = getRandomPassword();

      user.password = password;

      const verification = new Verification({
        user,
        type: 'email',
      });

      verification.token = verification.get('id') + crypto.randomBytes(40).toString('hex');

      return Promise.all([user.save(), verification.save()])
        .then(([user, verification]) => {
          const mailOptions = {
            from: config.get('mail.from'),
            to: email,
            subject: 'Restore access',
            html: emailTemplates.restoreAccessFn({
              origin: req.get('origin'),
              token: verification.get('token'),
              password,
            }),
          };

          transporter.sendMail(mailOptions, error => {
            if (error) {
              throw new APIError({
                message: 'We can not verify your email now. Please try again later.',
                status: httpStatus.SERVICE_UNAVAILABLE,
              });
            }

            res.json(httpStatus[200]);

          });
        });
    })

    .catch(e => next(e));
};

const login = (req, res, next) => {
  const userId = req.user.get('id');

  User.get(userId)
    .then(user => {

      if (!user.get('active')) {
        throw new APIError({
          message: 'Your account is not active',
          status: httpStatus.FORBIDDEN,
        });
      }

      return Promise.all([...createClient(user.get('id'))])
        .then(([client, access]) => {
          res.json({
            refresh: client.get('token'),
            access: access.get('token'),
            ...user,
          });
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
      client.token = generateTokenWithId(client.get('id'));

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

const getUserData = (req, res, next) =>
  User.get(req.user.id)
    .then(({ email, name }) => {
      let response = { email };

      _.assign(response, name && { name });

      res.json(response);
    })
    .catch(e => next(e));

const verifyToken = (req, res, next) =>
  Verification.findByToken(req.body.token)
    .then(verification => {

      const type = verification.get('type');
      const user = verification.get('user');

      switch (type) {
        case 'email':
          user.active = true;
          break;
        case 'password':
          user.password = user.newPassword;
          user.newPassword = undefined;
          break;
      }

      return Promise.all([user.save(), verification.remove().exec()])
        .then(() => res.json(type));
    })
    .catch(e => next(e));


module.exports = {
  register,
  verifyEmail,
  restoreAccess,
  login,
  logout,
  getTokens,
  checkEmail,
  getUserData,
  verifyToken,
};